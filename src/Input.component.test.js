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
		const wrapper = mount(<Input />);

		let inputs = wrapper.find('input');

		expect(wrapper.state().value).toBe(DEFAULT_VALUE);
		expect(inputs.props().value).toBe(DEFAULT_VALUE);

		wrapper.setState({ value: simulatedValue, isValid: false });

		//TODO simulate event instead of setState trigger, to check ui changes, 
		//after enzime fix track state change issue
		// inputs.simulate('change', { target: { value: simulatedValue } });

		inputs = wrapper.find('input');

		expect(inputs.props().value).toBe(simulatedValue);
		expect(inputs.hasClass(INVALID)).toBeTruthy();
		expect(inputs.hasClass(VALID)).toBeFalsy();
	});

	it('should add className', () => {
		const one = 'one';
		const wrapper = mount(<Input className={one} />);

		expect(wrapper.find('input').hasClass(one));
	});

	it('should call setState when change received', () => {
		const simulatedValue = 12;
		const wrapper = mount(<Input />);
		const inputs = wrapper.find('input');

		const mockSetState = jest.fn();

		wrapper.instance().setState = mockSetState;

		inputs.simulate('change', { target: { value: simulatedValue } });

		expect(mockSetState).toHaveBeenCalledTimes(2);
		expect(mockSetState).toHaveBeenNthCalledWith(1, { value: simulatedValue });
		expect(mockSetState).toHaveBeenNthCalledWith(2, { isValid: true });

		const nextValue = 13;

		wrapper.instance().componentDidUpdate({ value: nextValue });

		expect(mockSetState).toHaveBeenNthCalledWith(3, { value: nextValue });
	});

	it('should not call setState if value equeals', () => {
		const value = 13;
		const wrapper = mount(<Input />);

		const mockSetState = jest.fn();

		wrapper.instance().state.value = value;
		wrapper.instance().setState = mockSetState;

		wrapper.instance().componentDidUpdate({ value });

		expect(mockSetState).not.toHaveBeenCalledWith({ value });
	});
});
