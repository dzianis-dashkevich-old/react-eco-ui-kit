import React from 'react';
import { shallow, mount } from 'enzyme';

import Input from './Input';
import Picker from './Picker';
import Delimeter from './Delimeter';
import Paginator from './Paginator';

import { PAGINATOR, DEFAULT_AMOUNT_PICKERS_TO_SHOW } from './consts/paginator';

describe('Paginator specs', () => {
	it('renders pickers and input with default values', () => {
		const amount = 190;
		const labelsCount = 2;
		const controlsCount = 2;
		const allPickers = labelsCount + controlsCount + DEFAULT_AMOUNT_PICKERS_TO_SHOW;
		const wrapper = mount(<Paginator amount={amount} />);
		const divs = wrapper.find('div');

		console.log(wrapper.html());

		expect(wrapper.find(Input)).toHaveLength(1);
		expect(wrapper.find(Delimeter)).toHaveLength(1);
		expect(wrapper.find(Picker)).toHaveLength(allPickers);
		expect(divs.first().hasClass(PAGINATOR)).toBeTruthy();
	});

	// it('disable parts, when disable provided', () => {
	// 	const amount = 120;
	// 	const wrapper = shallow(<Paginator amount={amount} enableControls={false} />);

	// 	expect(wrapper.find())
	// })
});