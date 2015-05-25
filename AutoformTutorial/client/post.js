/**
 * Created by mmazur on 5/22/15.
 */
Template.post.helpers({
    updateContentHistory: function() {
        var _post = Posts.findOne({_id: this._id});
        if (_post) {
            return _post.updateContentHistory;
        }
    }

});
