'use strict';
import React from 'react';
import marked from 'marked';


export default class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">{ this.props.author }</h2>
        <div dangerouslySetInnerHTML={{__html: marked(this.props.text)}} />
      </div>
    );
  }
}