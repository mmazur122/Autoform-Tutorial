/**
 * Created by mmazur on 5/22/15.
 */
Template.post.helpers({
    posts: function() {
        return Posts.find({_id: this._id});
    },
    //not working
    content: function() {
        return Posts.find({}, {fields: {'updateContentHistory': 1}});
    }

});

Template.post.events({
    'click a': function(event) {
        console.log("Event target: ", event.target);
    }
})