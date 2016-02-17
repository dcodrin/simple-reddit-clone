//Our main component
App = React.createClass({
    //This mixin gives us access to getMeteorData()
    mixins: [ReactMeteorData],
    //Load posts from the Posts collection, they are stored in this.data.posts
    getMeteorData(){
        Meteor.subscribe("posts");
        return {
            posts: Posts.find({}, {
                sort: {
                    numDifference: -1
                }
            }).fetch()
        };
    },
    renderPosts(){
        //Return an array of posts using the getPosts() function
        return this.data.posts.map((post)=> {
            return <PostsRow key={post._id} {...post}/>;
        });
    },
    render(){
        return (
            <div>
                <div className="container">
                    <header>
                        <h1>Here be posts</h1>
                    </header>
                    <ul>
                        {this.renderPosts()}
                    </ul>
                </div>
            </div>
        )
    }
});