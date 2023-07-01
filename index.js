const express = require("express")
const cors = require('cors')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')
const db = require("./models").sequelize
const PORT = 5000
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const userRoutes = require("./routes/user.js")
const authRoutes = require("./routes/auth.js")
const orderRoutes = require("./routes/order.js")

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db 
})

const isProduction = process.env.NODE_ENV === 'production'

;(async()=>{
    await db.sync()
})()

let sessionConfig = {
    secret: process.env.SESS_SECRET,
    store: store
}

if (isProduction) {
    sessionConfig = {
        secret: process.env.SESS_SECRET,
        store: store,
        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 60 * 48,
            httpOnly: true,
            sameSite: 'none'
        },
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true // if you do SSL outside of node.
    }
}

app.use(session(sessionConfig))

store.sync()

app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(userRoutes)
app.use(authRoutes)
app.use(orderRoutes)

store.sync()

app.listen(PORT, () => {
    console.log(`Server Menyala di PORT ` +PORT);
})