require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const cors =require('cors')
const router = require('./routes/index')
const errorHandler=require('./middleware/ErrorHandingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const session = require('express-session'); 
const app = express()


const PORT =process.env.PORT|| 5000;
// Настройка сессий
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//cors нужен чтобы мы могли отправлять запросы с браузера
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
}))

app.use(cookieParser());//куки

// наше приложение app должно уметь парсить JSON -- middleware для обработки JSON в теле запроса
app.use(express.json())

app.use(express.static(path.resolve(__dirname,'static')))

//для работы с файлами
app.use(fileUpload({}))



//первое это параметр, по которому роутер должен обрабатываться, а вторым параметром передаем роутер
app.use('/api', router)

//middleware всегда идет вконце, если он регистрирует ошибки
app.use(errorHandler)




// //Первый параметр это Url по которому этот запрос обрабатывается, второй--коллбек, который принимает своими параметрами запрос и ответ(request, response)
// app.get('/',(req,res) =>{
// res.status(200).json({message: 'Working!'})//Возвращаем на клиент статус код 200, который готорит нам что все работает
// })



const start = async ()=>{
    try{
        //устанавливаем подключение к БД
        await sequelize.authenticate()

        //Сверяет состояние базы данных со схемой БД
        await sequelize.sync()

        app.listen(PORT, ()=> console.log(`Сервер работает на порте ${PORT}`))
    }
    catch(e){
        console.log(e)

    }
}

start()