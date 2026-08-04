# Product Requirements Document (PRD)

## Character Blueprint Studio

**Creator / Product Owner:** Carla Valdetaro  
**Version:** 1.0  
**Baseline date:** August 4, 2026  
**Status:** Approved for Designathon redesign and development  
**Repository:** `CarlaVP/gerador-prompts-personagem`  
**Current prototype:** `https://gerador-prompts-personagem.vercel.app/`  
**Context:** Replit Designathon 2026 — submission deadline August 11, 2026

> Product concept, strategy, and product decisions by Carla Valdetaro. This document was drafted and structured with AI assistance under the creator's direction and approval.

---

## 1. Executive Summary

Character Blueprint Studio is a guided web application for AI character creation. It helps users without prompt-engineering experience turn an initial idea into a structured master image prompt and, after approving a character image, into a prompt for a Basic Character Sheet or a Complete Character Reference Bible.

The product was created from a practical need: designing memorable characters is relatively easy, but preserving identity, proportions, wardrobe, expressions, materials, and props across new images and animations is difficult.

The existing React application already builds prompts in real time, saves data locally, and imports/exports character projects as JSON. The Designathon version will transform the prototype into an international, responsive, visually compelling product while preserving its lightweight, model-independent workflow.

**Core promise:** Design a character. Build the master prompt. Create a reusable visual identity.

## 2. Product Vision

Build a model-independent pre-production studio for planning, documenting, and preserving AI character identity across different image-generation tools.

**Positioning:** A model-independent character design and pre-production studio.

## 3. Problem Statement

- Users have character ideas but do not know how to convert them into complete visual prompts.
- Blank prompt fields create friction and omitted details.
- Character decisions become scattered across chats, notes, and repeated generations.
- Approved characters often change face, body, clothing, materials, or accessories in later images.
- Beginners may not understand composition, framing, lighting, and identity-preservation concepts.
- Professional character sheets are useful but difficult to plan and request correctly.

## 4. Goals

### 4.1 Designathon Goals

- Create a visually striking international homepage.
- Use Replit Design to explore, refine, and convert the visual direction into a functional build.
- Make the experience responsive on mobile, tablet, and desktop.
- Deliver the operational interface in English.
- Preserve and improve the current master-prompt generator.
- Add Basic Character Sheet and Complete Character Reference Bible prompt workflows.
- Use **The Prehistoric Hunter** as the official demo character.
- Submit a stable, easy-to-test project by August 11, 2026.

### 4.2 Post-Competition Commercial Goals

- Prepare a Full Edition for one-time purchase on Gumroad.
- Maintain a public demo version.
- Add English and Portuguese localization.
- Support personal and commercial creator licenses without requiring a subscription at launch.

## 5. Non-Goals for Version 1.0

- Generate images inside the application.
- Add user accounts, authentication, cloud storage, or collaboration.
- Integrate Gumroad licensing before the Designathon.
- Train custom AI models.
- Promise perfect consistency across every image model.
- Add many incomplete character-sheet types.

## 6. Target Users

- Beginner AI creators
- Content creators
- Writers and storytellers
- Independent animators and game creators
- Educators
- Independent artists and designers

**Primary persona:** An independent creator who uses multiple image and video AI tools and needs a guided process to structure details, repeat visual identity, and create reusable reference material.

## 7. Value Proposition

Character Blueprint Studio turns scattered creative decisions into an organized visual system.

**Before:** vague idea, incomplete prompt, many attempts, unstable identity, scattered references.  
**After:** defined identity, reusable master prompt, explicit consistency rules, and a Character Reference Bible prompt.

## 8. Current Product Baseline

Current stack:

- React 18
- Vite
- Tailwind CSS
- Lucide React
- localStorage
- JSON import/export
- Vercel deployment

Current capabilities:

- Guided character form
- Real-time prompt construction
- Randomization with locks
- Configurable negative prompt
- Local autosave
- JSON export/import
- Clipboard copy

Current limitations:

- Single-column, form-heavy interface
- Portuguese-only UI
- No product homepage
- Responsiveness not systematically validated
- No Character Sheet Builder
- No integrated visual demo

## 9. Version 1.0 Scope

### Modules

1. **Homepage** — value proposition, workflow, features, demo, and launch CTA.
2. **Character Design** — identity, appearance, proportions, outfit, pose, expression, setting, lighting, and style.
3. **Master Prompt** — live output, copy, save, and export.
4. **Character Sheet Builder** — Basic Sheet and Complete Reference Bible prompts.
5. **Saved Project** — local autosave and JSON portability.
6. **Examples** — official Prehistoric Hunter demo.

## 10. Core User Journeys

### A. Create a Character

1. Understand the product on the homepage.
2. Open the Studio.
3. Define the visual identity through guided fields.
4. Watch the master prompt update in real time.
5. Review preservation and avoidance rules.
6. Copy, save, or continue to the Character Sheet Builder.

### B. Build a Character Reference Bible

1. Complete or load a character project.
2. Generate and approve the main character image in the user's preferred AI tool.
3. Select **Create Character Sheet**.
4. Choose Basic Sheet or Complete Reference Bible.
5. Indicate whether a reference image is available.
6. Select the desired modules.
7. Generate and copy the specialized sheet prompt.
8. Attach the approved image in the chosen image-generation tool.

### C. Resume a Project

1. Reopen the browser and restore local autosave, or import a JSON file.
2. Edit the character or generate another output from the same identity.

## 11. Information Architecture

- `/` — public homepage
- `/studio` or internal Studio state — character design and master prompt
- `Character Sheet` — sheet type, module selection, and sheet prompt
- `Examples` — official demo project
- `About` — origin, creator, and Designathon context

## 12. Functional Requirements

| ID | Requirement | Priority | Acceptance Criterion |
|---|---|---:|---|
| FR-01 | Product homepage | MUST | A visitor understands the product in under 10 seconds. |
| FR-02 | Preserve the guided character form | MUST | Existing fields continue working without data loss. |
| FR-03 | Live master prompt | MUST | Relevant field changes update the prompt immediately. |
| FR-04 | Copy master prompt | MUST | Copy action provides clear confirmation. |
| FR-05 | Local autosave | MUST | Reopening the same browser restores the latest project. |
| FR-06 | JSON export/import | MUST | Exported projects can be restored without supported-field loss. |
| FR-07 | Basic Character Sheet | MUST | Generates a prompt for neutral portrait and four body views. |
| FR-08 | Complete Reference Bible | MUST | Generates a structured prompt with selectable modules. |
| FR-09 | Reference-image mode | MUST | Prompt instructs the image model to use the attached image as the only identity reference. |
| FR-10 | Selectable reference modules | SHOULD | Users can enable or disable modules without manual prompt editing. |
| FR-11 | Official demo project | MUST | One action loads The Prehistoric Hunter project. |
| FR-12 | English operational UI | MUST | No operational Portuguese text remains in the submitted version. |
| FR-13 | English/Portuguese switch | COULD | Language changes without losing project data. |
| FR-14 | Multi-character gallery | COULD | Additional examples are available if time permits. |

## 13. Character Sheet Builder Specification

### 13.1 Basic Character Sheet

- Horizontal 16:9 format
- Solid light-gray background
- Uniform studio lighting
- Neutral closed-mouth face close-up
- Full-body front view
- Full-body three-quarter view
- Full-body side view
- Full-body back view
- Identical proportions and identity across all views
- Neutral poses, supported feet, relaxed arms
- Remove held objects while preserving permanent costume elements
- No scene, action, labels, logo, or watermark

### 13.2 Complete Character Reference Bible

Selectable modules:

- Character Profile
- Color Palette
- Identity & Scale
- Turnaround Views
- Expression Progression
- Microexpressions
- Head Angles
- Posture Variations
- Hand Gestures
- Wardrobe Variations
- Props
- Materials & Textures
- Neutral Consistency Anchor

The layout should be organized, visually impressive, and original. It may be inspired by professional character documentation, but it must not copy another product's exact layout.

### 13.3 Reference Image Rule

For stronger consistency, the interface should recommend generating and approving the main character image first. The final sheet prompt should state:

> Use the attached image as the only identity reference. Preserve the exact character identity, proportions, facial structure, materials, colors, wardrobe, and permanent accessories across every view.

Without a reference image, the interface should warn that variation may be greater.

## 14. Homepage Requirements

The homepage must feel like the entrance to a creative studio rather than a long form.

Required sections:

- Navbar
- Hero with character + prompt + reference-bible visual composition
- From Idea to Visual System
- How It Works
- Character Reference Bible highlight
- Basic vs Complete comparison
- Functional interface preview
- Prehistoric Hunter example
- Final CTA
- Footer with creator credit

Approved core copy:

- **Eyebrow:** AI-POWERED CHARACTER DESIGN WORKFLOW
- **Headline:** Turn one character idea into a visual identity you can reuse.
- **Supporting copy:** Build detailed AI image prompts and production-ready character sheet prompts through one guided creative workflow.
- **Primary CTA:** Start Designing
- **Secondary CTA:** See How It Works
- **Central statement:** Creating one character is easy. Keeping the same character is the real challenge.

## 15. Visual and UX Direction

- Warm off-white background
- Soft plum primary accent
- Sage secondary accent
- Brown-charcoal text rather than pure black
- Editorial display typography paired with a clean UI font
- Rounded cards, subtle borders, restrained shadows
- Premium creative studio feeling, avoiding generic blue-purple AI branding

UX principles:

- Clarity before feature quantity
- Show the result while the user creates
- Reduce the feeling of a long form through steps or clear sections
- Keep copy, save, and sheet actions visible
- Explain visual terminology through simple microcopy
- Never lose current work during navigation or recoverable errors

## 16. Responsive Requirements

Test at minimum:

- 375 × 812
- 768 × 1024
- 1440 × 900

Requirements:

- No horizontal scrolling
- Comfortable touch targets
- Mobile keyboard must not make essential actions unreachable
- Desktop may show form and prompt simultaneously
- Tablet layouts may use one or two columns depending on content

## 17. Localization

- Designathon submission: English UI
- All strings should be centralized for future localization
- Existing Portuguese project data must remain loadable
- Commercial roadmap: English and Portuguese

## 18. Data and Persistence

Version 1.0 remains client-side.

- `localStorage` — last project and basic preferences
- JSON file — portable character project
- Reference image — local preview/filename only; not uploaded by the app
- Prompts — generated locally from project data

Minimum project schema:

- `metadata`
- `character`
- `visual`
- `consistency`
- `sheet`
- `ui`

## 19. Technical Architecture

- Frontend: React + Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- Persistence: localStorage + JSON
- Current hosting: Vercel
- Designathon workflow: Replit Design → Build
- Backend: out of scope

Recommended refactor:

- Split the monolithic `App.jsx` into reusable components
- Centralize options, strings, and translations
- Create pure functions for master-prompt and sheet-prompt generation
- Version the JSON format
- Develop on a dedicated Designathon branch

## 20. Privacy and Security

- Do not collect personal data or upload images in v1.0
- Clearly explain local browser storage
- Validate imported JSON files
- Recover from invalid imports without deleting the current project
- Never expose API keys in browser code

## 21. Accessibility

- Sufficient color contrast
- Keyboard-accessible primary workflow
- Visible focus states
- Correct form labels
- Success/error messages that do not rely on color alone
- Mobile-friendly touch targets
- Respect reduced-motion preferences

## 22. Non-Functional Requirements

- Fast initial load
- No blank-screen failures in the primary workflow
- Current Chrome, Edge, and Chromium-based mobile browser support
- Maintainable component structure
- Portable build for Replit, Vercel, and local development

## 23. Success Criteria

### Designathon

- The problem and transformation are immediately understandable.
- Homepage and Studio work on mobile and desktop.
- The Prehistoric Hunter demo completes the full flow.
- Basic and Complete sheet outputs are clearly different and useful.
- Replit Design usage is demonstrable through frames, iterations, visual editing, and Build.
- Submission assets are complete before the deadline.

### Future Commercial Metrics

- Visitors who start a character
- Users who copy a master prompt
- Users who build a sheet prompt
- Returning users/imported projects
- Free-to-Full-Edition Gumroad conversion

## 24. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| Excessive one-week scope | Prioritize homepage, responsiveness, English, master prompt, and Reference Bible. |
| AI-generated small text errors | Keep precision data outside the image or reserve Precision Layout for the roadmap. |
| Inconsistent sheet views | Require/recommend one approved identity reference image. |
| Regression during refactor | Preserve the current Vercel version and work on a dedicated branch. |
| Replit free-plan limits | Start on Starter; use Claude Pro and external coding assistance; upgrade only if a real blocker appears. |
| Beautiful homepage but incomplete product | Build one stable end-to-end flow before decorative polish. |

## 25. Execution Plan — August 4–11, 2026

| Date | Deliverable |
|---|---|
| Aug 4 | PRD, baseline screenshots, branch, project registration, Replit import |
| Aug 5 | Three Replit Design directions and final direction selection |
| Aug 6 | Hero, transformation, Reference Bible highlight, final CTA |
| Aug 7 | Studio refactor, English UI, responsive structure |
| Aug 8 | Basic Sheet and Complete Reference Bible implementation |
| Aug 9 | Demo project, device testing, accessibility and bug fixes |
| Aug 10 | Visual polish, project description, screenshots, demo video |
| Aug 11 | Final end-to-end test, publish, and submit with time margin |

## 26. Post-Designathon Commercial Roadmap

- Public free demo
- Gumroad Full Edition as a one-time purchase
- Personal and Commercial Creator editions
- Private repository for paid-only features
- Server-side license validation only when the paid version is ready
- English/Portuguese UI
- Character library and project duplication
- Animation, storytelling, game, and educational templates
- Precision Layout for reliable text and technical labels
- Integrated image generation only if backend costs and business value justify it

## 27. Authorship and Development Record

1. Preserve this PRD as DOCX and Markdown.
2. Commit the Markdown file before major redesign changes.
3. Create a dedicated Designathon branch.
4. Preserve screenshots of the original prototype.
5. Use small, descriptive commits.
6. Capture Replit Design frames and iterations.
7. Version this PRD when major decisions change.

Suggested first commit:

```text
docs: add Character Blueprint Studio PRD v1.0 before Designathon redesign
```

## 28. Submission Acceptance Checklist

- [ ] Homepage clearly communicates value and the character-sheet differentiator
- [ ] Main CTAs open the Studio
- [ ] Operational UI is in English
- [ ] No horizontal scrolling at 375 px
- [ ] Master prompt updates in real time
- [ ] Copy prompt works
- [ ] Autosave works
- [ ] JSON export/import works
- [ ] Basic Character Sheet prompt works
- [ ] Complete Reference Bible prompt works
- [ ] Reference-image mode includes single-identity-reference instructions
- [ ] Prehistoric Hunter demo loads correctly
- [ ] No visible primary-flow console errors
- [ ] Published page opens without authentication
- [ ] Project description, screenshots, and short demo video are ready
- [ ] Submission is completed before the deadline

---

## Official Demo Project: The Prehistoric Hunter

A rugged prehistoric hunter with tangled hair, a heavy beard, irregular animal-skin clothing, a handmade stone axe, a robust body, and a cautious, fierce posture. The character is intentionally detailed and difficult to reproduce, making visual consistency easy to demonstrate.

---

**Approved baseline:** August 4, 2026  
**Creator / Product Owner:** Carla Valdetaro  
**Document ID:** CBS-PRD-2026-08-04-v1.0
