const express = require("express")
const app = express()
const PORT = 3000;
const cors = require('cors');



app.use(express.static('static'))
app.use(cors())
app.use(express.json());


const jsonik = require("./data/data.json")


app.get("/promotions", function(req, res){
    res.json(jsonik); 

})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})