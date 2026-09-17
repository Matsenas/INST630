# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Coursework for **INST630 - Programming Human-Centered Interfaces**. Each assignment lives in its own folder at the repository root, named after the tutorial it covers (`tutorial_1/`, `tutorial_2/`, …); `index.html` at the root is the hub page that links to them. The site is published with GitHub Pages from the `main` branch, so every path must work as a plain static file — there is no build step, bundler, or server.

## JavaScript: ES6+ only

**This class uses ES6+ (ECMAScript 2015 and later) JavaScript.** Write modern syntax and do not down-level it:

- `const` and `let` — never `var`.
- Arrow functions, template literals, destructuring, spread/rest, default parameters.
- `class` syntax over prototype manipulation.
- ES modules (`import` / `export`) via `<script type="module">` rather than script-tag globals or CommonJS `require`.
- `async`/`await` and Promises over callback chains.
- Modern built-ins: `fetch`, `Array.prototype.map/filter/reduce`, `Object.entries`, optional chaining (`?.`), nullish coalescing (`??`).

No transpiler is configured; browsers run the source as written.

## HTML and CSS conventions

- Semantic HTML first — use the element that describes the content (`header`, `main`, `section`, `article`, `footer`, `nav`, `address`, `time`, `figure`, `dl`) before reaching for a `div`.
- Every page: `<!DOCTYPE html>`, `lang` on `<html>`, `<meta charset="utf-8">`, a viewport meta tag, and a descriptive `<title>`.
- Keep pages accessible: real heading hierarchy, alt text on images, labels on form controls, visible focus styles.
- Vanilla CSS. No frameworks or preprocessors unless an assignment asks for one.

## Working in this repo

- Add a new assignment as a new top-level `tutorial_N/` folder, then link it from the assignment list in `index.html`.
- Keep files relative-linked so they resolve under the GitHub Pages subdirectory.
- Preview locally by opening the file in a browser, or having the user manually view with Live Server plugin.
## Project 1 — Recipe card (`project_1/`)

Assignment brief, kept here so the instructions block could be removed from the page.

**Task:** style the provided recipe-card HTML so it is attractive, legible, and usable.

Requirements:

- Use semantic HTML structure — the HTML is already structured with header, sections, and lists.
- Implement responsive flexbox layouts — must work on mobile and desktop.
- Create visual hierarchy — use typography, spacing, and color to guide the user's eye.
- Design for usability — it should be easy to follow while cooking.
- Make it beautiful — cohesive colors, fonts, and spacing.

Focus areas:

- Layout: use flexbox for responsive design.
- Typography: clear information hierarchy.
- Color & contrast: ensure readability.
- Spacing: consistent margins and padding.
- Mobile-first: design works on small screens.

Visual direction: the MORPHEUSamp Winamp skin (black ground, phosphor-green outline boxes, pixel display type) applied to the chrome, with body copy kept large and readable.
