const validate=require("./validate.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch=require("cross-fetch");
const isScratcher=async function(username,options) {
  var falseOnError=false;
  var result1=new AbortController();
  if(options instanceof Object) {
    if(typeof options.falseOnError=="boolean") {
      falseOnError=options.falseOnError;
    }
  }
  if(!validate(username)) {
    if(falseOnError) {
      return false;
    }
    else {
      throw new TypeError("Invalid username!");
    }
  }
  console.log("At request");
  const scratchRes=await fetch(`https://scratch.mit.edu/users/${username}`); // Thanks @webdev03 for teaching me about backtick brackets!
  console.log("Got response!");
        const text=await scratchRes.text();
        console.log("Got text");
        try {
          const scratchDom=new JSDOM(text);
          var value=scratchDom.window.document.querySelector("#profile-data > div.box-head > div > p > span.group").textContent.toLowerCase();
          value=value.replaceAll("\n","");
          value=value.replaceAll("\t","");
          value=value.replaceAll(String.fromCharCode(32),"")
          if(value=="scratchteam" || value=="scratcher") {
            result1.abort();
          }
            else {
              // Do nothing
            }
            console.log("Got result!");
            }
        catch(e) {
          if(falseOnError) {
            result=false;
          }
          else {
            console.error(e.stack);
            throw e;
          }
        }
      /* },function(e) {
        if(falseOnError) {
          result=false;
        }
        else {
          console.error(e.stack);
          throw e;
        }
      })
    },function(e) {
        if(falseOnError) {
          result=false;
        }
        else {
          console.error(e.stack);
          throw e;
        }
    }) */
    return result1.signal.aborted;
    }

module.exports=isScratcher;