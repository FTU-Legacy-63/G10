**ASSUMPTIONS (Owner: Lai Ngoc Linh)**

1. **DTI-only decision rule –** Adjusted DTI \= (Existing obligations \+ New installment) ÷ Adjusted Income, classified into three fixed bands: ≤70% Approve, 70–80% Reduce limit, \>80% Reject.  
- *Disclosure:* the exact Adjusted DTI value is hidden from the player until after a category is locked in, and the true DTI only appears on the final Card.  
2. **Deterministic consequence**. Each dossier still has one designed, correct outcome. A Reduce-limit dossier only adds a player-entered number before that outcome is revealed – it is still not a probabilistic simulation.  
3. **Loan Type / Product Parameters –** Loan Type is Unsecured or Secured only; it routes to a fixed table of tenor cap, maximum age, and interest rate (Unsecured: 60 months / age 70 / 18%; Secured: 360 months / age 70 / 11%). It does not change the DTI decision bands themselves, and there is no LTV or collateral valuation anywhere in this MVP.  
- *Risk:* real secured lending usually also caps loan size by collateral value (LTV); this MVP does not model that at all.  
4. **Age capped through tenor, not through the approved amount –** Adjusted tenor \= min(requested tenor, product’s max tenor, (max age at maturity − current age) × 12). A shorter tenor raises the installment – and therefore the DTI; age never scales the approved amount directly.  
- *Risk:* the same maximum age (70) is applied to both Unsecured and Secured products in this MVP; real banks may vary this by product.  
5. **Installment formula –** New loan monthly installment uses the standard amortization formula P × r ÷ \[1−(1+r)^−n\], not requested amount ÷ tenor. The Reduce-limit sub-flow inverts this same formula (Present Value) to convert the player’s entered installment back into a loan amount.  
- *Risk:* none regulatory – chosen because the old straight-line approximation understated real debt service.  
6. **Simulated dossiers –** unchanged. All applicants are fictional, based on reality.  
   \-   *Reason:* privacy and feasibility.

