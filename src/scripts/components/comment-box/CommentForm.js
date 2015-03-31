'use strict';
import React from 'react';
import $ from 'jquery';


export default React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    var authorRef = React.findDOMNode(this.refs.author);
    var textRef = React.findDOMNode(this.refs.text);
    this.props.onCommentSubmit({
      author: authorRef.value.trim(),
      text: textRef.value.trim()
    });
    authorRef.value = '';
    textRef.value = '';
  },
  render () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div><input type="text" ref="author" placeholder="Your name" /></div>
        <div><input type="text" ref="text" placeholder="Say something..." /></div>
        <div><input type="submit" value="Post" /></div>
      </form>
    );
  }
})