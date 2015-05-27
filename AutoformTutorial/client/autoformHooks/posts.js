var postHooks = {
    before: {
        insert: function(doc) {
            if(Meteor.userId()){
                doc.userId = Meteor.userId();
            }
            var date = new Date();
            doc.dateOfSubmission = date;
            console.log("inside before insert hook");
            console.log("form with dateOfSubmission: ", doc);
            return doc;

        },
    },
    beginSubmit: function() {
        console.log("inside onsubmit: ", new Date());
    }
};

AutoForm.addHooks('insertPostForm', postHooks);