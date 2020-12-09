const express = require("express")
const body = require("body-parser")
const router = require("./routers/userRouter")

const app = express()
app.use(body.urlencoded({
    extended: "false"
}))
app.listen(8080)
app.use(express.static('public'));
app.post("/", (req, res) => {
    res.sendFile(__dirname + "login.html")
})
app.use("/user", router)