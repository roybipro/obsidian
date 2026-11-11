---
type: moc
phase: 3
tags: [moc, phase/3]
updated: 2026-11-11
---
# Phase 3 - Deep Learning

Neural networks in PyTorch, from backprop to Transformers.

[[AI-ML Roadmap Home]] · **Previous phase:** [[Phase 2 - Classical ML]]
**Next phase:** [[Phase 4 - NLP and LLMs]]

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Items",
  length(filter(rows, (r) => r.status = "done")) AS "Done",
  "<progress value='" + length(filter(rows, (r) => r.status = "done")) + "' max='" + length(rows) + "'></progress>" AS "Progress"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 3
GROUP BY phase
```

## Topics
```dataview
TABLE WITHOUT ID file.link AS "Topic", kind AS "Type", status AS "Status", confidence AS "Confidence", completed AS "Completed"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 3
SORT order ASC
```

## All pages in this phase
- [[PyTorch Basics]]
- [[Karpathy - Neural Networks Zero to Hero]]
- [[Dive into Deep Learning (d2l)]]
- [[fast.ai Practical Deep Learning (Optional)]]
- [[MLPs and Backpropagation]]
- [[Training Deep Nets]]
- [[Regularization and Generalization in Deep Nets]]
- [[CNNs]]
- [[RNNs and LSTMs]]
- [[Attention and Transformers]]
- [[Transfer Learning]]
- [[Debugging Neural Network Training]]
- [[Practical GPU Training]]
- [[Generative Models Overview (Optional)]]
- [[Project - Small Language Model from Scratch]]
