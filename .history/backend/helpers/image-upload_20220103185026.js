import multer, {diskStorage} from 'multer';
import {extname} from 'path';

const imageStore = (req, file, cb)