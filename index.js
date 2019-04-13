const express = require("express")
const path = require("path")
const logger = require("./Logger.js")
const exphbs  = require('express-handlebars');
const members = require("./Members.js")

const app = express()

// app.get("/", (req, res) => {
//     // res.send("<h1>Hello</h1>")
//     res.sendFile(path.join(__dirname, "public", "index.html"))
// })

//Init express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Init Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Init Middlewares
// app.use(logger)

//Handlebars
app.get("/", (req, res) => {
    res.render("index", {
        title: "Member App",
        members
    })
})

//Handle API
app.use("/api/members", require("./routes/api/MembersApi.js"))

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {console.log("Server Running On Port "+PORT)})
