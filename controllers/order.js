const { Order, User } = require("../models")

const getOrders = async(req, res) => {
    try {
        const response = await Order.findAll({
            attributes: ["nama", "gender", "durasiLayanan", "layananTambahan", "UserId"],
            include: [
                {
                    model: User,
                    attributes: ['id', 'nama']
                }
            ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createOrder = async(req, res) => {
    const {nama, gender, durasiLayanan, layananTambahan} = req.body;
    try {
        await Order.create({
            nama: nama,
            gender: gender,
            durasiLayanan: durasiLayanan,
            layananTambahan: layananTambahan,
            UserId: req.userId
        })
        res.status(201).json({msg: "Order Berhasil Terbuat"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = {
    getOrders,
    createOrder
}