import * as express from 'express';
import { generateImage} from '../controllers/openaiController.js';
import { Request, Response, NextFunction } from 'express';

export const openaiRouter = express.Router();

export const getOpenai = async (req: Request, res: Response, next: NextFunction) => {

  try {

   return  generateImage(req, res); 

  } catch (error) {

    next(error);

  }

};