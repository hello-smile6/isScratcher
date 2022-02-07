// const validate=require("./validate.js");
const api=require("./api.js");
const jsdom=require("jsdom");
const express=require("express");
const app=express();
app.use("/api",api);
app.listen(8080);