AccountsUIWrapper = React.createClass({
    componentDidMount(){
        //Here we are using the Blaze framework to display the login form
        this.view = Blaze.render(Template.loginButtons, React.findDOMNode(this.refs.login));
    },
    componentWillUnmount(){
        // Clean up Blaze view
      Blaze.remove(this.view);
    },
    render(){
        //The span will be filled in with our Blaze login form
        return <span ref="login" />
    }
});


