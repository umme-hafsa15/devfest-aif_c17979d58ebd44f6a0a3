# Smart Escape

Interactive evacuation route simulator for the AI DevFest practice challenge.

## Features

- Frontend-only HTML/CSS/JavaScript application
- Local `building.json` import with schema/range/category validation
- SVG map using the dataset's supplied display coordinates
- Lowest-cost routing over an undirected weighted graph
- Exact tie-breaking: total cost → exit ID → node-ID path sequence
- Block/unblock rooms and junctions
- Block/unblock corridors
- Close/reopen exits
- Immediate recalculation after start/hazard changes
- Reset to the imported file's original `initial_state`
- Required failure states: **No route available** and **Starting location blocked**
- English/Bangla UI
- Responsive layout and subtle route/hazard animations
- Drag-and-drop JSON import

## Run locally

Because the page loads `building.json`, use a local HTTP server instead of opening `index.html` directly.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

You can also deploy the folder directly to GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

## Sample checks

With the included `building.json`:

1. Select **R1** → `R1 → C1 → C2 → E1`, cost **7**
2. Select **R1**, block **C2** → `R1 → C1 → C3 → C4 → E2`, cost **11**
3. Select **R1**, close **E1** and **E2** → `No route available`
4. Select **R2** → `R2 → C3 → C4 → E2`, cost **7**
5. Select **R1**, then block **R1** → `Starting location blocked`

## Project structure

```text
smart-escape/
├── index.html
├── styles.css
├── app.js
├── building.json
├── LICENSE
├── README.md
├── screenshots/
│   ├── baseline.png
│   └── after-blocking-c2.png
└── test-data/
    ├── tie-case.json
    └── invalid.json
```

## Competition submission checklist

Before submitting, replace/add your own identity details in this README and make sure your repository contains:

- Public repository named `devfest-<registration-number>`
- Public HTTPS deployment
- Final commit ID
- At least 3 commits, at least once every 30 minutes, with required prompt/manual-edit text in each commit message
- MIT `LICENSE`
- Baseline and C2-blocked screenshots
- Any AI tools used and the most useful prompt
- Known issues, if any

Do not commit API keys or secrets.

## AI tools used

Example wording (edit to match what you actually used):

> ChatGPT was used to help interpret the requirements, design the UI, and review the routing/validation logic. All code was reviewed and tested before submission.

## Most useful prompt

Example wording (edit to match your actual prompt):

> Build a frontend-only evacuation route simulator that imports the supplied JSON schema, validates all constraints, computes the lowest-cost path to an open exit with the specified tie-breaking rules, immediately reroutes after hazards change, supports Bangla/English, and handles all required failure cases.

## Known issues

- None known in the included sample and test datasets.

## Safety note

Smart Escape is an educational simulation, not a certified real-world evacuation planning tool.
