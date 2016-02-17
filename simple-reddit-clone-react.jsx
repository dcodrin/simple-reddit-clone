if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
    });

}


FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, {content: <App />});
    }
});

FlowRouter.route('/create-post', {
    action() {
        ReactLayout.render(MainLayout, {content: <NewPost />});
    }
});

FlowRouter.route('/post/:_id', {
    action: function (params) {
        ReactLayout.render(MainLayout, {content: <Post _id={params._id}/>});
    }
});


if (Meteor.isServer) {

    Meteor.publish("posts", function () {
        return Posts.find({})
    });
    Meteor.publish("singlePost", function (postId) {
        return Posts.find({_id: postId})
    });
    Meteor.publish("comments", function (postId) {
        return Comments.find({
            postId: postId
        })
    })

}

Meteor.methods({
    newPost: function (title, content) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }
        let data = {
            content: content,
            title: title,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            userVotes: []
        };
        data.userVotes.push(Meteor.userId());
        let postId = Posts.insert(data);
        return postId;
    },
    newComment: function (content, postId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }
        let data = {
            content: content,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            postId: postId,
            userVotes: []
        };
        data.userVotes.push(Meteor.userId());
        let commentId = Comments.insert(data);
        return commentId;
    },
    upvotePost: function (postId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }
        let post = Posts.find({_id: postId}).fetch();
        if (post[0].userVotes.indexOf(Meteor.userId()) > -1) {
            throw new Meteor.Error("doubleVote", "Already voted.");
        }
        Posts.update({_id: postId}, {
            $inc: {
                numUpvotes: 1,
                numDifference: 1
            },
            $push: {
                userVotes: Meteor.userId()
            }
        });
    },
    downvotePost: function (postId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }

        let post = Posts.find({_id: postId}).fetch();
        if (post[0].userVotes.indexOf(Meteor.userId()) > -1) {
            throw new Meteor.Error("doubleVote", "Already voted.");
        }

        Posts.update({_id: postId}, {
            $inc: {
                numDownvotes: 1,
                numDifference: -1
            },
            $push: {
                userVotes: Meteor.userId()
            }
        });
    },
    upvoteComment: function (commentId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }
        let comment = Comments.find({_id: commentId}).fetch();
        if (comment[0].userVotes.indexOf(Meteor.userId()) > -1) {
            throw new Meteor.Error("doubleVote", "Already voted.");
        }
        Comments.update({_id: commentId}, {
            $inc: {
                numUpvotes: 1,
                numDifference: 1
            },
            $push: {
                userVotes: Meteor.userId()
            }
        });
    },
    downvoteComment: function (commentId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }
        let comment = Comments.find({_id: commentId}).fetch();
        if (comment[0].userVotes.indexOf(Meteor.userId()) > -1) {
            throw new Meteor.Error("doubleVote", "Already voted.");
        }
        Comments.update({_id: commentId}, {
            $inc: {
                numDownvotes: 1,
                numDifference: -1
            },
            $push: {
                userVotes: Meteor.userId()
            }
        });
    }
});

Schema = {};


Schema.Post = new SimpleSchema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    userVotes: {
        type: [String]
    },
    owner: {
        type: String
    },
    username: {
        type: String
    },
    postedOn: {
        type: Date,
        autoValue(){
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    numUpvotes: {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 1;
            }
        }
    },
    numDownvotes: {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 0;
            }
        }
    },
    numDifference: {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 1;
            }
        }
    }
});

Schema.Comment = new SimpleSchema({
    postId: {
        type: String
    },
    content: {
        type: String
    },
    userVotes: {
        type: [String]
    },
    owner: {
        type: String
    },
    username: {
        type: String
    },
    postedOn: {
        type: Date,
        autoValue(){
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    numUpvotes: {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 1;
            }
        }
    },
    numDownvotes: {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 0;
            }
        }
    },
    numDifference: {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 1;
            }
        }
    }
});


Posts = new Meteor.Collection("posts");
Comments = new Meteor.Collection("comments");

Posts.attachSchema(Schema.Post);
Comments.attachSchema(Schema.Comment);