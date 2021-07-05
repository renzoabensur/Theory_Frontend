import React, { useEffect, useState } from 'react';
import Reply from "./Reply";
import axios from 'axios';

function ReplyList(props) {
  const [replys, updateReplys] = useState([]);

 useEffect(function effectFunction() {
    async function fetchReplys() {
      const response = await axios.get('http://localhost:5000/replys/')
      updateReplys(response.data);
    }
    fetchReplys();
  }, [replys]);

  function deleteComment(id) {
    axios.delete('http://localhost:5000/replys/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      replys: this.state.replys.filter(el => el._id !== id)
    })
  }

  function sortByPopularity() {
    replys.sort((a, b) => {
      var votes1 = a.votes
      var votes2 = b.votes
      if (votes1 > votes2) {
        return -1
      } else {
        return 0
      }
    });
    return replyList();
  }  

  function replyList() {
    return replys.map(currentreply => {
      return currentreply.comment_id === props.comment_id ? <Reply reply={currentreply} deleteComment={deleteComment} key={currentreply._id} /> : false;
    })
  }  

  return (
    <ul>
      {sortByPopularity()}
    </ul>
  );
}

export default ReplyList;