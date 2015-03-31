'use strict';
import React from 'react';
import CommentBox from './components/comment-box/CommentBox';
import summ from './commons-use';

console.log(summ);


React.render(
  <CommentBox />,
  document.getElementById('app')
);

