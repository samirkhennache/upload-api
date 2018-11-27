const express = require('express');
const router = express.Router();
const fs = require('fs')
const multer = require('multer');

//const upload = multer({ dest: 'tmp/' });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+ '-' + Date.now())
  },
})

const upload = multer({
  dest:'tmp/',
  limits:{
    fileSize:3*1024*1024
  },
  fileFilter: (req,file,cb) =>{
    if(!file.mimetype.includes('image/png'))
      cb(new Error('Mauvais format'))
    cb(null,true)
  },
  storage: storage,
  })
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express'});
});
router.post('/uploaddufichier',upload.array('monfichier', 3),(req, res) => {
  // traitement du formulaire
  res.redirect('/')
})
// router.post('/uploaddufichier', upload.array('monfichier', 3), (req, res, next) => {
//   // traitement du formulaire
//   req.files.forEach(file => {
//     fs.rename(file.path, 'public/images/' +file.originalname,(err) =>{
//       if (err) {
//           res.send('problème durant le déplacement');
//       } else {
//           res.send('Fichier uploadé avec succès');
//       }

//   });
// })
// })



module.exports = router;
