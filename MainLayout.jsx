MainLayout = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        return {
            currentUser: Meteor.userId()
        }
    },
    render(){
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">Reddit Clone</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {Meteor.userId() ? <li><a href="/create-post">Create Post</a></li> : ""}
                                <li><a><AccountsUIWrapper /></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <main>
                        {this.props.content}
                    </main>
                </div>
            </div>
        )
    }
});