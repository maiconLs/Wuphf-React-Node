import multer, {diskStorage} from 'multer';
import {extname} from 'path';

const imageStore = diskStorage({
  destination:function(req, file, cb){
    let folder = ''

    if(req.baseUrl.includes('users') ){
      folder = 'users'
    } 
    if
  }
})