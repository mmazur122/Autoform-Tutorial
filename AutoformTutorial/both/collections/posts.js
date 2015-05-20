/**
 * Created by mmazur on 5/18/15.
 */
Posts = new Mongo.Collection("posts");
Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    content: {
        type: String,
        label: "Content",
        optional: true,
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
    }
}));


Posts.allow({
    insert: function(userId, doc){
        return doc && doc.userId === userId;
    },
    update: function(userId, doc){
        return doc && doc.userId === userId;
    }
});