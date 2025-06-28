import { response, Router } from "express";
const router = Router();

router.get("/", (req, res) =>{
    res.send({response : "response status is running "}).status(200);
});

export {router};