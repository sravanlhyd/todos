const Data = require('../model/data');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getAllData = async(req, res) => {
    try {
        console.log("req",req)
        const product = await Data.find();
        if(product.length)
        res.send(product);

        else
        res.status(401).json({msg: 'No data exist.'});

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const addData = async(req, res) => {
    try {
        console.log(req.body)
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
  
            const product = await Data.create(req.body);
             res.send(product);
    
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const updateData = async(req, res) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        const {title} = req.body;

            await Data.updateOne({title}, req.body)
            res.send("data has been updated")

    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

const deleteData = async(req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        const {title} = req.body;
            await Data.deleteOne({title})
            res.send("data has been removed")
      
    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

module.exports = { addData, getAllData, updateData, deleteData }