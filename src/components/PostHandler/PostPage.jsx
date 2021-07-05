import React, { Component } from 'react';
import { auth } from "../Firebase/firebase"
import axios from 'axios';
import { Modal } from 'react-bootstrap'
// import { format } from 'date-fns'
import Comments from '../CommentHandler/CreateComment'

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: [],
      show: true
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          username: user.displayName
        });
      }
    })
    axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          post: response.data,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleClose = () => {
    window.location = "/" + this.state.post.topic_id;
    this.setState({ show: false })
  }

  render() {
    return (
      <div>
        <Modal dialogClassName="modal-size" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header style={{ borderBottomWidth: "0px", backgroundColor: "#333" }} closeButton>
            <div className="container">
              <h2 className="postpage-title" style={{ color: "aliceblue" }}>{this.state.post.title}</h2>
            </div>
            {/* <a href={"/" + this.state.post.topic_id} className="close-modal">X Close</a> */}
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f5f3f4" }} >

            <div className="container-fluid">
              <div className="row">
                <div className="col-11">
                  <div className="card modal-card">
                    <div className="body-card">
                      <h3>{this.state.post.title}</h3>
                      <p className="card-text">{this.state.post.description}</p>
                      <h6 className="card-subtitle mb-2 text-muted">{this.state.post.username}  </h6>
                      {/* <h6 className="card-subtitle mb-2 text-muted">{format(new Date(this.state.post.createdAt), 'MM-dd-yy')}  </h6> */}
                      {/* <p className="card-text"><a href={"/edit/" + this.state.post._id}>edit</a> | <a href="" onClick={() => { this.state.deletePost(this.state.post._id) }}>delete</a></p> */}
                    </div>
                    <hr />
                    <Comments post_title={this.state.post.title} post_id={this.props.match.params.id} />
                  </div>
                </div>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer style={{ borderTopWidth: "0px", backgroundColor: "#333" }}>
            {/* <a href={"/" + this.state.post.topic_id} className="close-modal">X Close</a> */}
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}