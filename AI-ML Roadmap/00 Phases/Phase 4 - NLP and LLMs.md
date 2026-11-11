---
type: moc
phase: 4
tags: [moc, phase/4]
updated: 2026-11-11
---
# Phase 4 - NLP and LLMs

Your specialization: NLP, LLMs, RAG, Bangla NLP and hallucination detection.

[[AI-ML Roadmap Home]] · **Previous phase:** [[Phase 3 - Deep Learning]]
**Next phase:** [[Phase 5 - MLOps]]

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Items",
  length(filter(rows, (r) => r.status = "done")) AS "Done",
  "<progress value='" + length(filter(rows, (r) => r.status = "done")) + "' max='" + length(rows) + "'></progress>" AS "Progress"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 4
GROUP BY phase
```

## Topics
```dataview
TABLE WITHOUT ID file.link AS "Topic", kind AS "Type", status AS "Status", confidence AS "Confidence", completed AS "Completed"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 4
SORT order ASC
```

## All pages in this phase
- [[Stanford CS224N - NLP with Deep Learning]]
- [[Hugging Face LLM Course]]
- [[Stanford CS336 - Language Modeling from Scratch (Deep Dive)]]
- [[Classic NLP]]
- [[Tokenization]]
- [[Embeddings and BERT vs GPT]]
- [[Pretraining and Scaling Laws]]
- [[Prompting and In-Context Learning]]
- [[Fine-tuning, LoRA and Alignment]]
- [[RAG - Retrieval-Augmented Generation]]
- [[LLM Agents and Tool Use]]
- [[LLM Evaluation]]
- [[Multilingual and Low-Resource NLP]]
- [[Bangla NLP]]
- [[Hallucination and LLM Reliability]]
- [[Responsible AI]]
- [[Project - Bangla RAG and Hallucination Detection]]
