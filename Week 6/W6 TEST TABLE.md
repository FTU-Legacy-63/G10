**TEST TABLE (Owner: Doan Diep Anh)**

* Normal: T01 Approve, T02 Reject, T03 Reduce limit (golden demo)  
* Boundary: T04 DTI \= 70.00%, T05 DTI \= 80.00%  
* Invalid: T06 income \= 0, T07 negative obligation  
* Financial consistency: T08 engine output vs author key (KHCN-04, secured)

**T01 \- Normal / Approve (KHCN-01, Trần Phương Anh)**  
 Input: Income 38,000,000; Existing (CIC) 10,000,000; Unsecured, 500,000,000 / 60mo; installment 12,696,700.  
 Expected: DTI \= 22,696,700 ÷ 38,000,000 \= 59.7% → Approve. Room after \= 1,100,000,000.  
 

**T02 \- Normal / Reject (KHCN-02, Đỗ Văn Kiên)**  
 Input: Income 19,500,000; Existing (CIC) 11,000,000; Secured, 1,000,000,000 / 180mo; installment 11,366,100.  
 Expected: DTI \= 22,366,100 ÷ 19,500,000 \= 114.7% → Reject. Room unchanged.

**T03 \- Normal / Reduce limit (KHCN-03, Trịnh Thị Hạnh \- golden demo)**  
 Input: Income 30,000,000; Existing (CIC) 15,000,000; Unsecured, 280,000,000 / 72mo (capped 60); installment 7,110,200.  
 Expected: DTI \= 22,110,200 ÷ 30,000,000 \= 73.7% → Reduce limit. System Max installment 6,000,000; System Max loan ≈ 236,282,000; Room after ≈ 1,363,718,000.

**T04 \- Boundary / 70.00% edge (synthetic, derived from KHCN-03 ceiling)**  
 Input: Income 30,000,000; Existing 15,000,000; installment 6,000,000.  
 Expected: DTI \= 21,000,000 ÷ 30,000,000 \= 70.00% → Approve (≤ 70% is inclusive). Tests that the build does not misclassify the exact 70% line as Reduce limit.  
 

**T05 \- Boundary / 80.00% edge (synthetic)**  
 Input: Income 30,000,000; Existing 15,000,000; installment 9,000,000.  
 Expected: DTI \= 24,000,000 ÷ 30,000,000 \= 80.00% → Reduce limit (not Reject; \> 80% is exclusive). Build must return Reject only above 80.00%.  
 

**T06 \- Invalid / division guard (income \= 0\)**  
 Input: Income 0; Existing 15,000,000; installment 7,110,200.  
 Expected: Validation blocks the computation. Show a validation message (e.g. "Income must be greater than 0"). No division error, no crash, no decision produced.  
 

**T07 \- Invalid / negative input**  
 Input: Income 30,000,000; Existing obligations \-5,000,000.  
 Expected: Validation rejects the input (obligations cannot be negative). Show a validation message. No computation, no decision.

**T08 \- Financial consistency / engine vs author key (KHCN-04, Nguyễn Văn Thịnh, secured)**  
 Purpose: confirm the engine reproduces the author key on the hardest path \- secured 11% rate, age-to-70 tenor cap, and PV reduce-limit conversion. This checks formula correctness, not just "it runs."  
 Input: Income 45,000,000; Existing (CIC) 18,000,000; Secured, 950,000,000 / 120mo; age 63; 11%/year (r \= 0.9167%/month).  
 Expected: Adjusted tenor \= min(120, 360, (70-63)×12=84) \= 84 (age cap binds). Installment (PMT) ≈ 16,266,600. DTI \= 34,266,600 ÷ 45,000,000 \= 76.1% → Reduce limit. System Max installment \= 0.70 × 45,000,000 \- 18,000,000 \= 13,500,000. System Max loan (PV, n=84, r=0.9167%) ≈ 788,427,000. Pass if system figures match these within rounding.  
 

