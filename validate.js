// Regex for alphanumeric: ^[a-zA-Z0-9]{1}$
var profanityfinder = require('profanity-finder');
var findProfanity = profanityfinder.findprofanity;
const isAZaz09=require("./isAlphanumeric.js");
const validate=function(username) {
  if(!username instanceof String) {
    return false;
  }
  // AbortController can't be tampered with. Activated if any character is invalid.
  if(username.length>20 || username.length<3) {
    return false;
  }
  if(findProfanity(username)) {
    return false;
  }
  const isValid=new AbortController();
  const usernameArray=Array.from(username);
  usernameArray.forEach(function(char) {
    if(isValid.signal.aborted) return false;
    const charIsValid=new AbortController();
    if(isAZaz09(char)) charIsValid.abort();
    if(char=="_") charIsValid.abort();
    if(char=="-") charIsValid.abort();
    if(!charIsValid.signal.aborted) {
      // console.log(1);
      isValid.abort();
    }
  });
  // console.log(isValid.aborted);
  if(isValid.signal.aborted) {
    return false;
  }
  else {
    return true;
  }
  // var matches=username.match(^[a-z0-9_-].*?$)
}
module.exports=validate;