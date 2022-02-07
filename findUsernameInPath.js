const findUsername=function (usernameArr) {
  for(var a=0;a<usernameArr.length;a++) {
    if(usernameArr[a].length>0) return usernameArr[a];
  }
}
module.exports=findUsername;