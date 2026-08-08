# Victory Mental Health Services

Marketing site for **Victory Mental Health Services** — outpatient psychiatric
care, medication management, and holistic counseling in Tinley Park, IL,
offered in person and via telehealth.

## Stack

Static HTML, CSS, and vanilla JavaScript. **No build step, no dependencies,
no framework.** The source files are the deployable artifact.

```
index.html        # single page, anchor-based navigation
css/style.css     # design tokens + all styles
js/main.js        # mobile nav, back-to-top, scroll reveal, photo fallback
img/              # staff headshots (see img/.gitkeep)
```

## Local development

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

## Design

| Token | Value | Role |
|---|---|---|
| `--indigo-900` | `#211c4d` | Hero, footer, primary surfaces |
| `--indigo-700` | `#322a6e` | Primary buttons |
| `--gold` | `#c9a875` | Accent — CTAs, eyebrows, monograms |
| `--cream` | `#f7f4ef` | Page background |
| `--sand` | `#efe9de` | Alternating tinted sections |

Type is **Fraunces** (display) and **Inter** (body), loaded from Google Fonts.

Page structure: Hero → Why Us → Services → Our Team → Insurance → Contact.

## Staff photos

Team cards reference `img/idayatu-omoniyi.jpg`, `img/johnny-white.jpg`, and
`img/shannan-merritt.jpg`. Any missing photo degrades to a gold monogram of
the person's initials, so the page renders cleanly with or without them.

## Accessibility & SEO

- Skip link, semantic landmarks, labelled controls
- All motion disabled under `prefers-reduced-motion`
- Open Graph tags and JSON-LD `MedicalBusiness` structured data
- 988 Suicide & Crisis Lifeline surfaced in the contact section

## Before launch

- [ ] Add the three staff headshots to `img/`
- [ ] Confirm the accepted-insurance list is current
- [ ] Verify the Tebra scheduling link
- [ ] Add Privacy Policy and Terms pages
- [ ] Point the domain at the host and enable HTTPS
