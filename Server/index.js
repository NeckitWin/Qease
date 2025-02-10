import express from "express";
import cors from "cors";
import userRepository from "./database/repository/userReposytory.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
    const user = req.body;
    const {password} = user;
    const loginUser = await userRepository.getUser(user);
    if (!loginUser) return res.json({error: "Użytkownik nie istnieje"});
    if (loginUser.password !== password) return res.json({error: "Nieprawidłowe hasło"});
    res.json({data: loginUser.username});
});

app.post("/register", async (req, res) => {
    const user = req.body;
    const getUser = await userRepository.getUser(user);
    if (getUser) {
        return res.json({error: "Użytkownik już istnieje"});
    }
    const newUser = await userRepository.postUser(user);
    res.json({data: newUser.username});

});

app.listen(3000, () => {
    console.log("Serwer wystartował na porcie 3000");
});