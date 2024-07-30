const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const conn = require('./db/conn');
const Event = require('./models/Event');
const eventsRoutes = require('./routes/eventsRoutes');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/events', eventsRoutes);

app.get('/', (req, res) => {
  res.render('events/all');
});

conn.sync().then(() => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});