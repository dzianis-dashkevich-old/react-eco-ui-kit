import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop, identity } from './utils/functional';

import { DEFAULT_VALUE, EMPTY } from './consts/core';
import { VALID, INVALID, INPUT } from './consts/input';

export default class Input extends Component {
	constructor (props) {
		super(props);

		const { value, validator } = this.props;

		const isValid = Boolean(validator(value));

		this.state = { isValid, value };
	}

	componentDidUpdate ({ value }) {
		this.state.value !== value && this.setState({ value });
	}

	onInputchange = ({ target }) => {
		const { validator, onInputChange, value } = this.props;

		let isValid = false;

		const receivedValue = target.value;

		if (validator(receivedValue)) {
			isValid = true;

			if (value == receivedValue) {
				return;
			}

			onInputChange(receivedValue);
			this.setState({ value: receivedValue });
		}

		this.setState({ isValid });
	};

	render () {
		const { className } = this.props;
		const { value, isValid } = this.state;

		const validClassName = isValid ? VALID : INVALID;
		const inputClassName = `${INPUT} ${validClassName} ${className}`;

		return (
			<input
				className={inputClassName}
				data-valid={isValid}
				onChange={this.onInputchange}
				value={value}
			/>)
	}
}

Input.defaultProps = {
	onInputChange: noop,
	validator: identity,
	className: EMPTY,
	value: DEFAULT_VALUE,
};

Input.propTypes = {
	className: PropTypes.string,
	validator: PropTypes.func,
	onInputChange: PropTypes.func,
	value: PropTypes.any,
};
