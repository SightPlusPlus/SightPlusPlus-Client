import React from 'react';
import { mount, shallow } from 'enzyme';
import ObjectAddition from '../components/objectAddition';
import '../Page.css';
import renderer from 'react-test-renderer';

it('ObjectAddition renders without crashing', () => {
    shallow(<ObjectAddition />);
});

