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
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + String(Math.floor(Math.random() *100) + extname(file.originalname)))
  }
})

const imageUpload = multer({
  storage: imageStore,
  fileFilter:(req, file, cb) => {
    if(!file.originalname.match(/\.(png|jpg)$/)){
      return cd
    }
  }
})