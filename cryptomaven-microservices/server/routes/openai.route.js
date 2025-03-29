import * as express from 'express';
import { generateImage } from '../controllers/openaiController.js';
export const openaiRouter = express.Router();
export const getOpenai = async (req, res, next) => {
    try {
        return generateImage(req, res);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=openai.route.js.map