const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantData = require('./models/restaurant')
const app = express()
const port = 3000
const db = mongoose.connection

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))



//餐廳清單首頁
app.get('/', (req, res) => {
    restaurantData
        .find()
        .lean()
        .then(item => res.render('index', { item }))
        .catch(error => console.log(error))
})

//個別餐廳資訊
app.get('/restaurants/:_id', (req, res) => {
    const id = req.params._id
    restaurantData
        .findById(id)
        .lean()
        .then(item => res.render('show', { item }))
        .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurant = restaurants.results.filter((item) => {
        return item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
    })
    res.render('index', { restaurant, keyword })
})


app.listen(port, () => {
    console.log(`success , http:/localhost:${port}`)
})