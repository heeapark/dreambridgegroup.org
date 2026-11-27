# Dream Bridge Group — static website

Plain HTML/CSS/JS. No build step. Open `index.html` or upload the folder to any static host (Netlify, GitHub Pages, S3, nginx…).

## Pages
- `index.html` — Home · `consulting.html` — Consulting · `ksic.html` — KSIC
- `coming-soon.html` — placeholder; every page that does not exist yet (About, Education, Business Services, News, Privacy Policy, Cookie Notice) links here.

## Languages (EN / KO / RU / KK)
- Switcher: top bar and footer. Choice is saved in localStorage and carried through links as `?lang=xx`; first visit follows the browser language. Direct link example: `index.html?lang=kk`.
- All texts are in `assets/js/i18n.js` as `units: { tNNN: [en, ko, ru, kk] }`. Each element in the HTML has `data-i18n="tNNN"`. To edit a translation, change the entry there. Page titles/meta descriptions are under `pages`.
- To change a text: edit the English in the HTML and the `en` entry in i18n.js (the script overwrites the HTML text with the dictionary).
- KO/RU/KK were machine-translated: please have native speakers review them (especially Kazakh and legal/business terms).

## Contact forms
Submitting opens the visitor's email app (mailto: hyohyunpark@gmail.com). To use a real backend, replace the `location.href = 'mailto:…'` line in `assets/js/main.js`.

## Notes
- Fonts load from Google Fonts (Inter, Noto Sans KR).
- Placeholder photo slots are marked with captions; replace with `<img>` when photos are ready.
- Social/Instagram links and the Privacy/Cookie pages are placeholders.
