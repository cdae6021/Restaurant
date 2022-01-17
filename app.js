const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
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


app.get('/', (req, res) => {
    res.render('index', { restaurant: restaurants.results })
})

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.results.find(item => {
        return item.id.toString() === req.params.id
    })
    res.render('show', { restaurant })
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