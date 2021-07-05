import React, { useEffect, useState } from 'react';
import Comment from "./Comment";
import axios from 'axios';

function CommentsList(props) {
  const [comments, updateComments] = useState([]);

 useEffect(function effectFunction() {
    async function fetchComments() {
      const response = await axios.get('https://fan-theory.herokuapp.com/comments/')
      updateComments(response.data);
    }
    fetchComments();
  }, [comments]);

  function deleteComment(id) {
    axios.delete('https://fan-theory.herokuapp.com/comments/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      comments: this.state.comments.filter(el => el._id !== id)
    })
  }

  function sortByPopularity() {
    comments.sort((a, b) => {
      var votes1 = a.votes
      var votes2 = b.votes
      if (votes1 > votes2) {
        return -1
      } else {
        return 0
      }
    });
    return commentList();
  }  

  function commentList() {
    return comments.map(currentcomment => {
      return currentcomment.post_id === props.post_id ? <Comment comment={currentcomment} deleteComment={deleteComment} key={currentcomment._id} /> : false;
    })
  }  

  return (
    <ul>
      {sortByPopularity()}
    </ul>
  );
}


export default CommentsList;