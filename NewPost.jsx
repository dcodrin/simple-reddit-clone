NewPost = React.createClass({
    handleSubmit(e){

        if(!Meteor.userId()){
            throw new Meteor.Error("unauthorised", "Unauthorised");
        }

        e.preventDefault();
        let content = React.findDOMNode(this.refs.postContent).value.trim();
        let title = React.findDOMNode(this.refs.postTitle).value.trim();

        let data = {
            content: content,
            title: title,
            owner: Meteor.userId(),
            username: Meteor.user().username
        };

        Meteor.call("newPost", title, content);

        React.findDOMNode(this.refs.postContent).value= "";
        React.findDOMNode(this.refs.postTitle).value= "";

        FlowRouter.go("/")
    },
    render(){
        return (
            <form action="" className="newPost" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="form-group">
                        <div className="col-xs-6">
                            <input ref="postTitle" type="text" className="form-control" name="title" placeholder="Title"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <textarea ref="postContent" name="content" className="form-control" rows="5" placeholder="Post content..."></textarea>
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