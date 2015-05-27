/**
 * Created by mmazur on 5/22/15.
 */
Template.post.helpers({
    contentHistory: function() {
        var _post = Posts.findOne({_id: this._id});
        return _post && _post.contentHistory;
    },
});

Template.post.events({
    'form change': function(event) {
        console.log("inside form change event: ", event.target);
    },
    'keyup': function(event) {
        console.log("inside keyup");
        var arrName = event.target.name + "History";
        var historyArr = Template.parentData(0)[arrName];
        if (historyArr) {

            var lastEditTimeStampMilliseconds = moment(historyArr[historyArr.length-1].date).valueOf();
            var eventTimeStampMilliseconds = event.timeStamp;

            if (eventTimeStampMilliseconds - lastEditTimeStampMilliseconds < 10000) {
                var lastEdit = historyArr[historyArr.length-1];
                lastEdit.oldContent = event.target.value;
                lastEdit.changedBy = Meteor.userId();
                historyArr[historyArr.length-1] = lastEdit;
            } else {
                console.log("more than 10 seconds passed");
                var newEdit = {};
                newEdit.field = historyArr[historyArr.length-1].field;
                newEdit.changedBy = Meteor.userId();
                newEdit.oldContent = event.target.value;
                newEdit.date = new Date(eventTimeStampMilliseconds);
                //lastEdit.oldContent = event.target.value;
                historyArr.push(newEdit);
            }

            var _documentOpts = {
                _id: Template.parentData(0)._id,
                field: Template.parentData(0)[arrName][0].field,
                //field: this.fieldName,
                newValue: event.target.value,
                arrName: historyArr
            };

            var _setObject = {
                $set: {}
            };

            _setObject.$set[_documentOpts.field] = _documentOpts.newValue;
            _setObject.$set[arrName] = _documentOpts.arrName;

            Posts.update({_id: _documentOpts._id}, _setObject);
            console.log("inside keyup event");
            console.log("event: ", event, "                ", event.target);
            //console.log("Parent data: ", Template.parentData(0));
        }
    }
})