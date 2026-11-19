import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.static("public"));

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.get("/api/status", (_req, res) => {
  res.json({ configured: Boolean(ai), model });
});

app.post("/api/generate", async (req, res) => {
  if (!ai) return res.status(503).json({ error: "Gemini API key is missing. Add GEMINI_API_KEY to .env and restart." });
  const theme = String(req.body?.theme || "Google'i kontor läheb täiesti lolliks").slice(0, 500);
  const format = ["meme", "short", "headline", "story"].includes(req.body?.format) ? req.body.format : "short";
  const language = req.body?.language === "English" ? "English" : "Estonian";
  const count = Math.min(5, Math.max(1, Number(req.body?.count) || 3));

  const formats = {
    meme: "Create punchy meme concepts: each has a short title, image description, and caption.",
    short: "Create short absurd video concepts with a hook, 3 scene beats, voiceover, and ending punchline.",
    headline: "Create ridiculous fake tech-news headlines with a one-sentence satirical summary.",
    story: "Create a tiny surreal comedy story with a strong opening and unexpected ending."
  };
  const prompt = `You are GOOGLE SLOP FACTORY: a surreal comedy and tech-satire writer. Generate ${count} distinct pieces in ${language}. Theme: ${theme}. Format: ${formats[format]} Make it absurd, funny, original and clearly fictional satire. Do not present fake claims as real news. Avoid hateful or targeted harassment. Use numbered entries and clear labels. No intro or disclaimers.`;

  try {
    const result = await ai.models.generateContent({ model, contents: prompt });
    res.json({ text: result.text || "Gemini returned an empty response.", model });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(502).json({ error: "Gemini request failed. Check the API key, model name, quota and network." });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, "127.0.0.1", () => console.log(`Google AI Slop Factory running at http://127.0.0.1:${port}`));
