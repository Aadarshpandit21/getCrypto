// api.coincap.io/v2/assets
let axios = require('axios');
const cryptoModel = require('../models/cryptoModel');

let getCrypto = async function(req,res){
    try{
        let cryptoData = {
            method:'get',
            url:"https://api.coincap.io/v2/assets",
            Headers: {
                'Authorization': 'Bearer 11945c6a-6e13-465b-a0f1-dae3a78cfcb6'
            }
        }
     let result = await axios(cryptoData);
     let Data = result.data;

     for (let i = 0; i < Data.data.length; i++) {
        let data = {}
        data.symbol = Data.data[i].symbol
        data.name = Data.data[i].name
        data.marketCapUsd = Data.data[i].marketCapUsd
        data.priceUsd = Data.data[i].priceUsd


          let createData = await cryptoModel.findOneAndUpdate(
            { $and: [{ symbol: data.symbol }, { name: data.name }] },
              {
                symbol: data.symbol,
                name: data.name,
                marketCapUsd: data.marketCapUsd,
                priceUsd: data.priceUsd
              },
             { upsert: true })
      }
     let sortedData = Data.data.sort((a, b) =>{ return b.changePercent24Hr - a.changePercent24Hr })
     res.status(200).json({status:true,msg:sortedData})
    }catch(error){
        res.status(500).send({msg:error.msg})
    }
}

module.exports.getCrypto=getCrypto;

// {  "symbol" // String and Unique
// "name": // String and Unique
// "marketCapUsd": // String  ( not Number)
//  "priceUsd": //String
// }
