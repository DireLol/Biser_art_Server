const {JewelryStyle} = require('../models/models')
class JewelryStyleController{
    async create(req,res){
        const {name} =req.body
        const type =await JewelryStyle.create({name})
        return res.json(type)
    }
    async getAll (req,res){
        const styles = await JewelryStyle.findAll()
        return res.json(styles)
    }
    async getOne (req,res){

    }
    async patch (req,res){

    } 
    async delete (req,res){
        
    }

}
module.exports=new JewelryStyleController()