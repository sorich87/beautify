var express = require('express')
  , app = express()
  , ratchet = require('ratchetio');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.post('/', function (req, res) {
  var beautiful
    , source = req.body.source
    , lang = req.body.lang;

  if (!source || !lang) {
    res.send(400);
    return;
  }

  beautiful = require('./beautify-' + lang)(source, {
      'indent_char': "\t"
    , 'indent_size': 1
    , 'max_char': 0
    , 'unformatted': [
        'a', 'abbr', 'b', 'cite', 'code', 'del', 'dfn', 'command', 'em', 'font'
      , 'i', 'img', 'input', 'ins', 'kbd', 'mark', 'meter', 'q', 'small'
      , 'source', 'span', 'strong', 'sub', 'sup', 'time', 'var']
  });

  res.set('Content-Type', 'text/plain');
  res.send(beautiful);
});

app.all('*', function (req, res) {
  res.send('');
});

if (process.env.RATCHET_TOKEN) {
  app.use(ratchet.errorHandler(process.env.RATCHET_TOKEN));
}

app.listen(process.env.VCAP_APP_PORT || 3000);

module.exports = app;
