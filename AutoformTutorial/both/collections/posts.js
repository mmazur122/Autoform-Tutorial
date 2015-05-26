/**
 * Created by mmazur on 5/18/15.
 */
Posts = new Mongo.Collection("posts");
Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200,
        optional: true,
    },
    //titleHistory: {
    //    type: [Object],
    //    optional: true,
    //    autoValue: function() {
    //        var content = this.field("title");
    //        if (content.isSet) {
    //            if (this.isInsert) {
    //                return [{
    //                    date: new Date,
    //                    changedBy: Meteor.userId(),
    //                    oldContent: content.value,
    //                    field: "title"
    //                }];
    //            } else {
    //                return {
    //                    $push: {
    //                        date: new Date,
    //                        changedBy: Meteor.userId(),
    //                        oldContent: content.value,
    //                        field: "title",
    //                    }
    //                };
    //            }
    //        } else {
    //            this.unset();
    //        }
    //    }
    //},
    //'titleHistory.$.date': {
    //    type: Date,
    //    optional: true,
    //},
    //'titleHistory.$.changedBy': {
    //    type: String,
    //    optional: true,
    //},
    //'titleHistory.$.oldContent': {
    //    type: String,
    //    optional: true
    //},
    //'titleHistory.$.field': {
    //    type: String,
    //    optional: true
    //},
    content: {
        type: String,
        label: "Content",
        optional: true,
    },
    updateContentHistory: {
        type: [Object],
        optional: true,
        autoValue: function() {
            var content = this.field("content");
            if (content.isSet) {
                if (this.isInsert) {
                    return [{
                        date: new Date,
                        changedBy: Meteor.userId(),
                        oldContent: content.value,
                        field: "content"
                    }];
                } else {
                    return {
                        $push: {
                            date: new Date,
                            changedBy: Meteor.userId(),
                            oldContent: content.value,
                            field: "content",
                        }
                    };
                }
            } else {
                this.unset();
            }
        }
    },
    'updateContentHistory.$.date': {
        type: Date,
        optional: true,
    },
    'updateContentHistory.$.changedBy': {
        type: String,
        optional: true,
    },
    'updateContentHistory.$.oldContent': {
        type: String,
        optional: true
    },
    'updateContentHistory.$.field': {
        type: String,
        optional: true
    },
    category: {
        type: String,
        label: "Category",
        allowedValues: ['business', 'health', 'finance'],
        autoform: {
            options: [
                {label: "Business", value: "business"},
                {label: "Health", value: "health"},
                {label: "Finance", value: "finance"}
            ]
        },
        optional: true,
    },
    userId: {
        type: String,
        label: "Title"
    },
    tags: {
        type: [String],
        label: "Tags",
        optional: true,
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }

        }
    },
    owner: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            } else if (this.isUpsert) {
                return {$setOnInsert: Meteor.userId()};
            } else {
                this.unset();
            }
        }
    },

}));


Posts.allow({
    insert: function(userId, doc){
        return doc && doc.userId === userId;
    },
    update: function(userId, doc){
        //return doc && doc.userId === userId;
        return doc;
    }
});

