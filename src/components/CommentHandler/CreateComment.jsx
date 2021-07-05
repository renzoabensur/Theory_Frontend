import React, { Component } from 'react';
import { auth } from "../Firebase/firebase"
import CommentsList from "./CommentRender";
import axios from 'axios';
import SignInPage from '../SignHandler/SignIn/SignIn'

class Comments extends Component {
    constructor(props) {
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            comment: '',
            post_title: this.props.post_title,
            post_id: this.props.post_id,
            votes: 0,
            LogedUser: "",
            show: false,
        }
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    username: user.displayName,
                    post_title: this.props.post_title,
                    post_id: this.props.post_id
                });
            }
        })
    }

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        })
    }

    onSubmit(e) {
        const comment = {
            username: this.state.username,
            comment: this.state.comment.charAt(0).toUpperCase() + this.state.comment.slice(1),
            post_title: this.state.post_title,
            post_id: this.state.post_id,
            votes: 0,
            show: false
        }

        console.log(comment);

        axios.post('https://fan-theory.herokuapp.com/comments/add', comment)
            .then(res => console.log(res.data));
        this.setState({
            comment: ""
        })
        e.preventDefault();
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    showModal = () => {
        this.setState({ show: true })
    }

    render() {
        axios.get('https://fan-theory.herokuapp.com/user/status').then((res) => {
            this.setState({ LogedUser: res.data })
        });
        return (
            <div >
                {this.state.LogedUser === "login" ?
                    <form onSubmit={this.onSubmit} id="postform">
                        <div className="form-group comments-form">
                            <label>Comment as {this.state.username}: </label>
                            <textarea placeholder="Write something.." type="text" style={{ height: "150px" }}
                                required
                                className="form-control"
                                value={this.state.comment}
                                onChange={this.onChangeComment}
                            />
                        </div>
                        <button type="submit" form="postform" value="submit" className="comment-button" disabled={!this.state.comment}>
                            Comment
                    </button>
                    </form>
                    : <div className="container col-12" style={{ marginLeft: "650px" }} >
                        <p className="">Login to leave a comment</p>
                        <button onClick={this.showModal} className="login-button" >Login</button>
                        <SignInPage show={this.state.show} handleClose={this.handleClose} />
                    </div>
                }
                <hr />

                <CommentsList post_id={this.state.post_id} />
            </div>
        )
    }
}

export default Comments;