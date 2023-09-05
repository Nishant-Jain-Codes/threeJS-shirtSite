import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello From DALL.E ROUTES' });
});
router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body;
        const response = await openai.images.generate({
            prompt: prompt,
            n:1,
            size: `1024x1024`,
            response_format: 'b64_json',
        })
        const image = response.data.data[0].b64_json
        res.status(200).json({photo: image});
    }catch(err){
        const errorMessages = {
            'billing_hard_limit_reached': 'Billing hard limit has been reached. Please upgrade your subscription.',
        };
        console.error(err);
        if (err.code in errorMessages) {
            const errorMessage = errorMessages[err.code];
            res.status(400).json({ message: errorMessage });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
})
export default router;