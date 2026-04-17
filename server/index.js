const express = require("express")
const app = express()
const PORT = 3000;
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');


app.use(express.static('static'))
app.use(cors())
app.use(express.json());


const jsonik = require("./data/data.json")


app.get("/promotions", function (req, res) {
    res.json(jsonik);

})

app.get("/promotion/:id", (req, res) => {
    const obj = jsonik.promotions.filter(a => a.id == req.params.id)[0]
    res.json(obj)
})
app.get("/product/:id", (req, res) => {
    res.json(jsonik.products.filter(a => a.id == req.params.id)[0])
})



app.get("/promotionItems/:id", function (req, res) {
    const arr = jsonik.promotions.filter(a => a.id == req.params.id)[0].items
    const resp = []
    arr.forEach((element, index) => {
        resp.push(jsonik.products.filter(a => a.id == element)[0])
    });
    res.json(resp)
})



app.post('/createUser', async function (req, res) {

    usersFilePath = path.join("data", "users.json")

    const users = require("./data/users.json")


    console.log(req.body)
    const usersData = {
        email: req.body.email,
        password: req.body.password
    }

    await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');
    res.json({"message":"zapisano"})
})




app.get('/health', function (req, res) {
    res.send('ok')
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})