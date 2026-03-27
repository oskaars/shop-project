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

app.get("/promotion/:id", (req, res) => {
    const obj = jsonik.promotions.filter(a => a.id == req.params.id)[0]
    res.json(obj)
})
app.get("/product/:id", (req, res) => {
    res.json(jsonik.products.filter(a => a.id == req.params.id)[0])
})



app.get("/promotionItems/:id", function(req, res){
    const arr = jsonik.promotions.filter(a => a.id == req.params.id)[0].items
    const resp = {}
    arr.forEach((element, index) => {
        resp[index] = jsonik.products.filter(a => a.id == element)[0]
    });
    res.json(resp)
})





app.get('/health', function(req, res){
    res.send('ok')
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})