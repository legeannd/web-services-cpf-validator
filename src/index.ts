import express, { Request, Response } from "express";
import router from './router';


const app = express();
app.use(express.json());

app.use("/cpf", router);

app.listen(3333, () => {
    console.log('server started at http://localhost:3333');
});