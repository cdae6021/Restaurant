const mongoose = require('mongoose')
const restaurantJSON = require('../restaurant.json')
const Restaurant = require('../restaurant')
const db = mongoose.connection
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < restaurantJSON.results.length; i++) {
        Restaurant.create({
            id: `${restaurantJSON.results[i].id}`,
            name: `${restaurantJSON.results[i].name}`,
            name_en: `${restaurantJSON.results[i].name_en}`,
            category: `${restaurantJSON.results[i].category}`,
            image: `${restaurantJSON.results[i].image}`,
            location: `${restaurantJSON.results[i].location}`,
            phone: `${restaurantJSON.results[i].phone}`,
            google_map: `${restaurantJSON.results[i].google_map}`,
            rating: `${restaurantJSON.results[i].rating}`,
            description: `${restaurantJSON.results[i].description}`
        })
    }
    console.log('complete!')
})