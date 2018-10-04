import React from 'react';
import { shallow } from 'enzyme';

import Delimeter from './Delimeter';

import { DELIMETER, DEFAULT_DELIMETER } from './consts/delimeter';

describe('Delimeter spec', () => {
	it('renders with default values', () => {
		const wrapper = shallow(<Delimeter />);

		const span = wrapper.find('span');

		expect(span).toHaveLength(1);
		expect(span.hasClass(DELIMETER)).toBeTruthy();
		expect(span.contains(DEFAULT_DELIMETER)).toBeTruthy();
	});

	it('should set className', () => {
		const two = 'two';
		const wrapper = shallow(<Delimeter className={two} />);

		expect(wrapper.find('span').hasClass(two)).toBeTruthy();
	});

	it('should set value', () => {
		const value = '______';
		const wrapper = shallow(<Delimeter value={value} />);

		expect(wrapper.find('span').contains(value)).toBeTruthy();
	});
});
