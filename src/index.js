const express = require('express');
const path = require('path');

const { getByPin, getByUrlId } = require('./helpers/getData');
const formatDate = require('./helpers/formatDate');
const regexes = require('./consts');

const app = express();
const port = process.env.PORT ?? 4000;

app.use('/static', express.static(path.join(__dirname, 'static')));
app.engine('ejs', require('pejs').__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/game', async (req, res) => {
    const id = req.query.id;
    const types = ['urlId', 'pin'];
    const type = types.find((type) => regexes.regexes[type].test(id));
    let data;

    if (type === undefined)
        return res.status(400).json({ error: 'Undefined type' });

    if (type === 'urlId') data = getByUrlId(id);
    else data = getByPin(id);

    data.then(
        (data) => {
            res.render('game', { 
                ...data,
                formatDate
            });
        },
        (err) => {
            res.status(400).json({ error: `${type} is not found` });
        }
    );
});

app.use((req, res, next) => {
    res.status(404).redirect('/');
});

app.listen(port, () => {
    console.log(`Started on  http://localhost:${port}`);
});
