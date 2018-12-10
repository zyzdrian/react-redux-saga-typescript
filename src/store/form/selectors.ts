import { IApplicationState } from '..';

export const selectAddPostData = (state: IApplicationState) => state.form.addPost.values;
