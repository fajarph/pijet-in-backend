const express = require("express")
const cors = require('cors')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')
const dotenv = require('dotenv')
const db = require("./config/database.js")
const app = express()
const PORT = 5000
dotenv.config()

const userRoutes = require("./routes/user.js")
const dataDummy = require("./routes/dataDummy.js")

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db 
})

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(userRoutes)
app.use(dataDummy)

store.sync()

app.listen(PORT, () => {
    console.log(`Server Menyala di PORT ` +PORT);
})