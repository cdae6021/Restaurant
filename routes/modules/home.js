const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurant')


router.get('/', (req, res) => {
    const keyword = !req.query.keyword ? '' : req.query.keyword.trim()
    const sort = req.query.sort
    let sortSelect = {}

    switch (sort) {

        case '1':
            sortSelect = { name: 'asc' }
            break;
        case '2':
            sortSelect = { name: 'desc' }
            break;
        case '3':
            sortSelect = { category: 'desc' }
            break;
        case '4':
            sortSelect = { location: 'desc' }
            break;
        default:
            sortSelect = { _id: 'asc' }
    }

    restaurantData
        .find({ $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }] })
        .sort(sortSelect)
        .lean()
        .then(item => {
            res.render('index', { item, keyword })
        })
        .catch(error => {
            console.log(error)
            res.render('errorPage', { status: 500, error: error.message })
        })
})

module.exports = router