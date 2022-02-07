// DOM selector: #profile-data > div.box-head > div > p > span.group
var cache={};
const express=require("express");
const validate=require("./validate.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch=require("cross-fetch");

const findUsername=require("./findUsernameInPath.js");
const api=function(req, res, next) {
  const username=findUsername(req.path.split("/"));
  if(validate(username)!==true) {
    res.status(400);
    res.end(JSON.stringify({error: "Invalid username",username: username}));
  }
  else {
   /* res.sendStatus(501);
    res.end();
    return; */
    if(cache[username] instanceof Boolean) {
      console.log(`Loading ${username} from cache`)
          res.status(200);
          res.end(JSON.stringify({isScratcher: cache[username],username: username,value: ""}));
          return;
    }
    fetch(`https://scratch.mit.edu/users/${username}`).then(function(scratchRes) { // Thanks @webdev03 for teaching me about backtick brackets!
      scratchRes.text().then(function(text) {
        try {
        const scratchDom=new JSDOM(text);
        var value=scratchDom.window.document.querySelector("#profile-data > div.box-head > div > p > span.group").textContent.toLowerCase();
          value=value.replaceAll("\n","");
          value=value.replaceAll("\t","");
          value=value.replaceAll(String.fromCharCode(32),"")
        if(value=="scratchteam" || value=="scratcher") {
          cache[username]=true;
          res.status(200);
          res.end(JSON.stringify({isScratcher: true,username: username,value: value}));
        }
        else {
          cache[username]=false;
          res.status(200);
          res.end(JSON.stringify({isScratcher: false,username: username,value: value}));
        }
        }
        catch(e) {
          res.status(404);
      res.send(JSON.stringify({error: "Not found",username: username,errorStack: e.stack}));
          res.end();
        }
      },function(e) {res.status(404);
      res.send(JSON.stringify({error: "Not found",username: username,errorStack: e.stack}));})
    },function(e) {
      res.status(404);
      res.send(JSON.stringify({error: "Not found",username: username,errorStack: e.stack}));
    })
  }
  
}
module.exports=api;