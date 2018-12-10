import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Post from '../../components/Post';
import { IApplicationState, IConnectedReduxProps } from '../../store';
import { fetchPending } from '../../store/posts/actions';
import { IPost } from '../../store/posts/types';

interface IPropsFromState {
    loading: boolean;
    data: IPost[];
    errors?: string;
}

interface IPropsFromDispatch {
    fetchPosts: typeof fetchPending;
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps;

class Home extends React.PureComponent<AllProps> {
    public componentDidMount(): void {
        this.props.fetchPosts();
    }

    public render(): React.ReactNode {
        const posts = this.props.data.map(post => <Post key={post.id} post={post} />);
        return <React.Fragment>{posts}</React.Fragment>;
    }
}

const mapStateToProps = ({ posts }: IApplicationState) => ({
    data: posts.data,
    error: posts.error,
    loading: posts.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchPosts: () => dispatch(fetchPending())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
