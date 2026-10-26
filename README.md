# Insuveo RFQ — Commercial Property Demo

A Vercel-ready, static email-to-RFQ research prototype for India commercial property insurance.

## Demo
- Explore three **fictional** emails for Aster Components Private Limited and an inlined asset schedule.
- Select an email and preview its body or schedule.
- Click **Generate RFQ** to consolidate the simulated thread into a structured, editable submission.
- Inspect field-level message provenance and missing underwriting questions.
- Copy a broker-reviewed insurer RFQ draft or download JSON/text.
- Follow insurer source links for sample public proposal forms.

**Important:** All sample client identities, message content, risk values and correspondence are fictional. This static demo does not access or send Gmail messages. No API keys or backend are required. The public insurer links are research references, not completed proposal forms. Insurer eligibility, cover and terms require independent validation.

## Deploy to Vercel
Import `bluzeey/insuveo-rfq` to Vercel; set Framework Preset to **Other** and leave Build Command empty. The root `index.html` is the entrypoint; `app.js` and `styles.css` load from the site root.

## Next milestone
Implement a consent-based Gmail integration, complete thread retrieval, PDF/CSV/XLSX attachment parsing, evidence spans, conflict detection, and human-approved distribution. Only deploy the Gmail add-on after Google scope/security validation.

## Official insurer references
- [Tata AIG — Commercial SFSP proposal PDF](https://www.tataaig.com/s3/Proposal_Forms_standard_fire_and_special_perils_commercial.pdf_10071eee9e.pdf)
- [New India Assurance — Fire proposal PDF](https://www.newindia.co.in/cms/26baa5ca-85aa-4025-9036-7da7c0aed7d0/Fire_pdf-converted.pdf?guest=true)
- [Generali Central — Bharat Sookshma proposal](https://www.generalicentralinsurance.com/downloads/other-insurance/gc-bharat-sookshma-udyam-suraksha/proposal-forms/gc-bharat-sookshma-udyam-suraksha-proposal-form.pdf)
- [ICICI Lombard — SFSP product page](https://corporate.icicilombard.com/Portal/Standard_Fire_and_Special_perils_policy) (not a proposal form)

These are indicative questions for commercial property intake and are not evidence of product suitability for the fictional ₹25 crore risk.
