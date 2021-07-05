import React, { Component } from "react";
import { format } from 'date-fns'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countVotes: this.props.post.votes
    }
  }

  upClick(e) {
    // e.preventDefault();
    this.props.post.votes += 1
    axios.post('http://localhost:5000/posts/update/' + this.props.post._id, this.props.post)
      .then(res => console.log(res.data));
    console.log(this.props.post._id)
    this.setState({
      countVotes: this.state.countVotes + 1
    })
  }

  downClick(e) {
    // e.preventDefault();
    this.props.post.votes -= 1
    axios.post('http://localhost:5000/posts/update/' + this.props.post._id, this.props.post)
      .then(res => console.log(res.data));
    this.setState({
      countVotes: this.state.countVotes - 1
    })
  }

  render() {
    console.log(this.props.post)
    return (
      <div className="card card-style">
        <div className="row" style={{ margin: "15px 10px", height: "10px" }}>
          <div>
            <button onClick={(e) => this.upClick(e)} className="up-button" style={{ margin: "1px" }}><FontAwesomeIcon icon={faArrowUp} /></button>
            {this.state.countVotes}
            <button onClick={(e) => this.downClick(e)} className="down-button" style={{ margin: "1px" }}><FontAwesomeIcon icon={faArrowDown} /></button>
          </div>
          <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: "1px", marginLeft: "10px" }}>
            <FontAwesomeIcon icon={faUser} /> {this.props.post.username}
          </h6>
          <p style={{ marginLeft: "10px" }}>{format(new Date(this.props.post.createdAt), 'MM-dd-yy')}</p>
          <p style={{ marginLeft: "auto" }}>{this.props.post.topic_id.charAt(0).toUpperCase() + this.props.post.topic_id.slice(1)}</p>
        </div>
        <a href={"/postpage/" + this.props.post._id} className="card-link card-body" style={{ paddingTop: "0px" }}>
          <div className="body-card">
            <h5 className="card-title">{this.props.post.title}</h5>
            <p className="card-text">{this.props.post.description}</p>
            {/* <a href={"/edit/" + this.props.comment._id}>edit</a>
        <button onClick={() => { this.props.deleteComment(this.props.comment._id) }}>delete</button> */}
            {/* <p className="card-text"><Link to={"/edit/" + props.post._id}>edit</Link> | <a href="" onClick={() => { props.deletePost(props.post._id) }}>delete</a></p> */}
          </div>
        </a>
      </div>
    );
  }
}

export default Post;
