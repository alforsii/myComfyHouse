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

app.get('/', (req, res, next) => {
  console.log(' req', req.url);
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
  //   console.log('items', items);
  res.render('index', { title: 'Home', items });
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
