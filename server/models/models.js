
const sequelize = require('../db')
const{DataTypes, DATE}=require('sequelize')

const User = sequelize.define('user', {
    userId:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    username:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    email:{type: DataTypes.STRING, unique:true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},//Примечание: вынесено в файл миграции
    activationLink: {type: DataTypes.STRING}//Примечание: вынесено в файл миграции
})
const Permission = sequelize.define('permission',{
    permissionId:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    permissionName:{type:DataTypes.STRING, allowNull:false, defaultValue:"GUEST"}
})
const Cart = sequelize.define('cart', {
    cartId:{type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true}
})
const Order = sequelize.define('order', {
    orderid:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    comment:{type: DataTypes.STRING},
    orderStatus:{type: DataTypes.BOOLEAN,defaultValue:true},
    totalCost:{type: DataTypes.DECIMAL, allowNull:false}
})
const Product = sequelize.define('product', {
    productId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true,allowNull:false},
    img:{type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.DECIMAL,allowNull:false}
})
const ProductInfo = sequelize.define('productInfo', {
    productInfoId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    description: {type: DataTypes.STRING}
})
const BeadType = sequelize.define('beadType',{
    beadTypeId:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true },
    name: {type: DataTypes.STRING,unique:true}
})
const JewelryStyle = sequelize.define('jewelryStyle',{
    jewelryStyleId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING,unique:true}
})
const JewelryColor = sequelize.define('jewelryColor', {
    jewelryColorID:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name: {type: DataTypes.STRING,unique:true}
}) 
const JewelryStructure = sequelize.define('jewelryStructure', {
    jewelryStructureId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name: {type: DataTypes.STRING,unique:true}
}) 
const JewelrySize = sequelize.define('jevelrySize',{
    jevelrySizeId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
})
const FigurineSize = sequelize.define('figurineSize',{
    figurineSizeId:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING,allowNull:false}
})
const RingSize = sequelize.define('ringSize',{
    ringSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size: {type: DataTypes.STRING, allowNull:false}
})
const CharmSize =sequelize.define('charmSize',{
    charmSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
})
const EarringSize =sequelize.define('earingSize',{
    earringSizeId:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
})
const BroochSize =sequelize.define('broochSize',{
    broochSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
})
const BraceletSize =sequelize.define('braceletSize',{
    braceletSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
})
const ProductType =sequelize.define('productType',{
    productTypeId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, allowNull:false}
})
const ProductSize =sequelize.define('productSize',{
    productSizeId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})
const Address = sequelize.define('address',{
    addressId:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    streetHouseApartment:{type:DataTypes.STRING, allowNull: false},
    city:{type:DataTypes.STRING,allowNull: false},
    firstNameLastNameMiddleName:{type: DataTypes.STRING, allowNull:false},
    phone:{type:DataTypes.STRING,allowNull: false},
    mailIndex:{type: DataTypes.INTEGER,allowNull: false}
})

// Модель CartProduct - промежуточная таблица. 
// Таблица элементов корзины: в этой таблице хранятся продукты, которые пользователь добавил в свою корзину, связывая корзину покупок с каталогом продуктов и отслеживая количество, выбранное для каждого элемента.
const CartProduct = sequelize.define('cartProduct', {
    cartProductId: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull:false}
})

// Модель OrderProduct - промежуточная таблица. Таблица позиций заказа: в этой таблице записаны продукты, включенные в каждый заказ, так же их количество и стоимость.
const OrderProduct = sequelize.define('orderProduct', {
    orderProductId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, allowNull:false },
    cost:{type: DataTypes.DECIMAL, allowNull:false}
});

//Примечание: вынесено в файл миграции
const Token = sequelize.define('token', {
    idToken: {type: DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false },
    deviceInfo: {type: DataTypes.STRING, allowNull:false},
});

User.hasMany(Token);
Token.belongsTo(User);

// Определение связей между моделями
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Cart.belongsToMany(Product, { through: CartProduct })
Product.belongsToMany(Cart, { through: CartProduct })

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Address)
Address.belongsTo(User)

Permission.hasMany(User)
User.belongsTo(Permission)

User.hasMany(Order)
Order.belongsTo(User)

JewelryStructure.hasMany(Product)
Product.belongsTo(JewelryStructure)

BeadType.hasMany(Product)
Product.belongsTo(BeadType)

JewelryStyle.hasMany(Product)
Product.belongsTo(JewelryStyle)

JewelryColor.hasMany(Product)
Product.belongsTo(JewelryColor)

ProductType.hasMany(Product)
Product.belongsTo(ProductType)

ProductType.hasMany(ProductSize)
ProductSize.belongsTo(ProductType)


JewelrySize.hasMany(ProductSize)
ProductSize.belongsTo(JewelrySize)
FigurineSize.hasMany(ProductSize)
ProductSize.belongsTo(FigurineSize)
RingSize.hasMany(ProductSize)
ProductSize.belongsTo(RingSize)
CharmSize.hasMany(ProductSize)
ProductSize.belongsTo(CharmSize)
EarringSize.hasMany(ProductSize)
ProductSize.belongsTo(EarringSize)
BroochSize.hasMany(ProductSize)
ProductSize.belongsTo(BroochSize)
BraceletSize.hasMany(ProductSize)
ProductSize.belongsTo(BraceletSize)

module.exports ={
    User,
    Permission,
    Cart,
    Order,
    Product,
    BeadType,
    JewelryStyle,
    JewelryColor,
    JewelryStructure,
    ProductType,
    JewelrySize,
    FigurineSize,
    RingSize,
    CharmSize,
    EarringSize,
    BraceletSize,
    BroochSize,
    Address,
    CartProduct,
    OrderProduct,
    ProductInfo,
    ProductSize,
    Token

}
