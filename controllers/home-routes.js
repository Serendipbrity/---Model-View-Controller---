// PAGE FOR ALL USER FACING ROUTES

const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.sessions);
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
          const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {posts});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('login');
  });

module.exports = router;