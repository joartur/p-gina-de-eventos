const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const conn = require('./db/conn');
const Event = require('./models/Event');
const eventsRoutes = require('./routes/eventsRoutes');
const Handlebars = require('handlebars');
const moment = require('moment');
require('moment/locale/pt-br'); 

const dateString = '2024-09-13 21:00:00';
const formattedDate = moment(dateString, 'YYYY-MM-DD HH:mm:ss').format('D [de] MMMM [de] YYYY [ás] HH:mm');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/events', eventsRoutes);

moment.locale('pt-br');

// FUNÇÃO DE FORMATAR DATA EM PT-BR
Handlebars.registerHelper('formatDate', function(dateString) {
  const date = moment(dateString);
  return `${date.format('DD')} de ${date.format('MMMM')} de ${date.format('YYYY')}`;
});

// FUNÇÃO DE FORMATAR HORA EM PT-BR
Handlebars.registerHelper('formatTime', function(timeString) {
  const time = moment(timeString, 'HH:mm');
  return `${time.format('HH:mm')}`;
});

// FUNÇÃO DE FORMATAR DATA CARDS
Handlebars.registerHelper('formatDateCustom', function(dateString) {
  const date = moment(dateString);
  const dayOfWeek = date.format('ddd').toLowerCase(); // DIA DA SEMANA (sex)
  const day = date.format('DD'); // DIA DO MÊS (13)
  const month = date.format('MMM').toUpperCase(); // MÊS (SET)

  return new Handlebars.SafeString(
      `<span class="day-of-week">${dayOfWeek}</span><br>` +
      `<span class="day">${day}</span><br>` +
      `<span class="month">${month}</span>`
  );
});

// FUNÇÃO DE LIMITAR CARACTERES
Handlebars.registerHelper('truncate', function(str, len) {
  if (str.length > len) {
    return str.substring(0, len) + '...';
  } else {
    return str;
  }
});

app.get('/', (req, res) => {
  res.render('events/all');
});

conn.sync().then(() => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});