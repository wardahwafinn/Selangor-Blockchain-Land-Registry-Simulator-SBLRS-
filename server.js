const express = require("express");
const path = require("path");
const LandContract = require("./contract/landContract");

const app = express();
const contract = new LandContract();

app.use(express.json());
// Serve static files from the 'web' folder
app.use("/web", express.static(path.join(__dirname, "web")));

app.post("/register", (req, res) => {
    try {
        const { id, location, owner, area } = req.body;
        res.send(contract.registerLand(id, location, owner, area));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.post("/transfer", (req, res) => {
    try {
        const { id, newOwner } = req.body;
        res.send(contract.transferTitle(id, newOwner));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get("/query/:id", (req, res) => {
    res.send(contract.queryLand(req.params.id));
});

app.listen(3000, () => console.log("Land Registry Server running on http://localhost:3000"));