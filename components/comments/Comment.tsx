import { Avatar, Comment } from 'antd';
import React, { FC } from 'react';

interface IProps {
  author: React.ReactNode | string;
  content: React.ReactNode | string;
}

const NestedComment: FC<IProps> = ({ children, content, author }) => {
  return (
    <Comment
      actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
      author={author}
      avatar={
        <Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />
      }
      content={content}
    >
      {children}
    </Comment>
  );
};

export default NestedComment;
