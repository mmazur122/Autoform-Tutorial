/**
 * Created by mmazur on 5/21/15.
 */
Meteor.methods({
    cleanDB: function() {
        Meteor.users.remove({});
        Posts.remove({});
    }
})