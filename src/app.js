const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather',
        name: 'Aman'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: "Aman"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        des: "This is help page",
        title: 'Help',
        name: "Aman"
    }) 
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
           return  res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error })
            }
    
    
            res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
          })
    })
    
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404page',{
        title: '404 help',
        name: 'Aman',
        data: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        title: '404',
        name: 'Aman',
        data: 'My 404 page'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up at port 3000')
})