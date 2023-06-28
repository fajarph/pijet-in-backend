const getUsers = async(req, res) => {
    const dataUser = require("../dataDummy/dataDummy.js")
    res.status(200).json(dataUser)
}

const Login = async(req, res) => {
    const { email, password } = req.body

    const dataUser = require("../dataDummy/dataDummy.js")
    let isLogin = false;

    for (let index = 0; index < dataUser.user.length; index++) {
        let emailDB = dataUser.user[index].email
        let passwordDB = dataUser.user[index].password
        if (emailDB === email && passwordDB === password) {

            res.status(200).json({msg: "Succes"})
            isLogin = true;
            break;
        }
    }
    if (isLogin === false) {
        res.status(500).json({msg: "Gagal"})
    }
}

const register = (nama, status, nik, email, password) => {
    const dataUser = require("../dataDummy/dataDummy.js")
    const newUser = {
        id: dataUser.user.length + 1,
        nama,
        status,
        nik,
        email,
        password,
    };
  
    data.user.push(newUser);
  
    return newUser;
}

module.exports = {
    getUsers,
    Login,
    register
}