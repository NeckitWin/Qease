import express from "express";
import cors from "cors";
import userRepository from "./database/repository/userReposytory.js";
import session from "express-session"
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({origin: 'http://localhost:4200', credentials: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true, maxAge: 360000000},
}))

app.post("/login", async (req, res) => {
    const user = req.body;
    const {password} = user;
    const loginUser = await userRepository.getUser(user);
    if (!loginUser) return res.json({error: "Użytkownik nie istnieje"});
    if (loginUser.password !== password) return res.json({error: "Nieprawidłowe hasło"});
    delete loginUser.password;
    req.session.user = loginUser;
    res.json({message: "Zalogowano"});
});

app.post("/register", async (req, res) => {
    const user = req.body;
    const getUser = await userRepository.getUser(user);
    if (getUser) return res.json({error: "Użytkownik już istnieje"});
    await userRepository.postUser(user);
    req.session.user = user;
    res.json({message: "Zarejestrowano"});
});

app.get("/me", async (req, res) => {
    if (!req.session.user) return res.json({error: "Użytkownik niezalogowany"});
    res.json({user: req.session.user});
});

app.get("/logout", async (req, res) => {
    req.session.destroy();
    res.json({message: "Wylogowano"});
});

app.listen(3000, () => {
    console.log("Serwer wystartował na porcie 3000");
});