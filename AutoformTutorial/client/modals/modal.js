/**
 * Created by mmazur on 5/26/15.
 */
Template.modal.created = function() {
    console.log("inside modal created");

};

Template.modal.events({
    'click tr': function(event) {
        //console.log("event.target: ", event.target);
    }
})