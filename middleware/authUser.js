const { User } = require("../models")

const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon Login ke Akun Anda"})
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    req.userId = user.id
    req.email = user.email
    next()
}

module.exports = {
    verifyUser
}