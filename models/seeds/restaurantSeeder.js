const db = require('../../config/mongoose')

db.once('open', () => {
    console.log('mongodb connected!')
    Restaurant.create(restaurantJSON)
        .then(() => {
            console.log('done!')
            db.close()
        })
})