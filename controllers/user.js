const { User } = require("../models")
const argon2 = require('argon2')

const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ["uuid", "nama", "email","status", "nik", "noTelp", "tglLahir", "tempatLahir", "imageUrl"]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes:["uuid", "nama", "email","status", "nik", "noTelp", "tglLahir", "tempatLahir", "imageUrl"],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createUser = async(req, res) => {
    const {nama, noTelp, email, password} = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            nama: nama,
            noTelp: noTelp,
            email: email,
            password: hashPassword,
        })
        res.status(201).json({msg: "Register Berhasil"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const updateUser = async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"});
        const nama = req.body.nama
        const nik = req.body.nik
        const tglLahir = req.body.tglLahir
        const tempatLahir = req.body.tempatLahir
        await User.update({
            nama: nama,
            nik: nik,
            tglLahir: tglLahir,
            tempatLahir: tempatLahir
        },{
            where: {
                uuid: req.params.id
            }
        })
        res.status(200).json({msg: "Users Updated Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser
}