const express = require('express')
const router = express.Router()

const restaurantData = require('../../models/restaurant')


router.get('/', (req, res) => {
    const keyword = req.query.keyword
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
        .then(item => {
            if (!keyword) {
                res.render('index', { item, sort })
            } else {
                const keywordFilter = item.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase().trim()) || item.category.includes(keyword.toLowerCase().trim())) res.render('index', { item: keywordFilter, keyword, sort })
            }
        }).catch(error => {
            console.log(error)
            res.render('errorPage', { status: 500, error: err.message })
        })
})

module.exports = router