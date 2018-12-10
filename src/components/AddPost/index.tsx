import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { createPending } from '../../store/posts/actions';
import styles from './AddPost.scss';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSubmit: () => dispatch(createPending())
});

// @connect(null, mapDispatchToProps)
// @reduxForm({ form: 'addPost' })
const AddPost = ({ handleSubmit }: any) => (
    <div className={styles.root}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Field name='userId' component='input' placeholder='User Id' />
            <Field name='title' component='input' placeholder='Title' />
            <Field name='body' component='textarea' placeholder='Text...' />
            <div className={styles.buttons}>
                <button type='submit'>Send</button>
                <button>Clear</button>
            </div>
        </form>
    </div>
);

// export default AddPost;
export default connect(
    null,
    mapDispatchToProps
)(
    reduxForm({
        form: 'addPost'
    })(AddPost)
);
