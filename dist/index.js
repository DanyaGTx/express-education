"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const db = {
    games: [
        { id: 1, title: "Minecraft!" },
        { id: 2, title: "CS:GO" },
        { id: 3, title: "Fortnite" },
    ],
};
app.get("/", (req, res) => {
    res.sendStatus(404);
});
app.get("/games", (req, res) => {
    let foundedGames = db.games;
    if (req.query.title) {
        foundedGames = db.games.filter((game) => game.title.indexOf(req.query.title) > -1);
    }
    res.json(foundedGames);
});
app.get("/games/:id", (req, res) => {
    const foundGame = db.games.find((game) => game.id === +req.params.id);
    if (!foundGame) {
        res.sendStatus(404);
        return;
    }
    res.json(foundGame);
});
app.post("/games", (req, res) => {
    const createdGame = {
        id: crypto.randomUUID(),
        titlte: req.body.title,
    };
    db.games.push(createdGame);
    res.status(201).json(createdGame);
});
app.delete("/games/:id", (req, res) => {
    db.games = db.games.filter((game) => game.id !== +req.params.id);
    res.sendStatus(204);
});
app.patch("/games/:id", (req, res) => {
    const foundGame = db.games.find((game) => game.id === +req.params.id);
    foundGame.title = req.body.title;
    res.json(foundGame);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
