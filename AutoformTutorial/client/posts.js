Template.posts.helpers({
    posts: function(){
        return Posts.find();
    }
});

Template.posts.rendered = function() {
    console.log("rendered posts");
};

Template.posts.events({
    "click .next": function() {
        Router.go("/next");
    },
    "click .insert": function() {
        console.log("insert button was clicked");
        $("input[data-schema-key='tags']").val("test");
    }
});