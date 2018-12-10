import { shallow } from 'enzyme';
import React from 'react';
import App from '../../src/components/App';

describe('App', () => {
    const props = {};

    const component = shallow(<App {...props} />);

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });
});
