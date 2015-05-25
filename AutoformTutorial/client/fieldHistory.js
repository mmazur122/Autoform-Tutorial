Template.fieldHistory.helpers({
    fieldName: function() {
        return this.fieldName;
    }
});
Template.fieldHistory.events({
    'click a': function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        console.log("Event target: ", event.target);
        var _documentOpts = {
            _id: _getDocumentId(),
            field: "content",
            newValue: event.target.textContent
        };
        console.log("_documentOpts ", _documentOpts);
        console.log("event ", event);
        console.log(" this ", this);
        updateDocumentIn("Posts", _documentOpts);

    }
});


function updateDocumentIn(collection, documentOpts) {
    var _mongoCollection = getMongoCollection(collection);

    if (_mongoCollection) {
        var _setObject = {
            $set: {
            }
        };

        _setObject.$set[documentOpts.field] = documentOpts.newValue;
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

function _getDocumentId() {
    return Template.parentData(2)._id;
}