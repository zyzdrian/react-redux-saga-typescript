import React from 'react';
import { IPost } from '../../store/posts/types';
import styles from './Post.scss';

interface IPostProps {
    post: IPost;
}

const Post = ({ post: { title, userId, body } }: IPostProps) => (
    <div className={styles.root}>
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>{userId}</div>
        <div className={styles.body}>{body}</div>
    </div>
);

export default Post;
