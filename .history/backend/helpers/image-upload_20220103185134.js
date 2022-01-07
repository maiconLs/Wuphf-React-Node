import multer, {diskStorage} from 'multer';
import {extname} from 'path';

const imageStore = diskStorage({
  destination:{
    
  }
})