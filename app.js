const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const MONGO_URI= process.env.MONGO_URI || "mongodb+srv://metricod:nF5fGqEd1UNeVKu9@cluster0.aqg3ezt.mongodb.net/metricod"
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

express.json();

mongoose.connect(MONGO_URI);

const cardSchema = new mongoose.Schema({
    price: String,
    period: String,
    features: [String],
    comingSoon: String,
    buttonText: String,
    note: String
});

const Card = mongoose.model("Card", cardSchema);
app.get("/",(req,res) => {
    res.send("welcome");
});

app.get("/api/card", async (req,res) => {
    try{
        const card = await Card.findOne();
        if(!card){
            return res.json({ message : "No Card found"});
        }
        res.json(card);
    }catch (err){
        res.status(500).json({ error : err.message});
    }
});

app.post("/api/seed", async (req,res) => {
    await Card.deleteMany({});
    const card = new Card({
        price: "$5",
        period: "mo",
        features: ["Included features #1","Included Features #2", "Included Features #3"],
        comingSoon: "Custom Placeholder text",
        buttonText: "Signup Now",
        note: "You'll be charged $48 + tax. 14-Day Moneyback Guarantee.",
    });
    await card.save();
    res.json({ message: "Seeded!"});
});
app.get("/api/seed",(req,res) => {
    res.json({

        price: "$5",
        period: "mo",
        features: ["Included features #1","Included Features #2", "Included Features #3"],
        comingSoon: "Custom Placeholder text",
        buttonText: "Signup Now",
        note: "You'll be charged $48 + tax. 14-Day Moneyback Guarantee.",
    
    })
    
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});