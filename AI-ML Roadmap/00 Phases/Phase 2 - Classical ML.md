---
type: moc
phase: 2
tags: [moc, phase/2]
updated: 2026-11-11
---
# Phase 2 - Classical ML

Core ML, evaluation and debugging. Don't skip it: LLM work depends on it.

[[AI-ML Roadmap Home]] · **Previous phase:** [[Phase 1 - Data Toolkit]]
**Next phase:** [[Phase 3 - Deep Learning]]

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Items",
  length(filter(rows, (r) => r.status = "done")) AS "Done",
  "<progress value='" + length(filter(rows, (r) => r.status = "done")) + "' max='" + length(rows) + "'></progress>" AS "Progress"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 2
GROUP BY phase
```

## Topics
```dataview
TABLE WITHOUT ID file.link AS "Topic", kind AS "Type", status AS "Status", confidence AS "Confidence", completed AS "Completed"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 2
SORT order ASC
```

## All pages in this phase
- [[Andrew Ng - Machine Learning Specialization]]
- [[ISLP - Intro to Statistical Learning (Python)]]
- [[Data Preprocessing and Feature Engineering]]
- [[Linear and Logistic Regression]]
- [[Trees, Random Forests and Gradient Boosting]]
- [[SVM, kNN, k-means and PCA]]
- [[Naive Bayes and Probabilistic Classifiers]]
- [[Model Evaluation]]
- [[Hyperparameter Tuning]]
- [[Error Analysis and Interpretability]]
- [[Time-Series Forecasting Basics (Optional)]]
- [[Project - ML Algorithms from Scratch]]
- [[Project - End-to-End ML Pipeline]]
- [[Milestone - Submit to a Kaggle Competition]]
