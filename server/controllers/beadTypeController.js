const {BeadType} = require('../models/models')

class BeadTypeController{
    async create(req,res){
        const {name} =req.body
        const type =await BeadType.create({name})
        return res.json(type)
    }
    async getAll (req,res){
        const types = await BeadType.findAll()
        return res.json(types)
    }
    async getOne(req,res){
        
    }
    async patch (req,res){

    }
    async delete (req,res){
        
    }
    

}
module.exports=new BeadTypeController()