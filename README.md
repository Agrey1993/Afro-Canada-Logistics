# Afro-Canada Logistics website

A responsive Canada–Tanzania logistics website with service information, illustrative pricing and an interactive quote-request experience.

## Open in VS Code

1. Install Node.js 22 or newer.
2. Extract the project package and open the folder in VS Code.
3. Open the VS Code terminal and run:

```bash
npm install
npm run dev
```

4. Open the local URL shown in the terminal.

## Main files

- `app/page.tsx` — page content, navigation, services and quote-form behavior.
- `app/globals.css` — branding, layout and responsive styles.
- `.openai/hosting.json` — identifies the private hosted Site.

## Before a public launch

- Replace the illustrative rates with approved prices.
- Add the official phone/WhatsApp and business email when available.
- Connect the quote form to an inbox, CRM or database. It currently saves only on the visitor's device.
- Confirm service timelines, customs wording, insurance terms and the complete business address.

Run `npm run build` before publishing changes.
