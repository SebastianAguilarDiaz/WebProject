import express from "express";


const router = express.Router();

router.get('/',(req,res,next)=>{
  res.render("index");
})

.get('/about',(req,res,next)=>{
  res.render("about");
})

.get('/contribute',(req,res,next)=>{
  res.render("contribute");
})

.get('/explore',(req,res,next)=>{
  res.render("explore");
})

.get('/myProfile',(req,res,next)=>{
  res.render("myProfile");
})

.get('/verify',(req,res,next)=>{
  res.render("verify");
})

export default router;
