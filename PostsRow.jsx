PostsRow = React.createClass({
    downVote(){
        Meteor.call("downvotePost", this.props._id)
    },
    upVote(){
        Meteor.call("upvotePost", this.props._id)
    },
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-xs-1 center-votes">
                        <div className="row">
                            <i className="fa fa-arrow-up upvotePost" onClick={this.upVote}></i>
                        </div>
                        <div className="row">
                            {this.props.numDifference}
                        </div>
                        <div className="row">
                            <i className="fa fa-arrow-down downvotePost" onClick={this.downVote}></i>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <div className="row">
                            <a href={"/post/"+this.props._id}>{this.props.title}</a>
                        </div>
                        <div className="row">
                            {this.props.content}
                        </div>
                        <div className="row">
                            <p>Posted by: <strong>{this.props.username}</strong> on {this.props.postedOn.toString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});