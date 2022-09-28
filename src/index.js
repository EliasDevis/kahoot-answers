const express = require('express')
const path = require('path')
const getData = require('./helpers/getData')

const app = express()
const port = 4000

app.use('/static', express.static(path.join(__dirname, 'static')))
app.engine('ejs', require('pejs').__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/game', async (req, res) => {
    const pinOrId = req.query.id
    const isPin = pinOrId.match(/[0-9]{8}/)
    const data = await getData(pinOrId, isPin).catch(err => console.log(err))

    if (data === undefined) return res.send('Something wrong')

    res.render('game', data)
})
  
app.listen(port, () => {
    console.log(`Started on  http://localhost:${port}`)
})