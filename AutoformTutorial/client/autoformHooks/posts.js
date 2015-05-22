var postHooks = {
    before: {
        insert: function(doc) {
            if(Meteor.userId()){
                doc.userId = Meteor.userId();
            }
            var date = new Date();
            doc.dateOfSubmission = date;
            console.log("form with dateOfSubmission: ", doc);
            return doc;

        }
    }
};

AutoForm.addHooks('insertPostForm', postHooks);