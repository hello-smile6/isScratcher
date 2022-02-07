// DOM selector: #profile-data > div.box-head > div > p > span.group
const express=require("express");
const validate=require("./validate.js");
const findUsername=require("./findUsernameInPath.js");
const api=function(req, res, next) {
  const username=findUsername(req.path.split("/"));
  if(validate(username)!==true) {
    res.status(200);
    res.end(username);
  }
  else {
    const
  }
  
}
module.exports=api;