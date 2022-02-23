const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

//express template engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static file
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantList.results})
})

//Query String搜尋
app.get('/search', (req, res) =>{
  
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', {restaurants: restaurants, keyword: req.query.keyword })
})


//show頁面
app.get('/restaurants/:restaurant_id', (req, res) => {
  
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant: restaurant[0] })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})