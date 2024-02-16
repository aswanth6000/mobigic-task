import { Request } from 'express';
import multer, { FileFilterCallback, Multer } from 'multer';
import path from 'path';

//multer configuration

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
