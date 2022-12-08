const  mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({

    symbol: {
        type : String 
    },
    name: {
        type : String 
    },
    marketCapUsd : {
        type : String 
    },
    priceUsd: {
        type : String 
    } 
}, { versionKey : false })

module.exports = mongoose.model("crypto" , blockSchema )