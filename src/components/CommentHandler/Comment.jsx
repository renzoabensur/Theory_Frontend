import React, { Component } from "react";
import Reply from "../ReplyHandler/CreateReply"
import ReplyList from "../ReplyHandler/ReplyRender"
import axios from 'axios';
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countVotes: this.props.comment.votes
    }
  }

  upClick(e) {
    e.preventDefault();
    this.props.comment.votes += 1
    axios.post('http://localhost:5000/comments/update/' + this.props.comment._id, this.props.comment)
      .then(res => console.log(res.data));
    this.setState({
      countVotes: this.state.countVotes + 1
    })
  }

  downClick(e) {
    e.preventDefault();
    this.props.comment.votes -= 1
    axios.post('http://localhost:5000/comments/update/' + this.props.comment._id, this.props.comment)
      .then(res => console.log(res.data));
    this.setState({
      countVotes: this.state.countVotes - 1
    })
  }

  render() {
    return (
      <div className="comments">
        <div className="row" style={{ height: "30px" }}>
          <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: "1px", marginLeft: "10px" }}>
            <FontAwesomeIcon icon={faUser} /> {this.props.comment.username}
          </h6>
          <p style={{ marginLeft: "10px" }}>{format(new Date(this.props.comment.createdAt), 'MM-dd-yy')}</p>
        </div>
        <h5 className="card-text" style={{ marginLeft: "15px" }}>{this.props.comment.comment}</h5>
        <div className="container-fluid">
          <div className="row comment-div" >
            <div style={{ marginLeft: "13px" }}>
              <button onClick={(e) => this.upClick(e)} className="up-button"><FontAwesomeIcon icon={faArrowUp} /></button>
              {this.state.countVotes}
              <button onClick={(e) => this.downClick(e)} className="down-button"><FontAwesomeIcon icon={faArrowDown} /></button>
              {/* <a href={"/edit/" + this.props.comment._id}>edit</a>
              <button onClick={() => { this.props.deleteComment(this.props.comment._id) }}>delete</button> */}
            </div>
            <Reply comment_id={this.props.comment._id} />
          </div>
          <ReplyList comment_id={this.props.comment._id} />
        </div>
      </div>
    )
  }
}

export default Comment;
