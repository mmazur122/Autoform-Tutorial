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
        var _arrName = event.target.name + "History";
        var _historyArr = Template.parentData(0)[_arrName];
        if (_historyArr) {

            var lastEditTimeStampMilliseconds = moment(_historyArr[_historyArr.length-1].date).valueOf();
            var eventTimeStampMilliseconds = event.timeStamp;

            if (eventTimeStampMilliseconds - lastEditTimeStampMilliseconds < 10000) {
                var _lastEdit = _historyArr[_historyArr.length-1];
                _lastEdit.oldContent = event.target.value;
                _lastEdit.changedBy = Meteor.userId();
                _historyArr[_historyArr.length-1] = _lastEdit;
            } else {
                var _newEdit = {};
                _newEdit.field = _historyArr[_historyArr.length-1].field;
                _newEdit.changedBy = Meteor.userId();
                _newEdit.oldContent = event.target.value;
                _newEdit.date = new Date(eventTimeStampMilliseconds);

                _historyArr.push(_newEdit);
            }

            var _documentOpts = {
                _id: _getDocumentId(0),
                field: _getFieldToUpdate(0, _arrName),
                newValue: event.target.value,
                arrName: _historyArr,
                name: _arrName
            };

            updateDocumentIn("Posts", _documentOpts);
        }
    }
});

function updateDocumentIn(collection, documentOpts) {
    var _mongoCollection = getMongoCollection(collection);

    if (_mongoCollection) {
        var _setObject = {
            $set: {}
        };

        _setObject.$set[documentOpts.field] = documentOpts.newValue;
        _setObject.$set[documentOpts.name] = documentOpts.arrName;
        _mongoCollection.update({_id: documentOpts._id}, _setObject);
    }
}

function getMongoCollection(string) {
    var _mongoCollection = undefined;
    for (var globalObject in this) {
        if (this[globalObject] instanceof Meteor.Collection) {
            if (globalObject === string) {
                _mongoCollection = (this[globalObject]);
                break;
            }
        }
    }
    return _mongoCollection;
}

function _getDocumentId(number) {
    return Template.parentData(number)._id;
}

function _getFieldToUpdate(number, arrName) {
    return Template.parentData(number)[arrName][0].field;
}