Post = React.createClass({
    //This mixin gives us access to getMeteorData()
    mixins: [ReactMeteorData],
    //Load comments from the Comments collection, they are stored in this.data.comments
    getMeteorData(){
        var data = {};
        let comments = Meteor.subscribe("comments", this.props._id);
        let handle = Meteor.subscribe("singlePost", this.props._id);
        if(handle.ready()){
            data.post = Posts.find({_id: this.props._id}).fetch();
            data.user = Meteor.userId();
            data.comments = Comments.find({postId: this.props._id}, {sort: {numDifference: -1}}).fetch();
        }
        return data
    },
    renderComments(){
        return this.data.comments.map((comment)=> {
            return <Comment key={comment._id} {...comment}/>;
        });
    },
    downVote(){
        Meteor.call("downvotePost", this.props._id)
    },
    upVote(){
        Meteor.call("upvotePost", this.props._id)
    },
    render(){
        if (!this.data.post) {return <div>loading</div>};
        return (
            <div>
                <div className="row">
                    <div className="col-xs-1 center-votes">
                        <div className="row">
                            <i className="fa fa-arrow-up upvotePost" onClick={this.upVote}></i>
                        </div>
                        <div className="row">
                            {this.data.post[0].numDifference}
                        </div>
                        <div className="row">
                            <i className="fa fa-arrow-down downvotePost" onClick={this.downVote}></i>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <div className="row">
                            <a href={"/post/" + this.props._id}>{this.data.post[0].title}</a>
                        </div>
                        <div className="row">
                            {this.data.post[0].content}
                        </div>
                        <div className="row">
                            <p>Posted by: <strong>{this.data.post[0].username}</strong> on {this.data.post[0].postedOn.toString()}</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h4>Here be comments</h4>
                    <div className="row">
                        <ul>
                            {this.renderComments()}
                        </ul>
                        {this.data.user ? <NewComment  postId={this.props._id}/> : <p>Please login to comment.</p>}
                    </div>
                </div>
            </div>
        )
    }
});