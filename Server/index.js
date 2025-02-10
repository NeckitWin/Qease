const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const userReposytory = require("./database/repository/userReposytory");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
    const user = {
        username: req.query.username,
        password: req.query.password
    }
    const users = await userReposytory.getUser( user );
    res.json(users);
});

app.post("/users", async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    const users = await userReposytory.postUser( user );
    res.json(users);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
