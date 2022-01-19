const express = require('express')
const router = express.Router()

const restaurantData = require('../../models/restaurant')


//餐廳清單首頁
router.get('/', (req, res) => {
    restaurantData
        .find()
        .lean()
        .sort({ _id: 'asc' })
        .then(item => res.render('index', { item }))
        .catch(error => console.log(error))
})

//搜尋功能
router.get('/search', (req, res) => {
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

module.exports = router