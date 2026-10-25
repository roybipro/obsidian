# PRD: Campus Platform API (AIUB)

**Status:** Draft v0.3
**Scope of this document:** Backend API only. Frontend and deployment are future work.
**Companion docs:** `SCHEMA.md` (data model, next), `agents.md` (agent working rules, after SCHEMA)

> Conventions: **[Confirmed]** = decided by the product owner. **[Assumed]** = proposed default, awaiting confirmation. Business rules are numbered (BR-xx) and acceptance criteria (AC-x.x) so Kanban cards and tests can reference them.

**Changes in v0.3:**
- Chat redesigned to a lite, standard model: messages stored in Postgres, delivered in real time or on next login, deleted after 7 days. Replaces the ephemeral Redis-only design.
- Comments are threaded to two levels.
- Post likes added (modeled as a reaction type, so more types can come later).
- Search is Postgres full-text behind an abstraction (SuperSearch dropped).
- Resend chosen for verification email. Batch is no longer derived from the student ID, and the student ID format is not validated: the only check is the domain plus email verification.
- Ride post times are a recurring schedule.
- Day-one moderators and first users are the devs. Terms/privacy and informing the university are logged as open items.
- Extensibility requirements added for chat and reactions.

---

## 1. Overview

A university-specific platform where verified, currently enrolled AIUB students can trade items, find tutors and project help, recruit teammates, report lost and found items, and arrange shared commutes.

Every feature follows one model: **a user publishes a short-lived post. Other users interact with it in three ways: likes, threaded public comments, or a private Connect request that leads to a one-to-one chat.**

### 1.1 Goals
- One trusted place for peer-to-peer student needs, limited to the university.
- Keep the system simple: one interaction model, few tables, short-lived data.
- Be privacy-first: expire content quickly and leave no trace on account deletion.

### 1.2 Non-goals (v1)
- Frontend (web or mobile) and deployment/infrastructure.
- Payments, fare calculation, escrow.
- Noticeboard / official announcements (removed from scope).
- Chat extras: typing indicators, message reactions, attachments, voice, group chat, message editing, search inside chats. The design leaves room for them (section 7) but none is built.
- Recommendation engines, AI features, analytics dashboards.
- Soft delete, long-term data retention, or user activity tracking.

---

## 2. Users and Roles [Confirmed]

| Role | Who | Notes |
|---|---|---|
| **User** | A currently enrolled student | Default role on signup |
| **Admin** | A student with moderation powers over the whole platform | Assigned by the SuperUser. Also a normal user. |
| **SuperUser** | The developer | Assigns and revokes Admins. Seeded via script or config, never created through a public endpoint. |

At launch the devs are the SuperUser and the Admins, and they handle all reports. [Confirmed]

### 2.1 Permission matrix

| Capability | User | Admin | SuperUser |
|---|:-:|:-:|:-:|
| Create, edit, delete own posts | ✅ | ✅ | ✅ |
| Like posts; comment and reply; delete own comments | ✅ | ✅ | ✅ |
| View other users' profiles | ✅ | ✅ | ✅ |
| Connect, chat, block | ✅ | ✅ | ✅ |
| Report posts, comments, users, messages | ✅ | ✅ | ✅ |
| Remove any post or comment, resolve reports | ❌ | ✅ | ✅ |
| Suspend / unsuspend Users | ❌ | ✅ | ✅ |
| Suspend Admins | ❌ | ❌ | ✅ |
| Assign / revoke Admins | ❌ | ❌ | ✅ |
| Manage allowed email domains | ❌ | ❌ | ✅ |
| View audit log | ❌ | ✅ (own actions) | ✅ (all) |

Rules:
- **BR-R1** Role is a single enum on the user: `USER | ADMIN | SUPERUSER`. [Confirmed]
- **BR-R2** An Admin cannot moderate reports or content where they are the subject; such items escalate to the SuperUser. [Assumed]
- **BR-R3** Every Admin and SuperUser moderation action is written to the audit log. [Assumed]
- **BR-R4** Chat content is not readable by Admins except through the evidence stored in a report (BR-X4). [Assumed]

---

## 3. Tech Stack

| Concern | Choice |
|---|---|
| Framework | NestJS (modular monolith, one module per feature) [Confirmed] |
| Language | TypeScript [Confirmed] |
| Database / ORM | PostgreSQL + Prisma [Confirmed] |
| Auth | Better-Auth (email verification, domain restriction) [Confirmed] |
| Abuse protection | Arcjet (rate limiting, bot protection, email validation) [Confirmed] |
| Cache / counters / queues | Redis (quota and rate-limit counters, presence, BullMQ jobs) [Confirmed] |
| Realtime | Socket.io with the Redis adapter [Confirmed] |
| Media storage | AWS S3 via presigned uploads [Confirmed] |
| Search | Postgres full-text search behind a `SearchService` abstraction [Assumed fallback; SuperSearch dropped] |
| Verification email | Resend [Confirmed] |
| API contract | OpenAPI via `@nestjs/swagger` [Assumed] |

---

## 4. Global Business Rules

### 4.1 Identity and enrollment
- **BR-A1** Sign-in requires a university email on the allow-list. No email, no account. [Confirmed]
- **BR-A2** The allow-list is stored in the database and managed by the SuperUser. It is seeded with the exact domain `student.aiub.edu`. [Confirmed domain; DB storage Assumed]
- **BR-A3** The only eligibility checks are: the email's domain is on the allow-list, and the address passes email verification (a link or code sent through Resend). The local part (student ID) is not format-validated and nothing is derived from it. [Confirmed]
- **BR-A4** The student ID is private. Because it is the local part of the email, the email is never returned by any endpoint other than to its owner. [Assumed]
- **BR-A5** Email verification is mandatory. An unverified account can do nothing. Unverified accounts are deleted automatically after 3 days. [Verification Confirmed; 3 days Assumed]
- **BR-A6** Enrollment is enforced by the allow-list and verification at signup only. There is no graduation job or re-verification. Admins can suspend users who are no longer enrolled. [Confirmed]
- **BR-A7** User statuses: `ACTIVE | SUSPENDED`. A suspended user cannot sign in and is told why. [Confirmed; message wording Assumed]
- **BR-A8** Profile fields such as department and batch are optional and entered by the user. [Confirmed that batch is not derived]
- **BR-A9** Resend is used for verification email only. All other notifications are in-app or over sockets. [Assumed]

### 4.2 Posts (all features)
- **BR-P1** Every post expires **7 days** after creation. [Confirmed]
- **BR-P2** Expired posts are excluded from every query immediately, and a scheduled job hard-deletes them with their comments, likes, and media. [Assumed mechanism]
- **BR-P3** There is **no soft delete** anywhere. Deleting removes the row and its dependents. [Confirmed]
- **BR-P4** Quota: a user may create at most **5 posts/requests per day, combined across all features**. [Confirmed]
- **BR-P5** Reports have a separate quota of **5 per day**. [Assumed]
- **BR-P6** The quota day is a calendar day in the Asia/Dhaka time zone. [Assumed]
- **BR-P7** A Lost & Found post may be renewed once for another 7 days. [Assumed]
- **BR-P8** Expiry is paused while a post, or any of its comments, has an open report. [Assumed]
- **BR-P9** A post's author can edit or delete it at any time before it expires.
- **BR-P10** Categories for Marketplace and Lost & Found are fixed enums (see section 5). [Confirmed]
- **BR-P11** All verified students can see all posts. There is no scoping by department or batch. [Assumed]
- **BR-P12** Prices are informational and expressed in BDT. [Assumed]

### 4.3 Comments and replies [Confirmed unless noted]
- **BR-K1** Any verified user can comment on any visible post. Comments are visible to everyone who can see the post.
- **BR-K2** Comments are **threaded to two levels**: top-level comments, and replies to them. A reply to a reply attaches to the same top-level comment and records the user being replied to (an @mention). There is no third level.
- **BR-K3** The **comment lifecycle equals the post lifecycle**: all comments and replies are deleted when the post expires, is deleted, is removed by moderation, or when its author is suspended or deleted. Nothing outlives its post.
- **BR-K4** The post author can see who commented or replied, as a list with each user's public profile summary, and is notified of new comments.
- **BR-K5** A comment's author can delete it. The post's author can delete any comment on their post. Admins can remove any comment. Deleting a top-level comment deletes its replies. Deleting a reply deletes only that reply. There are no "deleted comment" placeholders. [Assumed deletion semantics]
- **BR-K6** Comments and replies are text only, with a maximum length. [Assumed, limit TBD]
- **BR-K7** Comments and replies do not count toward the post quota. They have their own rate limit (Arcjet plus a Redis counter). [Assumed, limit TBD]
- **BR-K8** Blocked users cannot comment, reply, or like on each other's posts, and each other's comments are hidden. [Assumed]
- **BR-K9** Replies and @mentions notify the user being replied to.

### 4.4 Reactions (likes) [Confirmed that posts can be liked; details Assumed]
- **BR-L1** A user can like a post and remove their like. One reaction per user per post.
- **BR-L2** The like count is public. The list of who liked is visible to the post's author only.
- **BR-L3** Likes follow the post lifecycle and are deleted with it, or when the liker is suspended or deleted.
- **BR-L4** Likes do not count toward the post quota. They have their own rate limit.
- **BR-L5** Likes are stored as a reaction with a type enum containing only `LIKE` for now, so more types can be added later.
- **BR-L6** Like notifications are batched, not sent one per like.
- **BR-L7** Likes apply to posts only in v1, not comments.

### 4.5 Profiles, connections and blocking
- **BR-U1** Any verified user can view another active user's profile. [Confirmed]
- **BR-U2** A public profile shows: name, avatar, department, batch, bio, and that user's active posts. It never shows email, student ID, role, or status. [Assumed]
- **BR-U3** From a profile, a user can **connect**, **block**, or **report**. [Confirmed block and report]
- **BR-U4** Profiles of suspended or deleted users are not found (404).
- **BR-C1** A Connection is created by a request from one user to another and becomes active when the receiver accepts. [Confirmed]
- **BR-C2** Connections are **global** across all features. The originating post is stored for context only. [Confirmed]
- **BR-C3** A block ends any connection, deletes the conversation and its messages, prevents new requests, comments, and likes in both directions, and hides each user's posts and profile from the other. [Confirmed that blocking exists; side effects Assumed]
- **BR-C4** Connection requests are rate-limited separately from the post quota. [Assumed, limit TBD]

### 4.6 Chat (lite) [Confirmed: lite and simple; details Assumed]
- **BR-H1** Chat is one-to-one and text only. A conversation exists for each accepted connection.
- **BR-H2** Messages are stored in Postgres, so they can be sent to users who are offline. Connected users receive them in real time over Socket.io. Others get them on their next login and a notification.
- **BR-H3** Messages are **hard deleted 7 days after they are sent**. [Confirmed 7 days]
- **BR-H4** Messages and the conversation are also deleted immediately when the connection is removed, a block occurs, or either user is suspended or deleted.
- **BR-H5** Each participant has a read marker, from which unread counts are derived. There is no per-message read flag.
- **BR-H6** The conversation list shows the latest message and unread count. History is cursor-paginated.
- **BR-H7** Chat has its own rate limit (Arcjet plus Redis) and a maximum message length. [Assumed, values TBD]
- **BR-H8** Typing indicators, reactions on messages, attachments, voice, group chat, message editing, and search inside chats are **not built in v1** (see section 7 for the room left for them). [Confirmed]

### 4.7 Reports (specific and structured) [Confirmed that reports need specificity; structure Assumed]
- **BR-X1** A report always targets exactly one thing: `POST | COMMENT | USER | MESSAGE`. (A reply is a `COMMENT`.)
- **BR-X2** A report requires: target type and ID, a **reason** from a fixed enum, and a **details** text (minimum 20, maximum 1000 characters) explaining what is wrong.
- **BR-X3** Reasons are fixed enums and depend on the target:

| Reason | Post | Comment | User | Message |
|---|:-:|:-:|:-:|:-:|
| `SPAM` | ✅ | ✅ | ✅ | ✅ |
| `SCAM_OR_FRAUD` | ✅ | ✅ | ✅ | ✅ |
| `HARASSMENT_OR_ABUSE` | ✅ | ✅ | ✅ | ✅ |
| `INAPPROPRIATE_CONTENT` | ✅ | ✅ | ✅ | ✅ |
| `PROHIBITED_ITEM_OR_ACTIVITY` | ✅ | ❌ | ❌ | ❌ |
| `MISLEADING_OR_FAKE_LISTING` | ✅ | ❌ | ❌ | ❌ |
| `IMPERSONATION` | ❌ | ❌ | ✅ | ❌ |
| `UNSAFE_BEHAVIOR` | ✅ | ✅ | ✅ | ✅ |
| `OTHER` (details mandatory) | ✅ | ✅ | ✅ | ✅ |

- **BR-X4** At report time the system stores a **snapshot** of the target as evidence: post fields and media keys, comment text with its parent thread context, profile fields, or the reported message plus up to 20 preceding messages for context. The live target may disappear before review, so the snapshot is the evidence.
- **BR-X5** A user cannot report themselves, and may have only one open report per target.
- **BR-X6** The reporter's identity is visible to Admins only, never to the reported user.
- **BR-X7** Report statuses: `OPEN | ACTION_TAKEN | DISMISSED`. Resolving a report requires a resolution note.
- **BR-X8** Snapshots are hard deleted when the report is resolved. [Assumed]

### 4.8 Suspension and deletion
- **BR-M1** **Suspension:** the user row and credentials remain with status `SUSPENDED`. Everything else is **hard deleted**: posts (with comments, likes, and media), the user's comments, replies, and likes elsewhere, connections, blocks, requests, conversations and messages. Sessions are revoked and sockets disconnected. [Confirmed]
- **BR-M2** A suspended account cannot be deleted by the user, so a ban cannot be evaded by deleting and re-registering. [Assumed]
- **BR-M3** Admins and SuperUser can unsuspend an account. Deleted content is not restored. [Assumed]
- **BR-M4** **Account deletion** (self-service) removes the user and everything associated with them. No trace remains. [Confirmed]
- **BR-M5** Audit log entries survive the deletion of their actor, with the actor reference nulled. [Assumed]
- **BR-M6** Suspension and account deletion share one cascade routine. [Assumed, implementation rule]

### 4.9 Media [Confirmed unless noted]
- **BR-D1** Storage is AWS S3. Uploads use presigned URLs: the API issues the URL and records metadata, and files never pass through the API server. Postgres stores only metadata (key, type, size), never file contents. [Presigned flow Assumed]
- **BR-D2** Maximum **10 files per post, images and videos combined**.
- **BR-D3** Allowed types are the popular formats: images `JPEG`, `PNG`, `WebP`; videos `MP4`, `WebM`. [Assumed list]
- **BR-D4** Size limits: images up to 5 MB each, videos up to 25 MB each. [Assumed values]
- **BR-D5** Type and size are validated before a URL is issued, and verified again after upload. [Assumed]
- **BR-D6** Media is deleted from S3 when its post is deleted or expires, or its owner is suspended or deleted.

---

## 5. Fixed Enums (proposed)

**Marketplace categories** [Assumed values]: `TEXTBOOKS_AND_NOTES`, `LAB_GEAR`, `LAPTOPS_AND_COMPUTERS`, `PERIPHERALS_AND_ACCESSORIES`, `OTHER_ELECTRONICS`, `STATIONERY`, `CLOTHING_AND_UNIFORMS`, `FURNITURE_AND_HOME`, `OTHER`

**Marketplace condition:** `NEW`, `LIKE_NEW`, `GOOD`, `FAIR`

**Lost & Found categories** [Assumed values]: `STUDENT_ID_CARD`, `WALLET_OR_BAG`, `ELECTRONICS`, `BOOKS_AND_NOTES`, `KEYS`, `CLOTHING_AND_ACCESSORIES`, `OTHER`

---

## 6. Features and Acceptance Criteria

### F1. Identity, profiles and access (M1)
**Stories**
- As a student, I sign up with my AIUB email, verify it, and manage my profile.
- As a student, I can view other students' profiles, and block or report them.
- As the SuperUser, I manage allowed domains and assign Admins.

**Acceptance criteria**
- AC-1.1 Signup with a domain not on the allow-list is rejected with a clear error.
- AC-1.2 A verification email is sent through Resend after signup. An unverified user cannot access any protected endpoint.
- AC-1.3 Unverified accounts older than 3 days are deleted by a scheduled job.
- AC-1.4 A suspended user cannot sign in and receives a suspension message.
- AC-1.5 Only the SuperUser can change a user's role or edit allowed domains.
- AC-1.6 No public endpoint can create an Admin or SuperUser.
- AC-1.7 Signup, signin, and verification endpoints are rate-limited by Arcjet.
- AC-1.8 A user can update their own profile (name, avatar, department, batch, bio) and delete their own account (subject to BR-M2 and BR-M4).
- AC-1.9 Viewing another user's profile returns only the fields in BR-U2. Email and student ID never appear in responses about other users.
- AC-1.10 A profile of a suspended, deleted, or blocking user returns 404.

### F2. Media (M2)
- AC-2.1 An authenticated user can request a presigned S3 upload URL for an allowed type and size.
- AC-2.2 Disallowed types, oversized files, or an 11th file on a post are rejected before any URL is issued.
- AC-2.3 Media not attached to a post within a set time is cleaned up. [Assumed]
- AC-2.4 Deleting or expiring a post deletes its media from S3.

### F3. Post lifecycle, comments and likes (M3)
- AC-3.1 Creating any post sets `expiresAt = now + 7 days`.
- AC-3.2 Expired posts, their comments, and their likes never appear in list, detail, or search responses.
- AC-3.3 The scheduled job hard-deletes expired posts with their comments, likes, and media.
- AC-3.4 The 6th post or request of the day (combined across features) is rejected with a quota error. The counter resets at midnight Asia/Dhaka.
- AC-3.5 A post that has an open report on it or on any of its comments is not deleted by the expiry job while the report is open.
- AC-3.6 A verified user can add a comment to a visible post, and the post's author is notified.
- AC-3.7 A user can reply to a top-level comment. A reply to a reply is stored under the same top-level comment with the replied-to user recorded. A third level is impossible.
- AC-3.8 Comments are returned as top-level comments by cursor, with replies loaded per thread on request.
- AC-3.9 Deleting a top-level comment deletes its replies. Deleting a reply deletes only that reply. No placeholders remain.
- AC-3.10 The post's author can list everyone who commented or replied, with public profile summaries, and everyone who liked the post.
- AC-3.11 A user can like and unlike a post. The like count is public and the liker list is visible only to the author. A second like by the same user is idempotent.
- AC-3.12 A blocked user's comment, reply, or like attempt is rejected, and blocked users' comments are hidden from each other.
- AC-3.13 Deleting a post, or suspending or deleting a user, deletes the affected comments, replies, and likes.
- AC-3.14 Like notifications are batched.

### F4. Lost & Found (M3)
**Fields (draft):** kind (`LOST | FOUND`), category (enum), title, description, location text, date, photos, status (`OPEN | RETURNED`).
- AC-4.1 Any user can create, edit, and delete their own item.
- AC-4.2 Lists can be filtered by kind, category, and date, and searched by text.
- AC-4.3 Student ID numbers and full names are never exposed in public responses. [Assumed]
- AC-4.4 The author can mark an item `RETURNED`, and can renew it once (BR-P7).
- AC-4.5 Ownership verification should happen in chat, not in public comments. [Guidance, not enforced]

### F5. Reports, moderation and audit (M4)
- AC-5.1 A report must include a valid target, a reason allowed for that target type (BR-X3), and a details text of 20 to 1000 characters; otherwise it is rejected.
- AC-5.2 A snapshot of the target is stored at report time (BR-X4).
- AC-5.3 A duplicate open report from the same reporter on the same target is rejected. Self-reports are rejected.
- AC-5.4 The 6th report of the day is rejected.
- AC-5.5 Admins can list, filter (by status, target type, reason), view, and resolve reports (remove content, dismiss, suspend), with a mandatory resolution note.
- AC-5.6 The reported user can never see who reported them.
- AC-5.7 An Admin cannot act on a report where they are the subject; it escalates to the SuperUser.
- AC-5.8 Every moderation action creates an audit entry.
- AC-5.9 Suspension runs the full cascade of BR-M1 in one transaction (plus Redis, S3, and socket cleanup).
- AC-5.10 An Admin cannot suspend another Admin or the SuperUser.
- AC-5.11 Resolving a report deletes its snapshot.

### F6. Connections and blocking (M5)
- AC-6.1 A user can send a connection request to another user, from a post or from a profile.
- AC-6.2 Duplicate requests between the same pair are impossible, in either direction.
- AC-6.3 The receiver can accept or reject. The sender can cancel while pending.
- AC-6.4 Either side can remove an accepted connection, which deletes the conversation and its messages.
- AC-6.5 Blocking applies BR-C3 fully.
- AC-6.6 Users cannot connect with themselves, suspended users, or users who blocked them.
- AC-6.7 A user can list and remove their blocks.

### F7. Chat (M6)
- AC-7.1 Only users with an accepted connection can have a conversation.
- AC-7.2 Sending a message stores it, delivers it in real time to the recipient if connected (across multiple server instances via the Redis adapter), and notifies them if they are offline.
- AC-7.3 A user can send a message to an offline connection. They receive it on their next login.
- AC-7.4 A user can list conversations (latest message, unread count) and page through message history by cursor.
- AC-7.5 Opening a conversation updates the participant's read marker, and the unread count drops accordingly.
- AC-7.6 Messages older than 7 days are hard deleted by a scheduled job and never returned by any endpoint.
- AC-7.7 Removing a connection, blocking, suspension, or account deletion deletes the conversation and all its messages immediately.
- AC-7.8 Reporting a message stores that message plus up to 20 preceding messages in the report snapshot.
- AC-7.9 Messages over the maximum length, or beyond the rate limit, are rejected.
- AC-7.10 Blocking or suspension disconnects the affected sockets from the conversation.

### F8. Marketplace (M7)
**Fields (draft):** kind (`SELL | RENT`), title, description, category (enum), price (BDT), rent period (for rent), condition (enum), photos/videos, status (`ACTIVE | RESERVED | SOLD`).
- AC-8.1 Users can create, edit, delete, and mark listings reserved or sold.
- AC-8.2 Lists support filters (kind, category, condition, price range) and text search with pagination.
- AC-8.3 No payment handling exists. Arrangements happen in comments or chat.

### F9. Commute Matcher (M8)
Ride posts follow the same lifecycle as every other post (7 days, same quota, comments, likes, Connect).

**Fields (draft):**
- `kind`: `OFFER | REQUEST`
- `leavesUniversityAt`: time of day the user leaves the university (part of the user's schedule)
- `startsForUniversityAt`: time of day the user starts for the university (part of the user's schedule)
- `preferredRoutes`: free text
- optional days of the week the schedule applies to [Assumed]
- optional seat count (for offers) [Assumed]
- status: `OPEN | FILLED`

**Acceptance criteria**
- AC-9.1 A ride post requires `kind`, `preferredRoutes`, and at least one of `leavesUniversityAt` or `startsForUniversityAt`.
- AC-9.2 Lists can be filtered by kind and by time windows for each time field, and searched by text on routes.
- AC-9.3 There is no join request and no fare field. Fares are discussed in comments or chat.
- AC-9.4 Origin and destination fields do not exist: the university is the implied endpoint, and routes are free text.

### F10. Team Finder (M9)
**Fields (draft):** kind (`HACKATHON | COURSE_PROJECT | SPORTS`), title, description, roles or skills wanted, slots needed, deadline, status (`OPEN | FILLED`).
- AC-10.1 Users can create, edit, delete team posts and mark them `FILLED`.
- AC-10.2 Lists can be filtered by kind and searched by text.
- AC-10.3 There is no join-request or membership entity. Interest happens through comments, likes, and Connect. [Assumed]

### F11. Academic Terminal (M10)
**Two post types:** `TutorOffer` (course code, self-declared experience, availability note) and `HelpRequest` (kind `TUTORING | PROJECT_HELP`, course code, description).
- AC-11.1 Users can create, edit, and delete tutor offers and help requests.
- AC-11.2 Lists can be filtered by course code and searched by text.
- AC-11.3 Course codes are free text with a format hint. [Assumed]
- AC-11.4 Reviews and verified tutor credentials are out of scope for v1.

### F12. Notifications (cross-cutting, introduced as needed)
- Triggered by: new comment on your post, reply or @mention, batched likes, connection request received or accepted, a new message while offline, and report outcome for the reporter. [Assumed]
- Delivered in real time over Socket.io when online; otherwise available through a list endpoint until the related object expires. Email is not used for notifications.

### F13. Search (introduced in M3, extended in M7)
- AC-13.1 Search goes through a `SearchService` interface, implemented with Postgres full-text search for v1.
- AC-13.2 Searchable fields are defined per feature, and results exclude expired posts and anything hidden by blocks.

---

## 7. Extensibility Requirements (leave room, build nothing extra)

These are structural hooks only. None of these features is built in v1.

| Deferred feature | Hook required now |
|---|---|
| Group chat | `Conversation` is separate from `Connection`, has a `type` enum (`DIRECT` only), and members live in a `ConversationParticipant` table |
| Read tracking (also for groups) | Read marker (`lastReadMessageId`) stored on the participant row |
| Attachments, voice | `Message.type` enum (`TEXT` only), nullable `body`, and a later `MessageMedia` join to the existing `Media` table |
| Message editing | Nullable `editedAt` column on `Message` |
| Reactions on messages | A later separate `MessageReaction` table |
| Search inside chats | `body` kept as plain text so a full-text index can be added later |
| Typing indicators | Socket events only, never stored in the database |
| More post reaction types | `Reaction.type` enum, with only `LIKE` for now |
| Likes on comments | `Reaction` can be extended to comments later |
| Dedicated search engine | `SearchService` abstraction |

Socket rules for growth:
- NFR-X1 Clients join rooms by conversation ID, not by user pair.
- NFR-X2 Events are namespaced and versioned (for example `chat:message.new`), and every message payload includes its `type`.
- NFR-X3 The socket event contract is documented alongside the OpenAPI spec.

---

## 8. Non-Functional Requirements

**Security**
- NFR-S1 All endpoints require authentication except signup, signin, verification, and health.
- NFR-S2 Authorization is enforced by guards on role and ownership.
- NFR-S3 Secrets live in environment variables only, validated at startup.
- NFR-S4 Input is validated on every endpoint (DTOs). Responses never leak emails, student IDs, or private fields.
- NFR-S5 Arcjet protects all public and write endpoints; stricter limits on auth, posting, commenting, likes, connection requests, messages, and reports.

**Reliability and data**
- NFR-R1 The cascade routine (BR-M6) is transactional. A failure in the Redis or S3 step is retried via a job, not skipped silently.
- NFR-R2 Scheduled jobs (post expiry, message expiry, media cleanup, unverified account cleanup) are idempotent.

**Performance**
- NFR-P1 List endpoints are paginated (cursor-based).
- NFR-P2 Target p95 latency for reads under 300 ms at expected single-university load. [Assumed]

**Observability**
- NFR-O1 Structured logging, an error tracker, and a health-check endpoint.

**Quality**
- NFR-Q1 Every endpoint is documented in OpenAPI.
- NFR-Q2 Unit tests for business rules and e2e tests for each acceptance criterion above.
- NFR-Q3 CI runs lint, type-check, and tests on every pull request.

---

## 9. Milestones

| # | Milestone | Scope |
|---|---|---|
| M0 | Foundation | Repo, Docker Compose (Postgres, Redis, local S3-compatible), config, Prisma, health, Swagger, logging, error format, test harness, CI |
| M1 | Identity and profiles | Better-Auth, domain allow-list, Resend verification, roles, profiles (view), account deletion, unverified cleanup, Arcjet baseline |
| M2 | Media | S3 presigned uploads, media records, limits, cleanup job |
| M3 | Post engine, comments, likes, Lost & Found | 7-day expiry job, quota, threaded comments, likes, notifications, search abstraction, first feature end to end |
| M4 | Reports and moderation | Structured reports with snapshots, admin actions, suspension cascade, audit log |
| M5 | Connections and blocking | Requests, accept/reject, remove, blocks |
| M6 | Chat (lite) | Conversations, stored messages, Socket.io gateway with Redis adapter, read markers, 7-day message expiry, message reports |
| M7 | Marketplace | Listings, filters, search |
| M8 | Commute | Ride posts |
| M9 | Team Finder | Team posts |
| M10 | Academic Terminal | Tutor offers, help requests |

Each milestone ends with: all acceptance criteria passing, OpenAPI updated, `SCHEMA.md` in sync.

---

## 10. Decision Log

| Decision | Status |
|---|---|
| Backend/API first; frontend and deployment later | Confirmed |
| Stack: NestJS, Better-Auth, Arcjet, Prisma, Postgres, Redis, Socket.io, S3, Resend | Confirmed |
| Login via `student_id@student.aiub.edu`; domain allow-list plus email verification only; no ID validation, no batch derivation | Confirmed |
| Roles: User, Admin, SuperUser; Admins manage the whole platform; devs are the day-one Admins | Confirmed |
| Noticeboard dropped; Lost & Found kept | Confirmed |
| Interaction: likes, threaded comments, and Connect then chat | Confirmed |
| Comments threaded to two levels; comment lifecycle equals post lifecycle; post author sees commenters | Confirmed |
| Posts can be liked | Confirmed (details Assumed) |
| Profiles viewable by other users; block and report from profiles | Confirmed |
| Reports must be specific (structured) | Confirmed (exact structure Assumed) |
| Connections global | Confirmed |
| Chat: lite and simple, stored in Postgres, 7-day retention; extras deferred with room left for them | Confirmed |
| Posts expire in 7 days; no soft deletes | Confirmed |
| Quota: 5 posts/requests combined | Confirmed |
| Media: S3, 10 files per post including video, popular types | Confirmed (exact sizes and formats Assumed) |
| Marketplace and Lost & Found categories are fixed enums | Confirmed (values Assumed) |
| Commute: same lifecycle as other posts; ride times are a schedule; preferred routes free text; fares in comments or chat | Confirmed (field details Assumed) |
| Suspended users keep credentials only; everything else hard deleted | Confirmed |
| Account deletion leaves no trace | Confirmed |
| Search: SuperSearch dropped; Postgres full-text behind an abstraction | Confirmed drop; fallback Assumed |
| Modular monolith | Confirmed |
| Devs join first | Confirmed |
| Per-feature join/claim request tables removed | Assumed |
| Lost & Found one-time renewal; expiry paused during open report | Assumed |
| All posts visible to all verified students; prices in BDT; unverified cleanup after 3 days | Assumed |

---

## 11. Open Items

**Before onboarding real (non-dev) students**
1. **Terms of service and privacy policy.** To be discussed later. The platform holds students' emails and conversations.
2. **Informing the university** about the project. To be discussed later.

**Numbers to set when writing SCHEMA.md and configuration** (proposed there, adjustable later)
3. Rate limits: comments and replies, likes, connection requests, and messages per day.
4. Maximum lengths for comments and messages.
5. Media limits: confirm 5 MB per image and 25 MB per video.

**Minor**
6. SuperUser provisioning: seed script (assumed) or environment-based bootstrap.
