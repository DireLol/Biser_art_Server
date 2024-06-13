const {JewelryColor} = require('../models/models')
class JewelryColorController{
    async create(req,res){
        const {name} =req.body
        const type =await JewelryColor.create({name})
        return res.json(type)
    }
    async getAll (req,res){
        const colors = await JewelryColor.findAll()
        return res.json(colors)
    } 
    async getOne (req,res){

    }
    async patch (req,res){

    }
    async delete (req,res){
        
    }

}
module.exports=new JewelryColorController()