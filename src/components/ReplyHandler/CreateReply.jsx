import React, { Component } from "react";
import { auth } from "../Firebase/firebase"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'

class Reply extends Component {
    constructor() {
        super();

        this.replyClick = this.replyClick.bind(this)
        this.onChangeReply = this.onChangeReply.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            reply: '',
            comment_id: '',
            votes: 0,
            showReply: false
        }
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    username: user.displayName,
                    comment_id: this.props.comment_id
                });
            }
        })
    }

    replyClick(e) {
        this.setState({
            showReply: !this.state.showReply
        })
    }

    onChangeReply(e) {
        this.setState({
            reply: e.target.value
        })
    }

    onSubmit(e) {
        const reply = {
            username: this.state.username,
            reply: this.state.reply.charAt(0).toUpperCase() + this.state.reply.slice(1),
            comment_id: this.props.comment_id,
            votes: 0
        }
        axios.post('https://fan-theory.herokuapp.com/replys/add', reply)
            .then(res => console.log(res.data));
        this.setState({
                reply: ""
            })
        e.preventDefault();
    }

    render() {
        return this.state.showReply ?
            <div className="col-9 reply-container">
                <div><button className="reply-button" onClick={this.replyClick}>
                    <FontAwesomeIcon icon={faReply} /> Reply
                </button></div>
                <form onSubmit={this.onSubmit} id="replyform">
                    <div className="form-group reply-form" style={{ marginBottom: "0px" }}>
                        <textarea placeholder="Write something.."
                            type="text"
                            required
                            className="reply-form"
                            value={this.state.reply}
                            onChange={this.onChangeReply}
                        />
                    </div>
                    <button type="submit" form="replyform" value="submit" className="reply" disabled={!this.state.reply}>
                        Reply
                    </button>
                </form>
            </div> : <div className="col-9"><button className="reply-button" onClick={this.replyClick}>
                <FontAwesomeIcon icon={faReply} /> Reply
            </button></div>
    }
}

export default Reply