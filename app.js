const express = require('express');
const hbs = require('hbs');
const path = require('path');
const products = require('./products.json');
const PORT = process.env.PORT || 5000;

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

const items = products.items.map(item => {
  const {
    sys: { id },
    fields: {
      title,
      price,
      image: {
        fields: {
          file: { image },
        },
      },
    },
  } = item;
  // const image = item.image.fields.file.image;
  return { id, title, price, image };
});
const item1 = items[0];
const item2 = items[1];
const item3 = items[2];
//Home
app.get('/home', (req, res, next) => {
  // console.log(' req', req.url);
  console.log('items', item1);
  res.render('home', { title: 'Home', item1, item2, item3 });
});
//Collections
app.get('/collections', (req, res, next) => {
  // console.log(' req', items);
  //   console.log('items', items);
  res.render('collection', { title: 'Collections', items });
});
//About
app.get('/about', (req, res, next) => {
  // console.log(' req', req.url);
  //   console.log('items', items);
  res.render('about', { title: 'About', items });
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
