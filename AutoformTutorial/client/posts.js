Template.posts.helpers({
    posts: function(){
        return Posts.find();
    }
})

Template.posts.events({
    "click .next": function() {
        Router.go("/next");
    }
});