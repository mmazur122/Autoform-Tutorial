Template.fieldHistory.created = function () {
    console.log("inside template.fieldhistory.created");
}

Template.fieldHistory.helpers({
    fieldName: function() {
        return this.fieldName;
    },
    updateContentHistory: function() {
        return this;
    },

});
Template.fieldHistory.events({
    //'click a': function(event) {
    //    event.preventDefault();
    //    event.stopImmediatePropagation();
    //
    //    console.log("Event target: ", event.target);
    //    var _documentOpts = {
    //        _id: _getDocumentId(),
    //        field: "content",
    //        //field: this.fieldName,
    //        newValue: event.target.textContent
    //    };
    //    console.log("_documentOpts ", _documentOpts);
    //    console.log("event ", event);
    //    console.log(" this ", this);
    //    updateDocumentIn("Posts", _documentOpts);
    //
    //},

    'click tr': function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        console.log("Event target: ", event.target);
        var _documentOpts = {
            _id: _getDocumentId(1),
            field: _getFieldToUpdate(0),
            //field: this.fieldName,
            newValue: event.target.parentNode.children[0].textContent
        };
        console.log("_documentOpts ", _documentOpts);
        console.log("event ", event);
        console.log(" this ", this);
        updateDocumentIn("Posts", _documentOpts);
        $("button#dismissModal").click();
    }
});


function updateDocumentIn(collection, documentOpts) {
    var _mongoCollection = getMongoCollection(collection);

    if (_mongoCollection) {
        var _setObject = {
            $set: {}
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

function _getDocumentId(number) {
    return Template.parentData(number)._id;
}

function _getFieldToUpdate(number) {
    return Template.parentData(number).historyContext[0].field;
}