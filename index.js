import 'dotenv/config';
import express from 'express';
import multer from 'multer';

import { GoogleGenAI } from '@google/genai';

const app = express();
const upload = multer();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = "gemini-2.5-flash";

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));

function extractText(resp) {
    try {
        const text =
            resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
            resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
            resp?.response?.candidates?.[0]?.content?.text;

        return text ?? JSON.stringify(resp, null, 2);
    } catch (err) {
        console.error("Error extracting text:", err);
        return JSON.stringify(resp, null, 2);
    }
}

// GENERATE TEXT
app.post('/generate-text', async (req, res) => {
    try {
        const { prompt } = req.body;
        const resp = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt
        });
        res.json({ result: extractText(resp) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GENERATE FROM IMAGE
app.post('/generate-from-image', upload.single('image'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const imageBase64 = req.file.buffer.toString('base64');
        const resp = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt },
                { inlineData: { mimeType: req.file.mimetype, data: imageBase64 } }
            ]
        });
        res.json({ result: extractText(resp) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GENERATE FROM DOCUMENT
app.post('/generate-from-document', upload.single('document'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const docBase64 = req.file.buffer.toString('base64');
        const resp = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt || "Ringkas dokumen berikut:" },
                { inlineData: { mimeType: req.file.mimetype, data: docBase64 } }
            ]
        });
        res.json({ result: extractText(resp) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GENERATE FROM AUDIO
app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const audioBase64 = req.file.buffer.toString('base64');
        const resp = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt || "Transkrip audio berikut:" },
                { inlineData: { mimeType: req.file.mimetype, data: audioBase64 } }
            ]
        });
        res.json({ result: extractText(resp) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});