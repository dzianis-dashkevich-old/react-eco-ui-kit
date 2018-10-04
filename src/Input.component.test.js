import React from 'react';
import { shallow, mount } from 'enzyme';

import Input from './Input';

import { DEFAULT_VALUE } from './consts/core';
import { VALID, INVALID, INPUT } from './consts/input';

describe('Input spec', () => {
	it('renders input with default value', () => {
		const wrapper = shallow(<Input />);

		const inputs = wrapper.find('input');
		const props = inputs.props();

		expect(inputs).toHaveLength(1);
		expect(inputs.hasClass(VALID)).toBeTruthy();
		expect(inputs.hasClass(INPUT)).toBeTruthy();
		expect(props['data-valid']).toBeTruthy();
		expect(props.value).toBe(DEFAULT_VALUE);
	});

	it('should call validator, when trigger input change', () => {
		const validator = jest.fn();
		const simulatedValue = 12;
		const wrapper = mount(<Input validator={validator} />);

		const inputs = wrapper.find('input');

		expect(validator).toHaveBeenNthCalledWith(1, DEFAULT_VALUE);

		inputs.simulate('change', { target: { value: simulatedValue } });

		expect(validator).toHaveBeenCalledTimes(2);
		expect(validator).toHaveBeenNthCalledWith(2, simulatedValue);
	});

	it('should call provided handler, if value is not same', () => {
		const onInputChange = jest.fn();
		const simulatedValue = 12;
		const wrapper = mount(<Input onInputChange={onInputChange} />);

		const inputs = wrapper.find('input');

		inputs.simulate('change', { target: { value: simulatedValue } });

		expect(onInputChange).toHaveBeenCalledTimes(1);
		expect(onInputChange).toHaveBeenCalledWith(simulatedValue);
	});

	it('should not call provided handler if values are same', () => {
		const onInputChange = jest.fn();
		const simulatedValue = DEFAULT_VALUE;
		const wrapper = mount(<Input onInputChange={onInputChange} />);

		const inputs = wrapper.find('input');

		inputs.simulate('change', { target: { value: simulatedValue } });

		expect(onInputChange).not.toHaveBeenCalled();
	});

	it('should not call provided handler if validator fails', () => {
		const onInputChange = jest.fn();
		const validator = () => false;
		const simulatedValue = DEFAULT_VALUE;
		const wrapper = mount(<Input onInputChange={onInputChange} validator={validator} />);

		const inputs = wrapper.find('input');

		inputs.simulate('change', { target: { value: simulatedValue } });

		expect(onInputChange).not.toHaveBeenCalled();
	});

	it('should update ui after setState', () => {
		const simulatedValue = 12;
		const wrapper = mount(<Input validator={(val) => val < simulatedValue} />);
		const inputs = wrapper.find('input');

		inputs.simulate('change', { target: { value: simulatedValue } });

		expect(inputs.hasClass(INVALID)).toBeTruthy();
		expect(inputs.hasClass(VALID)).toBeFalsy();
	});

	it('should add className', () => {
		const one = 'one';
		const wrapper = mount(<Input className={one} />);

		expect(wrapper.find('input').hasClass(one));
	});
});
