const express=require("express");
const path=require("path");
const docs=express.static(path.join(__dirname,"docs"));
module.exports=docs;