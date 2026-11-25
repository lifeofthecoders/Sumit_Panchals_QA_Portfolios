<div align="center">

# SUMIT PANCHAL | SENIOR QUALITY ANALYST — QUALITY ASSURANCE PORTFOLIO

### A cinematic, interactive portfolio showcasing 5+ years of software quality assurance experience, manual testing expertise, project case studies, professional experience, and credentials.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Sumit__Panchals__QA__Portfolios-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lifeofthecoders/Sumit_Panchals_QA_Portfolios)
[![React](https://img.shields.io/badge/React-19-20232a?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat-square&logo=framer)](https://motion.dev/)
[![Lucide React](https://img.shields.io/badge/Lucide%20React-Icons-f56565?style=flat-square&logo=lucide)](https://lucide.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

**Portfolio owner: <span style="color: #2563EB;"><strong>Sumit Panchal</strong></span>**  
**Repository contributor identity: Sam Wilson · lifeofthecoders@gmail.com**

[Overview](#-overview) · [Highlights](#-portfolio-highlights) · [QA Focus](#-manual-qa-focus) · [Projects](#-project-case-studies) · [Technology](#-technology-stack) · [Setup](#-getting-started) · [Structure](#-project-structure) · [Deployment](#-deployment) · [Ownership](#-authorship--ownership)

</div>

---

## 🎯 Overview

This is my personal **Senior Quality Analyst | Manual QA Engineer portfolio**, built to present my professional journey, software testing expertise, selected project case studies, education, professional credentials, and resume in a cinematic and interactive web experience.

I have **5+ years of experience in software quality assurance**, testing web and mobile applications and supporting reliable software releases. My work focuses on functional quality, usability, risk identification, clear defect reporting, regression coverage, and validating important user journeys.

The portfolio uses a dark visual identity with expressive typography, a portrait-led hero section, animated transitions, interactive QA project cards, professional experience and education content, skill highlights, and a dedicated contact experience.

The project content highlights Functional, Regression, Smoke, Sanity, Exploratory, Black-Box, and Risk-Based Testing, along with requirement analysis, test design, test execution, defect lifecycle management, and collaboration within Agile teams.

> **Testing that protects. Quality that builds confidence.**

## ✨ Portfolio Highlights

| Area | What it provides |
|---|---|
| Hero section | Animated portfolio introduction, professional title, portrait, experience statistics, and key navigation actions |
| About | Professional summary, QA approach, experience, and testing interests |
| QA projects | Six project case studies with category filters and text search |
| Project details | Dedicated project overview, QA role, testing coverage, tools, and project-specific information |
| Skills | Quality assurance and software testing skill highlights |
| Professional journey | Education and professional experience content |
| Research interests | Focus areas across functional quality, test coverage, defect management, and cross-platform testing |
| Contact | Email, GitHub, LinkedIn, and a contact form with automatic email delivery and email-app fallback |
| Resume | View/download access to the PDF resume |
| Visual experience | Custom cursor, motion effects, hover interactions, typography, iconography, and animated visual elements |
| Responsive design | Layouts and interactions designed for desktop, tablet, and mobile screens |

## 🧪 Manual QA Focus

My professional experience and portfolio highlight the following areas of software quality assurance.

### Manual Testing

- Functional Testing
- Regression Testing
- Smoke Testing
- Sanity Testing
- Exploratory Testing
- Black-Box Testing
- Retesting and Verification
- Web and Mobile Application Testing
- End-to-End Workflow Validation
- Usability and Compatibility Testing
- UI Testing
- Risk-Based Testing

### Test Design and Documentation

- Requirement Analysis
- Test Planning
- Test Scenario Design
- Test Case Design
- Test Data Preparation
- Requirement Traceability
- Test Execution and Result Documentation
- Positive and Negative Test Scenarios
- Boundary and Edge Case Validation

### Defect Management

- Bug Identification and Reporting
- Defect Reproduction and Documentation
- Defect Lifecycle Management
- Severity and Priority Assessment
- Retesting and Regression Verification
- Root Cause Analysis Support
- Clear Reproduction Steps and Evidence
- Defect Tracking and Follow-up using Jira

### QA Delivery Practices

- Risk-Based Testing
- Critical User Journey Validation
- Cross-Platform Testing
- Release-Focused Validation
- Requirement Clarification
- Software Development Life Cycle (SDLC)
- Software Testing Life Cycle (STLC)
- Agile Methodologies
- Developer and Project Manager Collaboration
- Continuous Quality Improvement

## 🗂️ Project Case Studies

The portfolio currently includes six project case studies across different application domains. Each project card presents its available summary, QA role, testing focus, and tools or techniques used.

| Project | Domain / Application | Testing emphasis |
|---|---|---|
| **LYMÜV** | Taxi Booking Application | Functional, regression, smoke, exploratory, and UI testing |
| **DAP ME** | Professional Networking Application | Registration, profile management, networking interactions, and regression testing |
| **Bunny Books** | Photobook E-Commerce Application | Usability, UI consistency, shopping journey, and retesting |
| **Kinzwin** | Multiplayer Gaming Application | Multiplayer workflows, session behavior, and core functionality |
| **Health-E** | Digital Health & Medical Records Application | OTP verification, ABHA generation, records, appointments, and access control |
| **reGive** | Sustainability & Community Sharing Application | Functional, regression, exploratory, and UI testing |

### Project Navigation

- Select a project card in the **QA Projects** section to open its project detail dialog.
- Use the dialog's close or back control to return to the project grid.
- Use the category filters to narrow the displayed projects.
- Use the project search field to find projects by title, summary, or testing tool.
- Project definitions and displayed project information are maintained in `src/data/projects.js`.

Project descriptions and testing details are presented as portfolio case-study material. They should not be interpreted as independently audited product specifications or claims of production ownership of the referenced applications.

## 🧰 Technology Stack

### Frontend

- **React 19** — Component-based user interface.
- **JavaScript (ES Modules)** — Application logic and component implementation.
- **Vite 6** — Local development server and production bundler.
- **CSS** — Responsive layouts, design system, typography, and visual effects.
- **Framer Motion 12** — Component transitions, entrance animations, and interactive motion.
- **Lucide React** — Consistent interface icons.

### Backend and Contact API

- **Node.js 22.x** — JavaScript runtime used by the project.
- **Express 4** — Local contact API server for development.
- **Vercel Node.js Functions** — Production API endpoints in the `api/` directory.
- **Express Rate Limit** — Request rate-limiting middleware for the local server.
- **Nodemailer** — Optional SMTP delivery provider.
- **dotenv** — Local environment configuration.

### Contact Form and Email

- **Google Apps Script** — Recommended contact form delivery service.
- **Google Mail service (`MailApp`)** — Sends contact notifications from the Google account that owns the Apps Script deployment.
- **Server-side token validation** — Keeps the Apps Script token out of the React frontend.
- **SMTP mode** — Optional alternative when valid SMTP credentials are configured.
- **Email-app fallback** — Opens a pre-filled email draft when automatic delivery is unavailable; the visitor must press Send in their email application.

### Build and Deployment

- **Vite Production Build** — Generates the optimized static site in `dist/`.
- **Vercel** — Hosts the static frontend and serverless contact API in one project.
- **GitHub** — Source control and deployment integration.
- **npm** — Dependency installation and project scripts.

## 📁 Project Structure

```text
Sumit_Panchals_QA_Portfolios/
├── api/
│   ├── contact.js                 # Vercel contact-form function
│   └── health.js                  # Vercel email-service health check
├── google-apps-script/
│   ├── Code.gs                    # Google Apps Script email handler
│   └── SETUP.md                   # One-time Apps Script setup guide
├── public/
│   └── assets/                    # Portfolio images, portrait, and resume assets
├── server/
│   ├── contact-service.js         # Shared contact validation and delivery logic
│   ├── index.js                   # Local Express API server
│   └── provider-config.js         # Email-provider selection and compatibility
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── LiveStatus.jsx
│   │   ├── MagneticButton.jsx
│   │   ├── MarqueeTicker.jsx
│   │   ├── ProjectDialog.jsx
│   │   ├── ProjectGrid.jsx
│   │   ├── ResearchInterests.jsx
│   │   └── Skills.jsx
│   ├── config/
│   │   └── site.js                # Portfolio identity and contact details
│   ├── data/
│   │   ├── experience.js          # Professional experience and education data
│   │   └── projects.js             # QA project case-study data
│   ├── App.jsx                     # Application composition
│   ├── main.jsx                    # React application entry point
│   └── styles.css                  # Global styles and design system
├── .env.example                    # Sample local environment configuration
├── .gitignore                      # Excludes local secrets and generated files
├── index.html                      # HTML document entry point
├── package.json                    # Dependencies and npm scripts
├── vercel.json                     # Vercel function configuration
├── vite.config.js                  # Vite configuration and local API proxy
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- **Node.js:** Use Node.js 22.x to match the project engine configuration.
- **npm:** Included with Node.js.
- **Git:** Required to clone the repository.

### 1. Clone the repository

```bash
git clone https://github.com/lifeofthecoders/Sumit_Panchals_QA_Portfolios.git
cd Sumit_Panchals_QA_Portfolios
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure local environment variables

Copy `.env.example` to `.env` in the project root (the same folder as `package.json`). Configure the Google Apps Script URL and token using the instructions in [`google-apps-script/SETUP.md`](google-apps-script/SETUP.md).

Recommended configuration:

```env
MAIL_PROVIDER=apps-script
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_APPS_SCRIPT_TOKEN=YOUR_PRIVATE_RANDOM_TOKEN
CONTACT_TO_EMAIL=sumitpanchal5225@gmail.com
PORT=3001
```

The `GOOGLE_APPS_SCRIPT_TOKEN` value must exactly match the `CONTACT_FORM_TOKEN` Script Property in Google Apps Script. Keep `.env` private and do not commit it.

You can also set `MAIL_PROVIDER=auto`. In automatic mode, the application prefers configured Google Apps Script, then configured SMTP, and otherwise provides the email-app fallback. To force SMTP, set `MAIL_PROVIDER=smtp` and configure the SMTP variables shown in `.env.example`.

### 4. Start the development servers

```bash
npm run dev
```

This starts the local Express API and Vite frontend together. Open the local URL shown in the terminal; the default Vite address is:

```text
http://localhost:5173/
```

The Vite development server proxies `/api` requests to the local Express server at `http://127.0.0.1:3001`.

### 5. Verify the contact service

Open:

```text
http://127.0.0.1:3001/api/health
```

When Google Apps Script is configured and reachable, the health endpoint should report a ready delivery service and the configured recipient. Then submit a real test message from the portfolio and confirm that it arrives in the destination inbox (also check Spam).

### 6. Build and preview

```bash
npm run build
npm run preview
```

The production frontend is generated in the `dist/` directory.

### Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local Express API and Vite development server together |
| `npm run dev:client` | Start only the Vite frontend |
| `npm run server` | Start only the local Express API |
| `npm run build` | Create the optimized production frontend bundle |
| `npm run preview` | Preview the production build locally |
| `npm start` | Start the Express server |

## 🚀 Deployment

The project is configured for a **single Vercel project** that serves the Vite frontend and the contact API from the same domain.

### Vercel Architecture

| Part | Production implementation |
|---|---|
| Frontend | Vite production build served from `dist/` |
| Contact endpoint | Vercel Node.js Function at `/api/contact` |
| Health endpoint | Vercel Node.js Function at `/api/health` |
| Email delivery | Google Apps Script called server-to-server by the Vercel function |
| Environment secrets | Vercel Project Environment Variables |

### Deploying to Vercel

1. Push the project to the GitHub repository: [lifeofthecoders/Sumit_Panchals_QA_Portfolios](https://github.com/lifeofthecoders/Sumit_Panchals_QA_Portfolios).
2. Sign in to [Vercel](https://vercel.com/) and select **Add New → Project**.
3. Import `lifeofthecoders/Sumit_Panchals_QA_Portfolios`.
4. Set the **Root Directory** to the repository root (`./`).
5. Select **Vite** as the Framework Preset.
6. Set the Build Command to `npm run build`.
7. Set the Output Directory to `dist`.
8. Keep the Install Command as `npm install`.
9. Add the server-side environment variables listed below.
10. Deploy the project and verify the live website and contact form.

### Vercel Environment Variables

In **Vercel Project → Settings → Environment Variables**, add these variables for Production and Preview (and Development if using `vercel dev`):

```env
MAIL_PROVIDER=apps-script
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_APPS_SCRIPT_TOKEN=YOUR_PRIVATE_RANDOM_TOKEN
CONTACT_TO_EMAIL=sumitpanchal5225@gmail.com
```

Use the same deployed `/exec` URL and private token that are configured for the working Apps Script service. The token must match the `CONTACT_FORM_TOKEN` Script Property in Google Apps Script.

**Security requirements:**

- Do not upload `.env` to GitHub.
- Do not prefix server-side variables with `VITE_`.
- Never place the Apps Script token in React source code or public configuration.
- Do not configure `PORT` for Vercel Functions.
- After adding or changing environment variables, create a new deployment so the functions receive the updated values.

### Verify the Live Deployment

After deployment, open the health endpoint using your actual Vercel domain:

```text
https://YOUR-VERCEL-DOMAIN/api/health
```

The expected successful response identifies the service as ready and the provider as `google-apps-script`. Then submit a real test from the live contact form and confirm that the email arrives at `sumitpanchal5225@gmail.com`.

The frontend and API use the same domain and the same `/api/contact` path. Local development uses the Vite proxy and Express server; production uses the Vercel functions in `api/`.

### Contact Form Delivery Modes

| Mode | Behavior |
|---|---|
| `apps-script` | Uses the configured Google Apps Script service |
| `auto` | Prefers configured Apps Script, then configured SMTP; uses the email-app fallback if neither is configured |
| `smtp` | Uses configured SMTP credentials |
| `mailto` | Opens a pre-filled draft in the visitor's configured email application; the visitor must press Send |

Google Apps Script is the recommended provider for this project because it avoids Gmail SMTP App Password authentication. The Apps Script deployment must execute as the owner and allow access to the intended public visitors. See [`google-apps-script/SETUP.md`](google-apps-script/SETUP.md) for the complete setup and troubleshooting instructions.

## 🧭 Main Code Reference

| Area | Main File |
|---|---|
| Application composition | `src/App.jsx` |
| Portfolio identity, contact links, and profile content | `src/config/site.js` |
| Project case studies and project categories | `src/data/projects.js` |
| Professional experience data | `src/data/experience.js` |
| Hero introduction and visual effects | `src/components/Hero.jsx` |
| Project listing, filters, and search | `src/components/ProjectGrid.jsx` |
| Project detail dialog | `src/components/ProjectDialog.jsx` |
| Contact links and contact form | `src/components/Contact.jsx` |
| Local Express API | `server/index.js` |
| Shared contact delivery logic | `server/contact-service.js` |
| Provider selection and compatibility | `server/provider-config.js` |
| Vercel contact endpoint | `api/contact.js` |
| Vercel health endpoint | `api/health.js` |
| Google Apps Script email handler | `google-apps-script/Code.gs` |
| Global styles and design tokens | `src/styles.css` |
| Vite development proxy and build config | `vite.config.js` |
| Vercel function configuration | `vercel.json` |

## ♿ Accessibility and Performance

- The interface is responsive across desktop, tablet, and mobile screen sizes.
- Interactive project cards and controls are implemented as part of the React component experience.
- The contact form uses required fields, input length limits, submission feedback, and a fallback email action.
- The project uses Framer Motion for transitions and interactive visual effects.
- Motion and animation behavior should respect user preferences where implemented by the browser and application styles.
- Vite produces an optimized production bundle in `dist/`.

## 🔐 Privacy and Security

- The portfolio does not require a visitor account or password to browse.
- Contact form submissions are sent through the configured server-side delivery service.
- The Google Apps Script token is held by the backend and must not be exposed in the frontend bundle.
- `.env` and other private local configuration files must remain excluded from Git.
- The contact API validates submitted name, email, and message fields before delivery.
- The contact endpoint includes basic request throttling; serverless rate-limit state may be instance-specific.
- Review public profile details, resume information, project screenshots, and third-party links before publishing.
- Third-party packages, fonts, icons, and media remain subject to their respective licenses.

## 🧑‍💻 Authorship & Ownership

This is the personal **Senior Quality Analyst | Manual QA Engineer portfolio of Sumit Panchal**, created to present his professional profile, 5+ years of software testing experience, QA expertise, project case studies, professional journey, and credentials.

The custom portfolio implementation includes the page composition, React components, visual styling, animations, project presentation, contact experience, and deployment configuration maintained in this repository.

The repository commit author/contributor identity is configured as:

- **Author Name:** Sam Wilson
- **Author Email:** lifeofthecoders@gmail.com
- **GitHub:** [lifeofthecoders](https://github.com/lifeofthecoders)

The portfolio profile and professional content identify **Sumit Panchal** as the portfolio owner. The Git author identity is used for repository commit attribution and does not change the portfolio profile owner.

Names, logos, trademarks, and product references appearing in individual project case studies are used to identify the referenced applications and do not imply ownership of those third-party products. Third-party packages and services remain the property of their respective authors and are governed by their own terms and licenses.

## 📜 License

The custom portfolio source code, visual design, and project-specific implementation are maintained by the repository owner. Unless a separate license is included with a specific asset or dependency, permission is not granted to reproduce or redistribute the custom portfolio implementation as someone else's work. Third-party libraries, fonts, icons, services, and media remain subject to their respective license terms.

## 📫 Connect With Me

If you would like to connect, collaborate, or discuss Quality Assurance and software testing, feel free to reach out.

**Sumit Panchal**  
**Senior Quality Analyst | Manual QA Engineer | Software Testing | 5+ Years Experience**

📍 **Location:** Ahmedabad, Gujarat, India  
🌐 **Portfolio:** Add the live Vercel URL here after deployment.  
💻 **GitHub:** [github.com/lifeofthecoders](https://github.com/lifeofthecoders)  
📧 **Email:** [sumitpanchal5225@gmail.com](mailto:sumitpanchal5225@gmail.com)  
🔗 **LinkedIn:** [linkedin.com/in/sumit-panchal-b790a8236](https://www.linkedin.com/in/sumit-panchal-b790a8236/)

## ⭐ Support

If you found this portfolio useful, please consider giving the repository a ⭐ star. Your support and feedback are appreciated and encourage continuous improvement.

<div align="center">

**QUALITY IS MY COMMITMENT.**  
**RELIABILITY IS MY STANDARD.**

Thank you for visiting my portfolio!

---

**Portfolio owner: Sumit Panchal.**  
**Repository contributor identity: Sam Wilson · lifeofthecoders@gmail.com.**

**PRECISION. QUALITY. TRUST. DELIVERED.**

© 2026 Sumit Panchal. All rights reserved for the custom portfolio implementation, subject to the notices above.

</div>
