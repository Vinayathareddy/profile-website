# Vinayatha Reddy — Profile Website

A responsive single-page portfolio built with HTML, CSS, and vanilla JavaScript. The project follows the folder structure and Git branching model specified in the Profile Website + CI/CD Pipeline assignment.

## Folder structure

```text
profile-website/
├── index.html
├── css/
│   ├── theme.css
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero/
│   ├── journey/
│   ├── interests/
│   ├── family/
│   └── hobbies/
├── .github/workflows/
│   ├── validate.yml
│   ├── deploy.yml
│   ├── pr-checks.yml
│   ├── lighthouse.yml
│   └── notify.yml
├── .htmlhintrc
├── .stylelintrc.json
├── .gitignore
└── README.md
```

## Run locally

1. Extract this ZIP.
2. Open the extracted `profile-website-assignment` folder.
3. Open `index.html` in a browser. No framework or local build step is required.
4. Keep the `css`, `js`, and `images` folders beside `index.html`; do not move `index.html` on its own.

## Personalise the website

- Update the content in `index.html` if your details change.
- `css/theme.css` contains theme tokens only. Add or edit CSS variables here for the light, dark, and warm themes.
- `css/style.css` contains layout and component styles; use the variables defined in `theme.css` for colours, typography, spacing, and other shared values.
- `js/main.js` contains the mobile navigation, reveal-on-scroll effects, theme switcher, image lightbox, back-to-top control, and automatic footer year.
- Replace the included SVG illustrations in `images/` with your own approved photos or illustrations if desired. Keep the same file names or update the corresponding `src` paths in `index.html`.

## Git branching strategy

```text
main
└── develop
    ├── feature/hero-section
    ├── feature/journey-timeline
    ├── feature/interests-cards
    ├── feature/family-section
    ├── feature/hobbies-gallery
    ├── theme/dark-mode
    ├── theme/warm-tones
    ├── ci/setup-validation
    ├── ci/setup-deploy
    ├── ci/setup-pr-checks
    ├── ci/setup-lighthouse
    └── ci/setup-notifications
```

Rules from the assignment: do not commit directly to `main`; merge each feature/CI branch into `develop` through a pull request; merge `develop` into `main` when a phase is complete.

Suggested workflow for each branch:

1. Start from an updated `develop` branch.
2. Create the relevant feature or CI branch.
3. Make and test the change locally.
4. Commit and push the branch.
5. Open a pull request with base `develop` and compare set to your feature/CI branch.
6. Wait for required checks, review the diff, then merge into `develop`.
7. When the phase is complete, open a pull request from `develop` into `main`.

## GitHub Actions workflows

| Workflow | File | Purpose |
| --- | --- | --- |
| HTML & CSS Validation | `validate.yml` | Runs HTMLHint and Stylelint on pushes and pull requests. |
| Auto-deploy to GitHub Pages | `deploy.yml` | Builds the Pages artifact and deploys from `main`. |
| PR Quality Checks | `pr-checks.yml` | Runs pull-request checks with dependent jobs. |
| Lighthouse Performance Audit | `lighthouse.yml` | Runs on a weekly schedule or after a successful deployment and stores the report artifact. |
| Deployment Notifications | `notify.yml` | Reports deployment success/failure; optional webhook uses a GitHub secret. |

### GitHub repository setup

1. Push the project files to your GitHub repository.
2. In **Settings → Pages**, select **GitHub Actions** as the build and deployment source.
3. In **Settings → Secrets and variables → Actions**, optionally add `DEPLOYMENT_WEBHOOK_URL` for your notification endpoint. Do not put webhook URLs or tokens in source files.
4. Add branch protection/rulesets for `main` and `develop` as required by your assignment. Require pull requests and the relevant status checks; do not bypass the no-direct-commit rule.
5. Open **Actions** and inspect each workflow run. Fix failures before merging.

## Notes

- The workflows are included as assignment learning examples. GitHub Pages deployment requires Pages to be enabled for the repository.
- Lighthouse uses the standard GitHub Pages URL pattern. Confirm the published Pages URL in the deployment environment if your repository settings use a custom domain or different project URL.
- External webhook notification is optional. If the secret is not configured, the workflow prints a message and skips the external call.
- The project does not require React, Bootstrap, or a local npm build. npm is used only in CI to install validation tools, as required by the assignment concepts.
