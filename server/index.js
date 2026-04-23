const express = require("express")
const app = express()
const PORT = 3000;
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //ustawia header access-control-allow-credentials:true
    optionSuccessStatus: 200
   }

app.use(express.static('static'))
app.use(cors(corsOptions))
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
    try {
        const usersFilePath = path.join(__dirname, "data", "users.json");
        const data = await fs.readFile(usersFilePath, 'utf8');
        const usersArray = JSON.parse(data); 
        const userExists = usersArray.find(user => user.email === req.body.email);

        if (userExists) {
            return res.json({ status: "exists", message: "user exists" });
        }

        const newUser = {
            email: req.body.email,
            password: req.body.password
        };
        usersArray.push(newUser);

        await fs.writeFile(usersFilePath, JSON.stringify(usersArray, null, 2), 'utf8');
        
        res.json({ status: "registered", message: "registered" });

    } catch (error) {
        console.error("registration error", error);
        res.status(500).json({ status: "error", message: "server error" });
    }
});




app.get('/health', function (req, res) {
    res.send('ok')
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})