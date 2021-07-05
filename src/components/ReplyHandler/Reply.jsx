import React, { Component } from "react";
import axios from 'axios';
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'


class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countVotes: this.props.reply.votes
    }
  }

  upClick(e) {
    e.preventDefault();
    this.props.reply.votes += 1
    axios.post('https://fan-theory.herokuapp.com/replys/update/' + this.props.reply._id, this.props.reply)
      .then(res => console.log(res.data));
      console.log(this.props.reply._id)
    this.setState({
      countVotes: this.state.countVotes + 1
    })
  }

  downClick(e) {
    e.preventDefault();
    this.props.reply.votes -= 1
    axios.post('https://fan-theory.herokuapp.com/replys/update/' + this.props.reply._id, this.props.reply)
      .then(res => console.log(res.data));
    this.setState({
      countVotes: this.state.countVotes - 1
    })
  }

  render() {
    return (
      <div style={{ marginLeft: "20px" }}>
        <div className="row" style={{ height: "30px" }}>
          <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: "1px" }}>
            <FontAwesomeIcon icon={faUser} /> {this.props.reply.username}
          </h6>
          <p style={{ marginLeft: "10px" }}>{format(new Date(this.props.reply.createdAt), 'MM-dd-yy')}</p>
        </div>
        <h5 className="card-text" style={{ marginLeft: "5px" }}>{this.props.reply.reply}</h5>
        <div className="container-fluid">
          <div className="row reply-div" >
            <div className="col-3" style={{ paddingLeft: "3px" }}>
              <button onClick={(e) => this.upClick(e)} className="up-button"><FontAwesomeIcon icon={faArrowUp} /></button>
              {this.state.countVotes}
              <button onClick={(e) => this.downClick(e)} className="down-button"><FontAwesomeIcon icon={faArrowDown} /></button>
              {/* <a href={"/edit/" + this.props.reply._id}>edit</a>
              <button onClick={() => { this.props.deleteComment(this.props.reply._id) }}>delete</button> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Reply;
