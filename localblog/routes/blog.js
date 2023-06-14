const express = require('express');
const router = express.Router();
const blogHandler = require('../handlers/blog.js');
const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({ 
      destination(req, file, done) { 
          done(null, 'images/'); 
      },
      filename(req, file, done) { 
          const ext = path.extname(file.originalname); 
          done(null, path.basename(file.originalname, ext) + Date.now() + ext); 
      }
  }),
  limits: { fileSize: 1 * 1024 * 1024 } 
});

router.get('/', (req, res)=>{ res.send('상품정보 도메인')});
router.get('/list', blogHandler.list);
router.get('/registration', blogHandler.registration);
router.post('/registrationProcess',upload.single('productImg'), blogHandler.registrationProcess);
router.get('/:postNum', blogHandler.productNum);
router.get('/:postNum/modification', (req, res)=>{ res.send(`${req.params.postNum}의 수정`)});
router.get('/:postNum/delete', (req, res)=>{ res.send(`${req.params.postNum}의 삭제`)});

module.exports = router;


