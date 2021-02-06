var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let stock = {};
  let fetchRes = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo");
  let json = await fetchRes.json();
  console.log(json);

  stock.price = json['Global Quote']['05. price'];
  stock.volume = json['Global Quote']['06. volume'];

  console.log(stock);
  res.end(JSON.stringify(stock));

  //res.render('index', { title: `value` });
});

module.exports = router;
