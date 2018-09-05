import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';
import { basicNumberValidator } from './utils/input';

export default class Input extends Component {
	constructor (props) {
		super(props);

		const { currentIndex } = this.props;

		this.state = { isValid: true, value: currentIndex }
	}

	componentWillReceiveProps ({ currentIndex }) {
		this.setState({ value: currentIndex });
	}

	onInputchange = ({ target }) => {
		const { validator, maxValue, onInputChange, currentIndex } = this.props;
		const { value } = target;

		let isValid = false;

		if (validator(value, maxValue)) {
			isValid = true;

			const casted = Number(value);
			const needdToCallChange = currentIndex !== casted;

			needdToCallChange && onInputChange(casted);
		}

		this.setState({ isValid, value });
	};

	render () {
		const { value } = this.state;

		return (
			<input
				onChange={this.onInputchange}
				value={value}
			/>)
	}
}

Input.defaultProps = {
	onInputChange: noop,
	validator: basicNumberValidator,
};

Input.propTypes = {
	maxValue: PropTypes.number,
	validator: PropTypes.func,
	onInputChange: PropTypes.func,
	currentIndex: PropTypes.any,
};
