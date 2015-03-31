'use strict';
import React from 'react';
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default React.createClass({
  render () {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
})