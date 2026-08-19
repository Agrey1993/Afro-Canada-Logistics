# Afro-Canada Logistics website

A responsive Canada–Tanzania logistics website with service information, illustrative pricing and an interactive quote-request experience.

## Open in VS Code

1. Install Node.js 22 or newer.
2. Open PowerShell. If `C:\Users\Admin\Afro-Canada Logistics` is empty, download the GitHub project into it:

```powershell
cd "C:\Users\Admin\Afro-Canada Logistics"
git clone https://github.com/Agrey1993/Afro-Canada-Logistics.git .
code .
```

3. In VS Code, double-click `start-site.bat`, or open the terminal and run:

```bash
npm install
npm run dev
```

4. Open the local URL shown in the terminal.

The Windows launcher installs missing packages automatically and starts the development website. If the target folder already contains unrelated files, move or back them up before cloning the repository into it.

## Main files

- `app/page.tsx` — page content, navigation, services and quote-form behavior.
- `app/globals.css` — branding, layout and responsive styles.
- `start-site.bat` — one-click Windows setup and local startup.
- `.openai/hosting.json` — identifies the private hosted Site.

## Before a public launch

- Replace the illustrative rates with approved prices.
- Add the official phone/WhatsApp and business email when available.
- Connect the quote form to an inbox, CRM or database. It currently saves only on the visitor's device.
- Confirm service timelines, customs wording, insurance terms and the complete business address.

Run `npm run build` before publishing changes.
