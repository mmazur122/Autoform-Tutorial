Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', function() {
    console.log("going to /");
    this.render('posts');
});
Router.route('/posts/:_id', function () {
    var item = Posts.findOne({_id: this.params._id});
    this.render('post', {data: item});
}, {
    name: 'post.show'
});

Router.route('/next', 'nextPage', {
    name: 'nextPage'
});