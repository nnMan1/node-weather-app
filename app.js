const path = require('path')
const express = require('express')
const hbs = require('hbs')
const querystring = require('querystring');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3001

const db = require('./config/database')
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Err: ' + err))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('', (req, res) => {
    let sirina = 42.77524;
    let duzina = 19.42383;
    let zoom = 9;
    if (req.query.sirina !== undefined) sirina = req.query.sirina
    if (req.query.duzina !== undefined) duzina = req.query.duzina
    if (req.query.zoom !== undefined) zoom = req.query.zoom

    res.render('index', {
        title: 'Elektro sistem',
        sirina: sirina,
        duzina: duzina,
        zoom: zoom,
        name: 'Dosljak Velibor'
    })
})

app.get('/api/stub*', require('./routes/api/stubovi'));
app.post('/api/stub', require('./routes/api/stubovi'));
app.delete('/api/stub', require('./routes/api/stubovi'));
app.get('/stub*', require('./routes/web/stubovi'));

app.get('/api/stanje*', require('./routes/api/stanja'));
app.post('/api/stanje', require('./routes/api/stanja'));

app.get('/api/trafostanica*', require('./routes/api/trafostanice'));
app.post('/api/trafostanica', require('./routes/api/trafostanice'));
app.get('/trafostanica*', require('./routes/web/trafostanice'));

app.get('/api/potrosac*', require('./routes/api/potrosaci'));
app.post('/api/potrosac', require('./routes/api/potrosaci'));
app.get('/potrosac*', require('./routes/web/potrosaci'));

app.get('/api/tip_voda*', require('./routes/api/tipoviVoda'));
app.post('/api/tip_voda', require('./routes/api/tipoviVoda'));

app.get('/api/vod*', require('./routes/api/vodovi'));
app.post('/api/vod', require('./routes/api/vodovi'));
app.get('/vod*', require('./routes/web/vodovi'));


// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide an address!'
//         })
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Andrew Mead',
//         errorMessage: 'Help article not found.'
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Velibor Dosljak',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})