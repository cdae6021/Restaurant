const express = require('express')
const router = express.Router()

const restaurantData = require('../../models/restaurant')

//新增餐廳
router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/new', (req, res) => {
    return restaurantData
        .create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error)
            res.render('errorPage', { status: 500, error: err.message })
        })
})


//個別餐廳資訊
router.get('/:_id', (req, res) => {
    const id = req.params._id
    restaurantData
        .findById(id)
        .lean()
        .then(item => res.render('show', { item }))
        .catch(error => {
            console.log(error)
            res.render('errorPage', { status: 500, error: err.message })
        })
})


//編輯功能
router.get('/:_id/edit', (req, res) => {
    const id = req.params._id
    restaurantData
        .findById(id)
        .lean()
        .then(item => res.render('edit', { item }))
        .catch(error => {
            console.log(error)
            res.render('errorPage', { status: 500, error: err.message })
        })
})


router.put('/:_id', (req, res) => {
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
        .catch(error => {
            console.log(error)
            res.render('errorPage', { status: 500, error: err.message })
        })
})


//刪除餐廳
router.delete('/:_id/', (req, res) => {
    const id = req.params._id
    restaurantData
        .findById(id)
        .then(item => item.remove())
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error)
            res.render('errorPage', { status: 500, error: err.message })
        })
})

module.exports = router