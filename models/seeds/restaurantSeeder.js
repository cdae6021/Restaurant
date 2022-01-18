const mongoose = require('mongoose')
const restaurantJSON = require('../restaurant.json').results
const Restaurant = require('../restaurant')

const db = mongoose.connection
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
    Restaurant.create(restaurantJSON)
        .then(() => {
            console.log('done!')
            db.close()
        })
})