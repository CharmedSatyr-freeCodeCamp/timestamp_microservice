const express = require('express');
const app = express();
const moment = require('moment');
const parseFormat = require('moment-parseformat');
//const pug = require('pug'); //Uninstalled

const port = process.argv[2] || 3000;

//app.set('view engine', 'pug');
//app.set('views', './index.pug');
//const compiledFunction = pug.compileFile('index.pug');


app.get('/:time', function(req, res) {
    console.log('Listening on port ' + port);
    if (req.method !== 'GET') {
        res.send(404 + '\n"Send me a GET!"');
    }
    res.set('Content-Type', 'application/json');

    const t = req.params.time;

    //Fallback
    let time = {
        unix: null,
        natural: null
    }

    //Unix time handler
    //Check to see if t is numbers only & a valid Unix timestamp in seconds
    let nums = /^[0-9]+$/g;
    if (t.match(nums) && moment(t, 'X').isValid()) {
        time = {
            unix: t + ' seconds',
            natural: moment.unix(t).format("dddd, MMMM Do, YYYY, h:mm:ss a")
        }
    }

    //Natural time handler
    //If it's not all numbers but moment-parser can parse it, we can proceed
    const format = parseFormat(t).toString();

    if (!t.match(nums) && moment(t, format).format() !== 'Invalid date') {
        time = {
            unix: moment(t, format).format('X'),
            natural: moment(t, format).format('dddd, MMMM Do, YYYY, h:mm:ss a')
        }
    }
//pug.renderFile('index.pug', {time: time});
//    res.render('index', {time: JSON.stringify(time)});
    res.send(time);

});
app.listen(port);
