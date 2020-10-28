const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const homeCourses = require('./routes/courses')
const cardRoutes = require('./routes/card')


const app = express()

const hbs = exhbs.create({
    defaultLayout : 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
})

app.engine('hbs' , hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use('/',homeRoutes)
app.use('/courses',homeCourses)
app.use('/add',addRoutes)
app.use('/card',cardRoutes)




const PORT = process.env.PORT || 3000

async function start() {

    try {
        const url = 'mongodb+srv://gorovakiman:UcB0jLJYxKuhu9Vl@cluster0.igfhi.mongodb.net/shop'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

