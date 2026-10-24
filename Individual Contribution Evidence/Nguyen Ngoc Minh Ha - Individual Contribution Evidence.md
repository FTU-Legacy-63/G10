# **Nguyen Ngoc Minh Ha \- INDIVIDUAL CONTRIBUTION EVIDENCE**

**Course:** Technology Applications in Banking and Finance (NHA408E) \- FTU 2026

**Project:**  The Credit Desk

**Member:** Nguyen Ngoc Minh Ha

**Student ID:** 2413380016

**Main Role:** Scenario and Data Lead

## **I. Executive Summary of Role and Responsibilities**

I served as the Scenario and Data Lead for the project, overseeing the development and management of the game's data components, including customer dossiers and the supporting evidence used to inform players' credit decisions. My role focused on ensuring the realism, internal consistency, and reliability of the data, which were essential to the game's educational effectiveness.

My responsibilities encompassed five key areas: defining the input dictionary for all dossier fields, developing the Scenario Flag Matrix to ensure appropriate case coverage and difficulty levels, preparing customer dossiers, building the Warehouse of verified income records, and documenting the sources and calculations underlying all financial figures. As the project progressed, my scope of work expanded from developing five dossiers focused on Debt-to-Income (DTI) analysis for the Capacity-only MVP to eight dossiers covering all five Cs of credit and five possible lending decisions in the final product. Throughout the process, I collaborated closely with the Credit Lead, who was responsible for the Rulebook and answer-key logic, to ensure that all case data aligned with the established credit assessment criteria and could be accurately evaluated according to the specified rules.

## **II. Personal Imprint on the Product**

My primary contribution was to develop each dossier as a structured learning scenario rather than simply a collection of customer information. Each of the eight dossiers was designed with a specific difficulty level, a decisive factor determining the correct credit decision, a set of potential traps, and a detailed answer key that allowed all financial figures to be verified and reproduced using the Rulebook. Easy cases incorporated fewer complexity flags to help new players understand the fundamental assessment procedures, while Hard cases combined multiple flags to encourage more comprehensive analysis and careful evaluation of customer information.

Another key aspect of my contribution was the strategic placement of evidence within each dossier. Potential traps were intentionally presented without explicit labels, requiring players to independently identify and verify questionable information. For example, self-reported salaries, advertised rental income, or misleading average figures were included in the dossiers, requiring players to cross-check them against the Warehouse and CIC records, thereby reflecting the verification process conducted by credit officers in real-world lending assessments. Additionally, I calibrated the available credit room to ensure that correct lending decisions remained within the established limit, while incorrect approvals would result in exceeding that limit.

## **III. What I Actually Did**

My work resulted in five key deliverables, each serving a distinct purpose while contributing to the overall consistency and functionality of the game.

1. ### **Sample Input/Output**

I first developed the input dictionary, which defines all variables used in the game. These variables are organised into five categories: applicant profiles visible to players, loan requests, credit room status, derived variables, and player inputs. For each variable, the dictionary specifies its definition, format, data source, and associated output, ensuring a consistent understanding of the data structure across the team. The document also includes a source-use map and a complete worked example illustrating the process from initial inputs to final outputs.

2. ### **Scenario Flag Matrix**

Before developing the extended dossiers, I established a set of flags covering the five Cs of credit assessment: Character, Conditions, Capacity, Capital, and Collateral, along with five additional flags related to game mechanics. Each flag was classified as either decisive or non-decisive for each of the eight cases. The matrix also defines the design specifications for each dossier, including the loan type, expected credit decision, decisive factor, and potential incorrect decision resulting from the embedded traps. Additionally, each case was mapped against the Rulebook's sequence of assessment procedures to identify the stage at which a decision is reached. Case difficulty was determined based on the total number of flags and decisive flags. Overall, the matrix comprises 43 main flags, including 26 decisive flags.

3. ### **Dossier Set**

I developed eight customer dossiers, each consisting of a player-visible case description, a CIC extract accessible upon request, a detailed answer key containing all necessary calculations, and Decision-Consequence Cards explaining the outcomes and potential errors associated with incorrect player decisions. These eight dossiers were developed as an extension of the five cases created for the Capacity-only MVP. The expanded set was designed to cover the additional assessment criteria introduced in the extended Rulebook, including Character ratings, loan purpose verification, collateral eligibility and Loan-to-Value (LTV) assessment, Capital reserve coverage, and Conditions ratings. It also incorporated two additional lending decisions: Require More Collateral and Add Conditions.

4. ### **Warehouse**

I developed third-party verification records for the eight main applicants, including payroll documents, tax authority records, land registry information, and registered lease agreements. These records provide the supporting evidence required to calculate verified income and identify key factors influencing credit decisions. The Warehouse was structured as a searchable database containing both relevant records and similar-looking entries, requiring players to correctly identify the applicant and verify the appropriate information before conducting their assessments.

5. ### **Sources**

I compiled a Sources file documenting the origin of all material financial figures, organised by dossier. Information such as salaries, property values, rental income, and industry outlooks was obtained from publicly available salary guides, property listing platforms, government salary regulations, and market research reports. Figures without directly comparable public sources, including liquid assets and CIC credit histories, were explicitly identified as simulated data. For example, the net income of a lecturer was calculated using the applicable base salary, salary coefficient, occupational and seniority allowances, and social insurance deductions. This approach helped ensure that the financial information used in the dossiers was transparent, traceable, and consistent with the project's assessment framework.

## **IV. Contribution Evidence**

1. ### **For MVP**

- File “SCENARIO FLAG MATRIX of MVP”: this file lists the flags and checks assigned to each dossier in the MVP and serves as the blueprint from which the complete dossiers were written.  
- File “DOSSIER SET FOR MVP”: this file contains the set of five dossiers used in the MVP.  
- File “WAREHOUSE of MVP”: this file contains the Warehouse records of the five main dossiers, which the player uses to verify the applicant’s information.  
- File “Adjusted SAMPLE INPUT OUTPUT”: this file contains the input dictionary, the source use map and the worked sample cases for the MVP.

2. ### **For the final product**

- File “EXTENDED SCENARIO FLAG MATRIX”: this file lists the flags and checks assigned to each dossier in the final product and served as the blueprint from which the complete dossiers were written.  
- File “EXTENDED DOSSIER SET”: this file contains the set of eight dossiers used in the final product.  
- File “EXTENDED WAREHOUSE”: this file contains the Warehouse records of the eight main dossiers, which the player uses to verify the applicant’s information.  
- File “EXTENDED SAMPLE INPUT OUTPUT”: this file contains the input dictionary, the source use map and the worked sample cases for the final product.  
- SOURCES:

| Dossier | Item | Value used | Source |
| ----- | ----- | ----- | ----- |
| **All** | Interest rates, maximum tenor, maximum age, DTI thresholds | 11%/18%; 360/60 months; age 70; 70%/80% | Rulebook |
|  | Max LTV, reserve cover, decision order | 70%; 3 months | Rulebook |
|  | CIC rule (current group, worst group in 12 months, inquiries), debt obligations, liquid assets |  | Rulebook |
| **01**  | HR Manager salary | 36 million | [https\://www\.careerlink.vn/cam-nang-luong/muc-luong-nganh-nhan-su/](https://www.careerlink.vn/cam-nang-luong/muc-luong-nganh-nhan-su/) |
|  | Expenses: mid-size SUV car, tuition fees,... | 900 million | [https\://mazdamotors.vn/price-board](https://mazdamotors.vn/price-board) [https\://kiddihub.com/tim-kiem/bac-ninh/thanh-pho-bac-ninh](https://kiddihub.com/tim-kiem/bac-ninh/thanh-pho-bac-ninh) |
|  | Liquid assets 135M (savings 85M \+ term deposit 50M), 2 inquiries |  | Simulated |
|  | Export electronics industry: Favorable | Bắc Ninh exports in 9M/2026 up nearly 40% | [VietnamPlus – "Bắc Ninh continues to affirm its position as a major manufacturing and export hub of the country"](https://www.vietnamplus.vn/bac-ninh-tiep-tuc-khang-dinh-vi-tri-trung-tam-san-xuat-xuat-khau-lon-cua-ca-nuoc-post1140554.vnp) |
| **02** | Salary (warehouse supervisor, sewing) | 19.5 million, 7 million | [https\://jobsgo.vn/muc-luong-giam-sat-kho.html](https://jobsgo.vn/muc-luong-giam-sat-kho.html) [https\://talentnetwork.vn/vietnamsalary/warehouse-supervisor](https://talentnetwork.vn/vietnamsalary/warehouse-supervisor) [https\://jobsgo.vn/muc-luong-tho-may.html](https://jobsgo.vn/muc-luong-tho-may.html) |
|  | 2-storey alley house, 44 m², in Hóc Môn: price 1.0 billion, appraised 1.06 billion | 44 m² × 24 million/m² ≈ 1.06 billion | [Houses 800 million–1 billion in Nhị Bình](https://batdongsan.com.vn/nha-dat-ban-xa-nhi-binh/gia-tu-800-trieu-den-1-ty) (multi-storey car-access alley house, 950 million); [houses 2–3 billion in Nhị Bình](https://batdongsan.com.vn/ban-nha-rieng-xa-nhi-binh/gia-tu-2-ty-den-3-ty) (107 m² house at 2.57 billion, ≈24 million/m²) |
|  | Logistics industry: Neutral | Neutral | [MBS Research, 26 Jun 2026 – Q2/2026 Logistics sector earnings forecast](https://www.mbs.com.vn/files/uploads/2026/06/Logistics_20260626-2.pdf): mixed picture (imports/exports 5M \+25%, containers \+10.5%, express delivery profit down due to fuel) |
|  | Liquid assets 60M |  | Simulated |
| **03** | University lecturer salary | 30.5 million | \- Base salary: 2,530,000 VND/month [cvwork](https://cvwork.vn/viec-lam/luong-giao-vien)\- Coefficient: a senior lecturer (grade II) is placed on pay scale A2.1, coefficient 4.40–6.78 → Step 3 is chosen, at 5.08.\- [Preferential occupational allowance:](https://lsvn.vn/nha-giao-duoc-huong-phu-cap-uu-dai-theo-nghe-cao-nhat-80-a173278.html) the 25% rate applies to teachers at higher-education institutions.\- [Seniority allowance:](https://baochinhphu.vn/phu-cap-tham-nien-nha-giao-duoc-tinh-tu-khi-nao-102250717161806039.htm) after 5 years of social insurance contributions, the teacher receives 5% of the salary plus position allowance; from the sixth year, a further 1% per year → total 16%.\- [Head-of-department allowance:](https://thuvienphapluat.vn/lao-dong-tien-luong/toan-bo-muc-phu-cap-chuc-vu-tai-co-so-giao-duc-dai-hoc-theo-du-thao-nghi-dinh-cu-the-ra-sao-65524.html) x 0.40\- Net of 10.5% social insurance (excluding specific allowances).\- Internal additional income payments. [TOTAL: 30.5](https://thanhnien.vn/tu-112026-luong-cua-giang-vien-dh-tinh-the-nao-va-cao-nhat-bao-nhieu-185251104132114817.htm) |
|  | Adviser for a port-logistics company salary | 8 million | [https\://jobsgo.vn/blog/cac-vi-tri-viec-lam-luong-cao-trong-nganh-logistics/](https://jobsgo.vn/blog/cac-vi-tri-viec-lam-luong-cao-trong-nganh-logistics/) |
|  | Study-abroad cost, own capital, liquid assets, CIC |  | Simulated |
|  | Public university education and port logistics: Neutral | Neutral | Education: state salaries are not cyclical. Logistics: [MBS Research, 26 Jun 2026](https://www.mbs.com.vn/files/uploads/2026/06/Logistics_20260626-2.pdf) |
| **04** | Pension | 8 million | [https\://thuvienphapluat.vn/lao-dong-tien-luong/bang-luong-giao-vien-thcs-chinh-thuc-theo-he-so-luong-tai-thong-tu-31-nhu-the-nao-59308.html](https://thuvienphapluat.vn/lao-dong-tien-luong/bang-luong-giao-vien-thcs-chinh-thuc-theo-he-so-luong-tai-thong-tu-31-nhu-the-nao-59308.html) [BHXH](https://phuyen.baohiemxahoi.gov.vn/tintuc/Pages/van-de-ban-doc-quan-tam.aspx?CateID=275&ItemID=8406) Middle school teacher, 40 years of service (grade II: the grade is based on professional qualification, not on years of service; salary coefficient 4 to 6.38); base salary 2.53M → salary \~11M; monthly pension rate \= the maximum of 75% of the social-insurance contribution salary.  |
|  | Shophouse rent & rented house | 24 million/month and 15 million/month | [Shophouse](https://batdongsan.com.vn/cho-thue-shophouse-nha-pho-thuong-mai-da-nang) [Rented house](https://batdongsan.com.vn/cho-thue-nha-rieng-da-nang)  |
|  | Old house in Hòa Vang, Đà Nẵng: appraised 620 million | 90 m² × \~6.9 million/m² | [Hòa Vang house index](https://batdongsan.com.vn/ban-nha-rieng-hoa-vang-ddn) (price range 6–76 million/m²; 84 m² house in Hòa Liên at 2.25 billion); [Hòa Phong](https://batdongsan.com.vn/ban-nha-rieng-xa-hoa-phong) (1.95 billion near Túy Loan market); [Hòa Nhơn](https://batdongsan.com.vn/ban-nha-rieng-xa-hoa-nhon) (150 m² at 3.85 billion) |
|  | Liquid assets |  | Simulated |
|  | Pension and rental income source: Neutral | Neutral | Simulated (state pension and contracted rent are not tied to an industry cycle) |
|  | Other expenses |  | [https\://pacificcross.com.vn/vi/chi-phi-mua-bao-hiem-suc-khoe/](https://pacificcross.com.vn/vi/chi-phi-mua-bao-hiem-suc-khoe/)  |
| **05** | Editor salary | 15 million | [https\://thuvienphapluat.vn/lao-dong-tien-luong/bang-luong-vien-chuc-bien-tap-vien-tu-172024-nhu-the-nao-khi-thay-doi-muc-luong-co-so-27228.html](https://thuvienphapluat.vn/lao-dong-tien-luong/bang-luong-vien-chuc-bien-tap-vien-tu-172024-nhu-the-nao-khi-thay-doi-muc-luong-co-so-27228.html) |
|  | KOL salary |  | [https\://blog.vn.revu.net/thue\_kol/\#Bang\_gia\_thue\_KOLs\_cap\_nhat\_moi\_nhat](https://blog.vn.revu.net/thue_kol/#Bang_gia_thue_KOLs_cap_nhat_moi_nhat) |
|  | Savings, liquid assets |  | Simulated |
|  | 1-bedroom apartment, 40 m², in Dĩ An price | price 1.0 billion, appraised 1.012 billion | [https\://batdongsan.com.vn/ban-nha-rieng-di-an-bd/gia-tu-1-ty-den-2-ty](https://batdongsan.com.vn/ban-nha-rieng-di-an-bd/gia-tu-1-ty-den-2-ty) |
|  | Digital media industry: Neutral | Neutral | Simulated |
|  | Other expenses |  | [https\://tuoitre.vn/plo/hoc-phi-83-truong-tu-tai-tphcm-cao-nhat-gan-60-trieu-dongthang-109786307.htm](https://tuoitre.vn/plo/hoc-phi-83-truong-tu-tai-tphcm-cao-nhat-gan-60-trieu-dongthang-109786307.htm) [https\://www\.decathlon.vn/blog/chi-phi-choi-golf/?srsltid=AU7gw4UBS1KIEPparv5jT9zUNuYsvQ6BD4DOA0i57cPT98zd8xk4JqOE\#21\_Chi\_phi\_tai\_san\_tap\_golf\_Driving\_Range](https://www.decathlon.vn/blog/chi-phi-choi-golf/?srsltid=AU7gw4UBS1KIEPparv5jT9zUNuYsvQ6BD4DOA0i57cPT98zd8xk4JqOE#21_Chi_phi_tai_san_tap_golf_Driving_Range) |
| **06** | Logistics salary | 30 million | [CareerLink – logistics CV guide](https://www.careerlink.vn/cam-nang-viec-lam/viet-cv-resume/huong-dan-viet-cv-logistics) |
|  | Part-time adviser at a garment company | 5 million | [https\://jobsgo.vn/blog/cac-vi-tri-viec-lam-luong-cao-trong-nganh-logistics/](https://jobsgo.vn/blog/cac-vi-tri-viec-lam-luong-cao-trong-nganh-logistics/) |
|  | 2-bedroom apartment, 57 m², Hải Phòng | 2.2 billion | [Economics & Finance Magazine, 24 Apr 2026](https://tapchikinhtetaichinh.vn/gia-can-ho-chung-cu-quy-i2026-vuot-550-trieu-dongm2-154629.html): new Hải Phòng towers 42–62 million/m²; 38.6 million is below this level, consistent with a quick resale unit |
|  | Own capital, liquid assets, CIC |  | Simulated |
|  | Logistics industry (main source): Neutral | Neutral | [MBS Research, 26 Jun 2026](https://www.mbs.com.vn/files/uploads/2026/06/Logistics_20260626-2.pdf) |
|  | Textile & garment industry (secondary source): Unfavorable | Unfavorable | [VCCI, 7 Apr 2026 (SSI report)](https://www.vcci.com.vn/tin-tuc/gong-kim-chi-phi-va-thue-quan-bop-nghet-tang-truong-xuat-khau-thuy-san-det-may-con-1-chu-so): unfavorable backdrop, exports growing at single digits; [Economics & Finance Magazine, 14 Sep 2026 (KAFI)](https://tapchikinhtetaichinh.vn/nganh-det-may-tang-truong-phan-hoa-ap-luc-bien-loi-nhuan-gia-tang-166977.html): 6M exports \+1.7%, garments −0.4%, margins squeezed; [Vinatex, 25 Aug 2026](https://vinatex.com.vn/year-end-2026-order-outlook-stronger-collaboration-greater-collective-strength/): 6M revenue \+9.2%, pre-tax profit \+39.5%, orders sufficient through end-2026, 2027 unclear |
| **07** | Production Planning Manager (garment) | 38 million | [JobsGO – Production Planning Manager (Garment), ID22760](https://jobsgo.vn/viec-lam/production-planning-manager-garment-id22760-1500-29190015876.html) |
|  | 120 m² plot in Biên Hòa | 120 m² × 16.3 million/m² \= appraised 1.96 billion | [muaban.net – project land in Biên Hòa](https://muaban.net/bat-dong-san/ban-dat-du-an-khu-dan-cu-tp-bien-hoa-dong-nai): typical 14–35 million/m²; Biên Hòa New City 16–18 million/m² for plots from 5×18 to 7×20 m |
|  | Liquid assets, CIC |  | Simulated |
|  | Textile & garment industry (sole income source): Unfavorable | Unfavorable | [VCCI](https://www.vcci.com.vn/tin-tuc/gong-kim-chi-phi-va-thue-quan-bop-nghet-tang-truong-xuat-khau-thuy-san-det-may-con-1-chu-so), [Economics & Finance Magazine (KAFI)](https://tapchikinhtetaichinh.vn/nganh-det-may-tang-truong-phan-hoa-ap-luc-bien-loi-nhuan-gia-tang-166977.html), [Vinatex](https://vinatex.com.vn/year-end-2026-order-outlook-stronger-collaboration-greater-collective-strength/) |
| **08** | Senior software engineer salary | 45 million | [https\://daihoc.fpt.edu.vn/huong-nghiep/luong-nganh-ky-thuat-phan-mem/\#Muc\_luong\_nganh\_Ky\_thuat\_phan\_mem\_theo\_vi\_tri\_va\_kinh\_nghiem](https://daihoc.fpt.edu.vn/huong-nghiep/luong-nganh-ky-thuat-phan-mem/#Muc_luong_nganh_Ky_thuat_phan_mem_theo_vi_tri_va_kinh_nghiem) |
|  | IT outsourcing industry: Neutral | Neutral | Simulated |

## 

## **V. How This Contribution Creates Value for the Final Product**

My deliverables established a reliable and consistent content foundation for the game. All correct decisions in the Dossier Set can be verified and reproduced using the formulas specified in the Rulebook, allowing the Technical Lead to use the answer keys for engine testing and the Credit Lead to review their compliance with the established assessment criteria. This ensures that the feedback provided to players is accurate, transparent, and supported by clear calculations and reasoning.

The Scenario Flag Matrix and Dossier Set also contributed to the completeness and balance of the game's content. The eight cases collectively cover all five Cs of credit assessment and five possible lending decisions, with difficulty levels increasing according to the number of decisive flags. This provided the Product Lead and Design Lead with a structured basis for determining the sequence of cases within each round. Additionally, the Decision-Consequence Cards were designed to explain not only why a particular decision was incorrect but also the underlying reasoning and potential consequences, helping players learn from their mistakes.

The Warehouse further enhanced the learning experience by introducing an additional layer of complexity through independent income verification. Rather than relying solely on the Rulebook, players were required to examine supporting documents, identify relevant information, and verify financial figures before making credit decisions. This approach strengthened the game's practical learning value by encouraging players to apply analytical skills and exercise credit judgment under realistic constraints.

## **VI. What I Have Learnt**

One of the most important lessons I learned from this project was the importance of designing scenarios based on clearly defined learning objectives. Before developing each dossier, I needed to identify the specific assessment criteria it should test, the expected credit decision, and the potential mistakes it should highlight. These elements then guided the selection of financial figures, supporting evidence, and case narratives. I realised that developing a dossier without a clear objective could lead to overlapping scenarios and insufficient coverage of important assessment criteria. Therefore, establishing a distinct purpose for each dossier was an essential part of the scenario development process.

I also learned the importance of maintaining data consistency throughout the project. This required ensuring alignment across different documents, including the Dossier Set, Warehouse, Scenario Flag Matrix, and Sources file, as well as maintaining consistency with the Rulebook. At the same time, each dossier needed to remain sufficiently distinct to ensure that the overall case set was balanced and comprehensive. Even a minor change in financial figures or assessment rules could affect the correct lending decision. As a result, I developed a more systematic approach to data verification, recognising that consistency checks should be conducted continuously throughout the development process rather than only at the final stage.

Finally, this experience strengthened my understanding of practical credit appraisal. Developing realistic scenarios required me to explore how credit officers distinguish eligible income from unverified or ineligible income, interpret CIC credit reports, and assess collateral values after accounting for existing claims. Through this process, I realised that effective credit assessment involves more than applying financial formulas. It also requires careful examination of supporting evidence, accurate interpretation of financial information, and sound judgment when making lending decisions.

## **VII. Difficulties Encountered and How I Handled Them**

**1\. Difficulty in ensuring scenario coverage and balance.** Initially, the dossiers were developed as basic collections of applicant information, making it difficult to systematically track which Rulebook flags were included in each case, whether all required assessment criteria were covered, and how the cases differed in terms of outcomes and difficulty levels. To address this issue, I developed the Scenario Flag Matrix before proceeding with the extended dossiers. Each case was assigned specific flags, a decisive factor determining the correct credit decision, and a target difficulty level. The dossiers were then developed based on these predefined specifications. This approach allowed me to identify potential gaps and imbalances during the planning stage, ensuring more comprehensive and consistent scenario coverage.

**2\. Ensuring the realism and accuracy of data.** Another challenge was maintaining the realism of the information used in the dossiers. As AI tools were used to assist with the initial drafting process, some generated figures, particularly salaries and living expenses, did not accurately reflect real-world financial conditions or applicant profiles. Such inconsistencies could reduce the credibility and educational value of the game. To overcome this challenge, I reviewed and verified material figures against reliable external sources, including salary guides, property listings, and published government pay-scale regulations. This process helped improve the accuracy and realism of the dossiers while ensuring that the information was appropriate for each applicant's circumstances.

**3\. Challenges in increasing game difficulty.** Another challenge was finding appropriate ways to increase the game's difficulty while maintaining fairness and consistency. During the MVP stage, the difficulty primarily depended on the complexity of the Rulebook. However, as the rules were refined and simplified, the challenge increasingly depended on how the dossiers were designed. This created limitations in developing more demanding scenarios without introducing unnecessary complexity or unfair conditions. To address this issue, our team consulted the project supervisor for guidance. Through these discussions, we developed the idea of introducing the Warehouse as an additional verification component. By requiring players to independently verify applicants' income using third-party records, the Warehouse introduced a new layer of difficulty based on evidence analysis and information verification rather than rule complexity alone. This approach helped enhance the game's educational value while maintaining a fair and realistic assessment process.

## **VIII. Message to Future Students**

I would encourage future students to actively seek feedback from individuals with relevant professional experience and maintain regular communication with their project supervisors. Frequent discussions and progress reviews can help identify potential issues at an early stage, allowing timely adjustments and providing valuable insights for further product improvement.

I would also emphasise the importance of effective teamwork and coordination throughout the development process. A successful product depends not only on the quality of individual components but also on how well they function together. In this project, the Rulebook, data, game engine, and user interface needed to remain consistent and closely aligned. Therefore, regular communication among team members is essential to ensure that everyone understands how their responsibilities relate to and influence other parts of the project. Maintaining this collaboration can improve overall efficiency, reduce inconsistencies, and contribute to the development of a complete and well-integrated final product.

