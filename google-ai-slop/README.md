# Google AI Slop Factory 🤖

A tiny Gemini-powered absurdity generator for Estonian/English meme concepts, short-video scripts, fictional tech headlines and surreal comedy.

## Requirements
- Node.js 20+
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

## Run locally
```bash
cd google-ai-slop
npm install
cp .env.example .env
```

Put your key in `.env`:
```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

Then run:
```bash
npm start
```

Open http://127.0.0.1:3000

## Security
The API key is read by the Node.js server and is never sent to the browser. Keep `.env` private and never commit it. This starter generates text concepts/scripts only; it does not automatically create image/video files or publish content.

## License
MIT
