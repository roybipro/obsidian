
Short note. Big formula. Small word. Use course rule, not book rule.

## How to write answer

- Write **Is given,** → list numbers.
- Write **We know,** → formula, then put numbers in.
- End with **∴** one line answer + unit.
- Teacher want see numbers put in. Not just answer.

## 1. Management basics (theory)

- **Management** = get work done through people. Use resource well.
- **Fayol:** forecast, plan, organize, command, coordinate, control.
- **Drucker:** management = do things right. Leadership = do right things.
- **4 functions:** Planning, Organizing, Leading, Controlling.
- **Efficiency** = do things right (less waste). **Effectiveness** = do right things (hit goal).
- **Goal** = broad, long. **Objective** = clear, number, short.
- **4 resources:** human, money, physical, information.

**3 levels of manager**

| Level | Who | Main skill |
| --- | --- | --- |
| Top | CEO, MD, board | Conceptual, decision, human |
| Middle | Dept head, branch manager | All balanced |
| First-line | Supervisor, foreman | Technical, human |

**Mintzberg 10 roles (3 groups)**

- **Interpersonal:** Figurehead, Leader, Liaison.
- **Informational:** Monitor, Disseminator, Spokesperson.
- **Decisional:** Entrepreneur, Disturbance handler, Resource allocator, Negotiator.

## 2. Productivity

- **Productivity = Output ÷ Input.**
- **Partial** = output ÷ one input (labor, material, energy).
- **Multifactor (MFP)** = output ÷ (sum of many inputs). Change all input to money first.
- **Total (TFP)** = total output ÷ total input. Often "revenue per Tk input".
- **Growth % = (New − Old) ÷ Old × 100%.** Divide by OLD.

**Watch out**

- Labor-hour = workers × hours/day × days.
- Daily wage × days. Hourly wage × hours.
- Overhead (% of labor) = input too. Add it.
- Reject unit = no revenue. Use sold unit only. Seconds sold cheap → use cheap price.
- Whole company = total revenue ÷ total input. **No average** of unit ratios.
- Workers needed → round **up**.

**Theory:** factors = methods/management, capital, technology, quality, human. Productivity ≠ efficiency.

## 3. Forecasting

**Methods**

| Method | Formula |
| --- | --- |
| Naive | F(t) = A(t−1) |
| Moving avg (n) | F(t) = sum of last n actual ÷ n |
| Weighted MA | F(t) = w1·A(t−1) + w2·A(t−2) + … , sum w = 1 |
| Exp. smoothing | F(t) = F(t−1) + α\[A(t−1) − F(t−1)\] |
| Trend | F(t) = a + bt |

**Trend (least squares):** make year → t = 1, 2, 3 … Make table: t, y, t², ty, sums.

- b = (nΣty − ΣtΣy) ÷ (nΣt² − (Σt)²)
- a = (Σy − bΣt) ÷ n

**Course rules**

- WMA weight mixed up? Sort big → small. Big weight to newest period. Say it.
- Exp. smoothing no start? Use naive: F2 = A1.
- Low α = smooth, slow. High α = fast react.

**Accuracy (small = good)**

| Measure | Formula |
| --- | --- |
| MAD | Σ\|A − F\| ÷ n |
| MSE | Σ(A − F)² ÷ **(n − 1)** |
| MAPE | Σ(\|A − F\| ÷ A) ÷ n × 100% |

- n = only periods with BOTH actual and forecast.
- Trend: first find F for old years with equation. Then error.
- Compare two α: lower MAD wins.

**Theory:** qualitative (expert, survey, sales force) → no past data. Quantitative → time-series or causal. Components: trend, seasonality, cycle, irregular, random. Good forecast: timely, accurate, reliable, simple, written, cost-effective, meaningful unit.

## 4. Capacity planning

- **Design capacity** = max, ideal. **Effective** = max, normal. **Actual** = real output.
- **Utilization = Actual ÷ Design × 100%.**
- **Efficiency = Actual ÷ Effective × 100%.**

**Machines**

- Time needed = Σ(demand × time per unit) (+ setup).
- One machine = hours × shifts × days (× efficiency).
- Machines = time needed ÷ one machine → round **UP**. 2.9 → 3.
- Extra machines = needed − have.

**Cost-volume**

- TC = FC + VC·Q
- TR = P·Q
- Profit = TR − TC
- **Break-even Q = FC ÷ (P − VC)** → round up.
- Q for target profit = (FC + profit) ÷ (P − VC)
- Price for target = (FC + profit) ÷ Q + VC

**Make or buy**

- Set TC make = TC buy → Q = (FC make − FC buy) ÷ (VC buy − VC make).
- Below Q → buy cheap. Above Q → make cheap.
- Yearly cost, monthly question? Divide by 12 first.

**Theory:** effective capacity factors = facilities, human, operations, supply chain, product design, external, maintenance.

## 5. Traps in notes

- Smart watch problem divide growth by NEW MFP (4.808%). Wrong way. Divide by OLD.
- Notes ES α = 0.6 F7 = 2160.87. Wrong. Right = **2196.99**.
- MSE: course use n − 1. Book use n. Exam → use n − 1.
- Small decimal diff from rounding = OK.

## 6. Quick check numbers (from worksheets)

- Lakefront tires: labor 2.5 tires/hr, MFP 0.025, energy cut → +2.56%.
- Garment shop: $57 per labor-hour.
- AC company: TFP A 238.10, B 141.41, company 179.01. Energy: A wins.
- Ice cream: 3-MA F7 = 2200, WMA F7 = 2180, ES α 0.3 F7 = 2131.53 (MAD 191.68) beat α 0.6 (MAD 193.66).
- Trend: F(t) = 606.65 + 274.29t, F2024 ≈ 2526.7, MAD 62.86, MSE 7352.38.
- Pies: BEP 1,200. Make/buy: indifferent at 7,500 units.
