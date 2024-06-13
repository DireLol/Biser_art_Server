const {Product, ProductInfo} = require('../models/models')
const ApiError =require ('../error/ApiError')
const Uuid = require('uuid')
const path= require('path');

class ProductController{
    async create(req,res,next){
        try {
            const { name, price, jewelryStructureId, productTypeId, beadTypeId, jewelryStyleId, jewelryColorID, info} = req.body;
            const {img} = req.files
            let filename = Uuid.v4()+".jpg"
            img.mv(path.resolve(__dirname, '..','static',filename))

            // Создаем запись продукта в базе данных
            const product = await Product.create({ name, price, jewelryStructureJewelryStructureId: jewelryStructureId, productTypeProductTypeId: productTypeId, beadTypeBeadTypeId: beadTypeId, jewelryStyleJewelryStyleId: jewelryStyleId, jewelryColorJewelryColorID: jewelryColorID, img: filename});
           
            const prodinf = await ProductInfo.create({
                    description: info,
                    productProductId: product.productId
                });
            // Возвращаем созданный продукт в формате JSON
            return res.status(200).json({product,prodinf});
          } 
          catch (error) {
              console.log(error)
            // Обработка ошибок, если они возникают
            next(ApiError.badRequest('Ошибка на стороне сервера'))
          }
    }
    async getAll (req,res){//потом проверить
        try{
            const {name, price, jewelryStructureId, productTypeId, beadTypeId, jewelryStyleId, jewelryColorId, page: reqPage} =req.query    
            // TODO Добавить sort options
            const page = reqPage || 1;
            const limit = 9;
            let offset = page * limit - limit
            let products;
    
            // Создаем объект фильтрации на основе параметров запроса
            const filters = {
                name, 
                price,
                jewelryStructureId,
                productTypeId,
                beadTypeId,
                jewelryStyleId,
                jewelryColorId,
            };
            
            // Удаляем пустые свойства (undefined, null, '')
            const filteredFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null && value !== '')
            );
            
            // Если фильтры пусты
            if (Object.keys(filteredFilters).length === 0) {
                products= await Product.findAndCountAll()
            } else {
                //Если фильтры не пусты
                products= await Product.findAndCountAll({where: filteredFilters, limit, offset});
            }
            const { count } = await Product.findAndCountAll(products);

            return res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                products
            });
        }
        catch(error){
            console.error(error);
            // return next(ApiError.internal('Ошибка на стороне сервера'))
        }
        
    }
    async getNewAndSpecialProducts(req, res, next) {
        try {
            // Получаем последние пять товаров отсортированных по дате создания (createdAt)
            const newProducts = await ProductInfo.findAll({
                attributes:['productInfoId', 'description'],
                include: [{ model: Product, as: 'product', attributes: ['img']}],
                order: [['createdAt', 'DESC']], // Сортируем по убыванию даты создания
                limit: 5 // Ограничиваем результат пятью товарами
            });

            // Возвращаем данные о новых товарах в формате JSON
            return res.status(200).json(newProducts);
        } catch (error) {
            console.error(error);
            // В случае ошибки возвращаем соответствующую ошибку
            next(ApiError.internal('Failed to get new products'));
        }
    }

    
    async getOne (req,res){//потом проверить
        try {
            const productInfoId = req.params.productInfoId
            const productInfo = await ProductInfo.findOne({
                where: { productInfoId },
                include: [{ model: Product, as: 'product' }]
            })
            if (!productInfo) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.status(200).json(productInfo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async patch (req,res,next){
        try{
            const productInfoId = req.params.productInfoId;
            const productId = productInfoId
            const updateFields = req.body;

            const existingProductInfo =await ProductInfo.findByPk(productInfoId);
            const existingProduct =await Product.findByPk(productId);

            if (!existingProduct){
                return next(ApiError.badRequest('Продукт не найден'))
            }
            await existingProductInfo.update(updateFields);
            await existingProduct.update(updateFields);

            return res.status(200).json({existingProduct,existingProductInfo});
        }
        catch(error){
            console.error(error);
            return next(ApiError.internal('Ошибка на стороне сервера'))
        }
    }
    async delete(req,res,next){
        try{
            const productInfoId = req.params.productInfoId;
            const productId = productInfoId
            const existingProductInfo =await ProductInfo.findByPk(productInfoId);
            const existingProduct =await Product.findByPk(productId);
            if (!existingProduct) {
                return next(ApiError.badRequest('Продукт не найден'))
             }
           
            await existingProductInfo.destroy();
            await existingProduct.destroy();
            return res.status(200).json()
        }
       
        catch(error){
            console.error(error);
            return next(ApiError.internal('Ошибка на стороне сервера'))
        }
    }


}
module.exports=new ProductController()