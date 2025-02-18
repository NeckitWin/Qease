import express from "express";
import cors from "cors";
import userRepository from "./database/repository/userReposytory.js";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());
const secretKey = process.env.SECRET_KEY;

app.post("/login", async (req, res) => {
    const user = req.body;
    const {username, password} = user;
    const loginUser = await userRepository.getUser(user);
    if (!loginUser) return res.json({error: "Użytkownik nie istnieje"});
    if (loginUser.password !== password) return res.json({error: "Nieprawidłowe hasło"});
    const token = jwt.sign({username}, secretKey, {expiresIn: "1h"});

    res.cookie("authToken", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 3600000
    });

    res.json({message: 'Udane logowanie!'});
});

app.post("/register", async (req, res) => {
    const user = req.body;
    const getUser = await userRepository.getUser(user);
    if (getUser) return res.json({error: "Użytkownik już istnieje"});
    const newUser = await userRepository.postUser(user);
    const token = jwt.sign({username: newUser.username}, secretKey, {expiresIn: "1h"});

    res.cookie("authToken", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 3600000
    });
    res.json({message: 'Udane zarejestrowanie!'});
});

app.get("/get-cookie", (req, res) => {
    const token = req.cookies.authToken;
    if (!token) return res.json({error: "Brak tokena"});
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({error: "Błąd weryfikacji"});
        res.json({username: decoded.username});
    });
});

app.listen(3000, () => {
    console.log("Serwer wystartował na porcie 3000");
});