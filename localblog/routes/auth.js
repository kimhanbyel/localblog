const authHandler = require('../handlers/auth.js');
const express = require('express');
const router = express.Router();

router.get('/signIn', (req, res)=>{ res.render('auth/signIn.html');});
router.post('/signInProcess', authHandler.signInProcess);

router.get('/signUp', (req, res)=>{res.render('auth/signUp.html');});
router.post('/signUpProcess', authHandler.signUpProcess);

router.get('/signOut', authHandler.signOut);


module.exports = router;