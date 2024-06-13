const {ProductType} = require('../models/models')
const ApiError =require ('../error/ApiError')


class ProductTypeController{
    async create(req,res){
        // const {name} =req.body
        // const type =await Type.create({name})
        // return res.json(type)
// Потом по хорошему реализовать
    }
    async getAll (req,res){
        const types = await ProductType.findAll()
        return res.json(types)
    }
    async getOne (req,res){
        const productTypeId = req.params.productTypeId;
        const productType = await ProductType.findOne(productTypeId)
        if (!productType) {
            return res.status(404).json({ error: 'Product type not found' });
        }
        return res.status(200).json(productType);
    }
    async patch (req,res){

    } 
    async delete (req,res){

    }

}
module.exports=new ProductTypeController()