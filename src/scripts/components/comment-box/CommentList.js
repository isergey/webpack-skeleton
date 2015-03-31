'use strict';
import React from 'react';
import _ from 'lodash';
import Comment from './Comment.js'

export default React.createClass({
  render () {
    var commentIndex = 0;
    var commentNodes = _.map(this.props.comments, function (comment) {
      return (
        <Comment key={commentIndex++} author={comment.author} text={comment.text} />
      );
    });
    return (
      <div className="commentList">
      {commentNodes}
      </div>
    );
  }
})