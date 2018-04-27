const express = require('express')
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const paths = ['static/svg/fairy_mono.svg', 'static/svg/wyvern_mono.svg', 'static/svg/phoenix_mono.svg', 'static/svg/pegasus_mono.svg']
const targetDate = new Date(2018, 4, 3, 12, 0, 0, 0);
const formLink = 'https://docs.google.com/forms/d/e/1FAIpQLSc_FEjPjmLCQheWiO2zbv7wkeNI1wRitgoGEKi_fWJy8EWD4w/viewform?usp=sf_link';

const port = process.env.PORT || 8080;

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

app.use('/about/*', (cReq, cRes, next) => {
  let now = new Date();
  let unlock = now.getTime() > targetDate.getTime();

  if (!unlock) {
    cRes.redirect('/');
  }

  next();
})

app.set('view engine', 'pug')

app.get('/', (cReq, cRes) => {
  let r = Math.floor(Math.random() * 4)
  let now = new Date();
  let unlock = now.getTime() > targetDate.getTime();
  let link = unlock ? formLink : '';

  cRes.render('index', {svgPath: paths[r], cssPath: 'static/css/main.css', fLink: link, tMillis: targetDate.getTime()})
})

app.get('/about/stuff', (cReq, cRes) => {
  cRes.send('stuff');
})

app.get('/about/yes', (cReq, cRes) => {
  cRes.send('yes');
})

app.get('/*', (cReq, cRes) => {
  cRes.redirect('/')
})

app.listen(port, () => console.log(`Server listening on port ${port}...`))
