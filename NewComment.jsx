NewComment = React.createClass({
    handleSubmit(e){

        if(!Meteor.userId()){
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }

        e.preventDefault();
        let content = React.findDOMNode(this.refs.commentContent).value.trim();

        Meteor.call("newComment", content, this.props.postId);

        React.findDOMNode(this.refs.commentContent).value= "";
    },
    render(){
        return (
            <form action="" className="newComment" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-6">
                        <textarea ref="commentContent" name="content" className="form-control" rows="5" placeholder="Post comment..."></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-3">
                        <button type="submit" className="btn btn-primary addPost">Submit</button>
                    </div>
                </div>
            </form>
        )
    }
});