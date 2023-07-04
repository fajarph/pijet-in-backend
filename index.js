const express = require("express")
const cors = require('cors')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { sequelize } = require("./models")
const PORT = 5000
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const userRoutes = require("./routes/user.js")
const authRoutes = require("./routes/auth.js")
const orderRoutes = require("./routes/order.js")

const isProduction = process.env.NODE_ENV === 'production'

;(async()=>{
    await sequelize.sync()
})()

const sessionConfig = {
    secret: process.env.SESS_SECRET,
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000, // Check every 15 minutes
      expiration: 24 * 60 * 60 * 1000, // Expire after 24 hours
    }),
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? 'none' : undefined,
    },
    resave: false,
    proxy: isProduction,
  }

app.use(session(sessionConfig))

sequelize.sync()

app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(userRoutes)
app.use(authRoutes)
app.use(orderRoutes)

app.listen(PORT, () => {
    console.log(`Server Menyala di PORT ` +PORT);
})