const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverrride = require('method-override')

const restaurantData = require('./models/restaurant')
const routes = require('./routes/index')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverrride('_method'))

app.use(routes)

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

//搜尋功能
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase().trim()
    restaurantData
        .find()
        .lean()
        .then(item => {
            const keywordFilter = item.filter(item => item.name.includes(keyword) || item.category.includes(keyword))
            res.render('index', { item: keywordFilter, keyword })
        })
        .catch(error => console.log(error))
})

//編輯功能
app.get('/restaurants/:_id/edit', (req, res) => {
    const id = req.params._id
    restaurantData
        .findById(id)
        .lean()
        .then(item => res.render('edit', { item }))
        .catch(error => console.log(error))
})

app.put('/restaurants/:_id', (req, res) => {
    const id = req.params._id
    restaurantData
        .findById(id)
        .then(item => {
            item.category = req.body.category
            item.location = req.body.location
            item.phone = req.body.phone
            item.description = req.body.description
            return item.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

//新增餐廳
app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/new', (req, res) => {
    return restaurantData
        .create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//刪除餐廳
app.delete('/restaurants/:_id/', (req, res) => {
    const id = req.params._id
    restaurantData
        .findById(id)
        .then(item => item.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`success , http:/localhost:${port}`)
})