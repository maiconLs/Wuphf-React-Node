import multer, {diskStorage} from 'multer';
import {extname} from 'path';

const imageStore = diskStorage({
  destination:(req, file, cb) =>{
    let folder = ''

    if(req.baseUrl.includes('users') ){
      folder = 'users'
    } else if(req.baseUrl.includes('posts')){
      folder = 'posts'
    }

    cd(null, `public/images/${folder}`)
  }

  fileName: (req, file, cb) => {

  }
})