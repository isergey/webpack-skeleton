'use strict';
import $ from 'jquery';
import React from 'react';
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default React.createClass({
  getInitialState() {
    return {
      comments: []
    };
  },
  loadCommentsFromServer() {
    $.get('/data/comments/list.json').done((comments)=> {
      this.setState({
        comments: comments
      });
    }).error((error)=> {
      console.log(error);
    });
  },
  componentDidMount() {
    this.loadCommentsFromServer();
  },
  onCommentSubmit(comment) {
    console.log(comm);
    var comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments: comments
    });
  },
  render() {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList comments={this.state.comments}/>
        <CommentForm onCommentSubmit={this.onCommentSubmit}/>
      </div>
    );
  }
})