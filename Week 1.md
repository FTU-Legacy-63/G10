# **WEEK 1** 

# **1. Who is the target user?** 

Finance & Banking students (and equivalent majors) who are aiming for credit/risk roles but have zero hands-on appraisal experience. 

- Year 3-4 students (close to internships/jobs) 

- Have taken or are taking credit/banking coursework (so they know the theory but not the practice). 

**2. What task or decision does the user need support for?** 

Practicing the core credit-officer decision: "For this customer, should I lend, how much, and on what terms?" Concretely, the sub-skills they need reps on are reading a dossier, spotting red flags, and converting that into a defensible lending decision under a limited credit room. This mirrors the real job: Vietnamese credit-officer roles are defined as assessing an applicant's ability to repay, checking credit history, and evaluating whether the requested loan fits their income and financial capacity. 

**3. Why is the task difficult? (4 pain points chính)** 

- **It is judgment, not arithmetic** . There is no single correct answer; the officer must weigh trade-offs. Industry framing confirms credit is the practical, judgment-based reality of credit decisions rather than a formula. 

- **The core skill is hard and experience-gated.** Many VN postings demand at least 2 years of experience at a credit institution in an equivalent role, which students by definition do not have. That is the exact gap. 

- **No safe practice environment.** Real mistakes cost real money, so beginners cannot learn by trial and error on the job. 

- **No local practice tool.** Existing simulators are either US consumer credit-score tools (Credit Karma, Capital One, MoneyFit) or a paid English-language corporate simulation. None is Vietnamese, none targets FTU students, none uses local dossiers/collateral/DSCR logic. 

- ➔ **Draft problem statement** : Year 3-4 Finance & Banking students at FTU preparing for credit-related internships or jobs struggle to make defensible lending decisions-whether to lend, how much to lend, and under what conditions, because they have theoretical knowledge but limited experience applying credit judgment in realistic lending contexts with constrained credit room, and lack a suitable local practice tool. 

**4. Which evidence supports this claim?** 

- Demand is real and growing. VN credit-appraisal hiring is described as recovering, with demand rising again after the banking sector's restructuring phase. 

- The skill is the explicit requirement. Postings require credit analysis and appraisal skills plus problem-solving and decision-making. 

- A gap exists between theory and reps. Experience minimums (2 years) show classrooms alone don't produce job-ready appraisers. 

- Novelty is defensible. A paid English corporate credit simulation exists, which bridges theoretical finance and judgment-based credit decisions and defends analysis before a credit committee. This _proves the concept works_ while leaving your niche open: Vietnamese-language, FTU-student-focused, free, with local dossiers and dual individual+corporate tracks. 

Kiểu là: Không có công cụ luyện tập nội địa. Các simulator hiện tại hoặc là công cụ chấm điểm tín dụng tiêu dùng Mỹ (Credit Karma, Capital One, Money Fit), hoặc là một simulation doanh nghiệp bằng tiếng Anh có trả phí (Finsimco). Không cái nào bằng tiếng Việt, không cái nào nhắm vào sinh viên, không cái nào dùng hồ sơ/TSĐB/logic DSCR của Việt Nam. 

# 5. What visible output has each member produced? 

**Diệp Anh (Product Lead):** Project Leader/ Game concept: Owns game concept and scoring mechanics. Output: Game Design Doc / Rulebook covering the core loop (room allocation → read dossier → analyze → decide → score & explain), room mechanics (total room per round, number of dossiers, "cannot approve all" constraint), and the 5-option Decision Matrix (Approve / Reject / Reduce limit / Require collateral / Add conditions) with consequences for each. Scoring Spec defining how the three end-of-round criteria (decision accuracy, portfolio risk, room efficiency) combine into a final score with weights, plus range-based scoring (not binary right/wrong) and the debrief screen. Scope definition (target / fallback / out-of-scope, with KHCN as core); and the README + Project Proposal + Solution Structure linking W1–W7 evidence, stating output vs desired outcome, the validate-first pivot, and the competitor scan. 

**Hà (Scenario & Data Lead):** Scenario writer & Data gatherer: Owns dossier bank and information architecture. Output: Input Dictionary specifying the KHCN field 

schema (age, occupation, income, employment type, marital status, dependents, health, credit history, requested amount/term) with meaning and unit per field; the Dossier Bank of 8–12 authored cases, each embedding specific red flags from Linh's table and tiered by difficulty (clean → single flag → multiple conflicting flags); and Assumptions + Sample Case documentation stating the data is team-created (not real) and tracing one sample dossier to its intended output. 

**Linh (Credit Lead):** Owns financial source-of-truth and answer key. Output: Credit Appraisal Rulebook defining the credit limit formula − − (multiple of net disposable income = income living costs existing obligations), risk adjustment factors (occupation / health / age), and repayment-capacity logic (DTI / DSCR); a standardized Red Flag table (unstable income, high-risk occupation, high dependents-to-income ratio, near retirement age) with adjustment weight and business justification per flag; a per-dossier Answer Key giving the correct decision, accepted limit range, and reasoning for each case; and threshold disclosure (e.g. burden ceiling) marked as assumption or sourced. 

**Minh (Tech Lead):** Technical. Owns engine, integration, and deployment. Output: the Core Engine handling state management (room, portfolio, current dossier, accumulated score), scoring computation (implementing Diệp Anh's formula and Linh's answer key: player-entered limit compared against the correct range to produce a score), and the data loader reading the dossier bank; the end-to-end integration route (UI input → validation → credit logic → output score & explanation → next dossier); and the Test Table + Bug Log (normal / boundary / invalid / financial-consistency cases) plus GitHub Pages deployment (K62 format) with run instructions. 

**Trang (Design Lead):** Design - Owns UX and interface. Output: the Screen Set and UX Flow covering the dossier-reading screen, the decision panel (5 buttons + limit-input field), the room dashboard (remaining room, approved portfolio, portfolio risk), the per-dossier result screen using the Result → Reason → Meaning 

→ Action → Limit pattern, and the end-of-round debrief; input and error clarity (labels, VND units, validation messages, plus happy / alternative / error paths); and the visual identity ("The Credit Desk", design tokens, red-flag/alert icons). Must defend: which inputs are mandatory, which errors are handled, which screen produces the main output, and where each screen connects to the logic. 

# **6. Which decision did the team revise after feedback or diagnosis?** 

- **From solution-first to problem-first.** The team initially planned to build the appraisal game immediately (feature-first). After diagnosis, it stopped feature design and reframed W1 as validating whether the problem is real and whose it is. 

- **Narrowed the target user.** From "people who want to learn appraisal" to "year 3–4 FTU banking students with no real appraisal experience." 

- **De-scoped the build.** From one full track: individual, both with complete FS analysis) to: individual track as the polished core, where players interpret pre-computed metrics rather than compute them. 

# **7. Output vs Desired outcome** 

- **Desired outcome** (user's real-world goal): _the learner becomes confident and competent enough to reason through a credit decision_ , closing the theory ↔ judgment gap, ready for an internship/job. 

- **Output** (concrete deliverable): _a web-based credit-appraisal game_ with an individual track, range scoring, and credit room. Output serves the outcome; it is not the outcome. 

