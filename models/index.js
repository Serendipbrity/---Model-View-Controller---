// import User model 
const User = require('./User');
//import post model
const Post = require('./Post');
//import Comment model
const Comment = require('./Comment');

// create association
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// export an object with User model as property
module.exports = { User, Post, Comment };