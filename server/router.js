import { response, Router } from "express";

Router.get("/", (req, res) =>{
    res.send({response : "response status is running "}).status(200);
});

module.exports =Router;