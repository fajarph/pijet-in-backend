const { User } = require("../models")
const argon2 = require('argon2')

const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    const match = await argon2.verify(user.password, req.body.password)
    if(!match) return res.status(400).json({msg: "Email atau password salah"})
    req.session.userId = user.uuid
    const uuid = user.uuid
    const email = user.email
    res.status(200).json({uuid, email})
}

const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Tidak Dapat Logout"})
        res.status(200).json({msg: "Anda Telah Logout"})
    })
}

module.exports = {
    Login,
    LogOut
}