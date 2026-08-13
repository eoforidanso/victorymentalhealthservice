# Victory Mental Services

Marketing site for **Victory Mental Services** — outpatient psychiatric
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

## Deployment

Cloudflare Pages, project `victory-mental-health`, in the
`victorymentalservs@yahoo.com` account. There is no build step — the repo root
is the deployable artifact.

```bash
npx wrangler pages deploy . --project-name=victory-mental-health --branch=main
```

Any `--branch` other than `main` publishes a preview at
`<branch>.victory-mental-health-44f.pages.dev`, leaving production untouched.

Custom domains `victorymentalservices.com` and `www` are attached to the
project. Their DNS records are **proxied** CNAMEs to
`victory-mental-health-44f.pages.dev` — the orange cloud is required, since
Pages only answers requests that pass through Cloudflare's proxy.

Note: `index.html` is served with two mailto links rewritten to
`/cdn-cgi/l/email-protection` by Cloudflare's Email Address Obfuscation. That
is expected, not a build artifact.

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

Team cards reference `img/idayatu-omoniyi.jpg` and `img/shannan-merritt.jpg`.
Any missing photo degrades to a gold monogram of the person's initials, so the
page renders cleanly with or without them.

## Accessibility & SEO

- Skip link, semantic landmarks, labelled controls
- All motion disabled under `prefers-reduced-motion`
- Open Graph tags and JSON-LD `MedicalBusiness` structured data
- 988 Suicide & Crisis Lifeline surfaced in the contact section

## Before launch

- [x] Add the remaining staff headshot (`shannan-merritt.jpg`) to `img/`
- [x] Point the domain at the host and enable HTTPS
- [ ] Confirm the accepted-insurance list is current
- [ ] Verify the Tebra scheduling link
- [ ] Add Privacy Policy and Terms pages
- [ ] Replace Ola's headshot with a studio portrait — the current file is an
      upscaled phone crop with a composited background; it cannot match
      Shannan's framing because the source has no shoulders in it
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from
      `index.html` — this is the go-live switch
- [ ] Redirect the apex to `www` (Cloudflare Redirect Rule); both currently
      serve the site, and the canonical/JSON-LD both name `www`
- [ ] Retire or redirect `victorymentalservs.com`, which still serves the old
      site. Note its Google Workspace MX still hosts the working
      `info@victorymentalservs.com` mailbox referenced on the contact page —
      moving the domain means moving mail
