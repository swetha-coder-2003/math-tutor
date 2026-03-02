// OCR module using Tesseract
import Tesseract from '../../libs/tesseract.min.js';

export async function recognizeFromCanvas(canvas){
    try {
        const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
            logger: m => console.log(m) // optional: shows progress
        });
        return text;
    } catch(err){
        console.error("OCR Error:", err);
        return "";
    }
}