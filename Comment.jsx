Comment = React.createClass({
    //The Comment component will get its data passed down from the Post component through props
    upVote(){
        Meteor.call("upvoteComment", this.props._id);
        //IMPLEMENT USER FILTER TO ALLOW ONLY ONE UP OR DOWN VOTE
    },
    downVote(){
        Meteor.call("downvoteComment", this.props._id)
    },
    render(){

        return (
            <div className="row">
                <div className="col-xs-1 center-votes">
                    <div className="row">
                        <i className="fa fa-arrow-up upvoteComment" onClick={this.upVote}></i>
                    </div>
                    <div className="row">
                        {this.props.numDifference}
                    </div>
                    <div className="row">
                        <i className="fa fa-arrow-down downvoteComment" onClick={this.downVote}></i>
                    </div>
                </div>
                <div className="col-xs-11">
                    <div className="row">
                        <h5>{this.props.content}</h5>
                    </div>
                    <div className="row">
                        <p>Posted by: <strong>{this.props.username}</strong> on {this.props.postedOn.toString()}</p>
                    </div>
                </div>
            </div>
        )
    }
});