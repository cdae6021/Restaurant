const express = require('express')
const router = express.Router()

const restaurantData = require('../../models/restaurant')


//餐廳清單首頁
router.get('/', (req, res) => {
    restaurantData
        .find()
        .lean()
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

//排序功能
router.post('/sort', (req, res) => {
    const sort = req.body.sort
    let sortSelect = {}

    if (Number(sort) === 1) {
        sortSelect = { name: "asc" }
    } else if (Number(sort) === 2) {
        sortSelect = { name: "desc" }
    } else if (Number(sort) === 3) {
        sortSelect = { category: "asc" }
    } else if (Number(sort) === 4) {
        sortSelect = { location: "asc" }
    } else {
        sortSelect = { _id: "asc" }
    }

    restaurantData
        .find()
        .lean()
        .sort(sortSelect)
        .then(item => res.render('index', { item, sort }))
        .catch(error => console.log(error))
})


module.exports = router