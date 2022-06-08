const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
//set up handlebars as the template fo choice
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3002;


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    // replace with actual secret
    secret: 'Super secret secret',
    //parameters for secret
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static() is a built in express middleware function that can take all the contents of a folder and serve them as statis assets
// useful for front end specific files like stylesheets 
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('MVC PORT LISTENING'));
});
