import React, { Component } from 'react';
import Post from "./Post";
import axios from 'axios';
import { format } from 'date-fns'

class PostsList extends Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/posts/')
      .then(response => {
        this.setState({
          loading: false,
          posts: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePost(id) {
    axios.delete('http://localhost:5000/posts/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      posts: this.state.posts.filter(el => el._id !== id)
    })
  }

  sortByDate() {
    this.state.posts.sort((a, b) => {
      var time1 = format(new Date(a.createdAt), 'MM, dd, yy, hh, mm, ss')
      var time2 = format(new Date(b.createdAt), 'MM, dd, yy, hh, mm, ss')
      if (time1 > time2) {
        return -1
      } else {
        return 0
      }
    });
    return this.postList();
  }

  sortByPopularity() {
    this.state.posts.sort((a, b) => {
      var votes1 = a.votes
      var votes2 = b.votes
      if (votes1 > votes2) {
        return -1
      } else {
        return 0
      }
    });
    return this.postList();
  }

  postList() {
    return this.state.posts.map(currentpost => {
      return currentpost.topic_id === this.props.topic_id || this.props.topic_id === "homepage" ? <Post post={currentpost} deletePost={this.deletePost} key={currentpost._id} /> : false;
    })
  }

  render() {
    if (this.props.sortBy === 'date') {
      return (
        <div>
          {this.sortByDate()}
        </div>
      )
    } else if (this.props.sortBy === 'popularity') {
      return (
        <div>
          {this.sortByPopularity()}
        </div>
      )
    }
  }
}

export default PostsList;