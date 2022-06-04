// PAGE FOR ALL USER FACING ROUTES

const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        post_url: 'https://handlebarsjs.com/guide/',
        title: 'Handlebars Docs',
        created_at: new Date(),
        post_count: 10,
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    }); 
});

module.exports = router;