import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop, identity } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { DEFAULT_VALUE, EMPTY } from './consts/core';
import { VALID, INVALID, INPUT } from './consts/input';

export default class Input extends Component {
	state = { isValid: this.validate(this.value) };

	get value () {
		return this.props.value;
	}

	get isValid () {
		return this.state.isValid;
	}

	get className () {
		const { className } = this.props;
		const validClassName = this.isValid ? VALID : INVALID;

		return skipEmptyClassNames([INPUT, validClassName, className])
	}

	validate (value) {
		return Boolean(this.props.validator(value));
	}

	onChange = ({ target }) => {
		const { onChange } = this.props;

		let isValid = false;

		const receivedValue = target.value;

		if (this.validate(receivedValue)) {
			isValid = true;

			if (this.value == receivedValue) {
				return;
			}
		}

		this.setState({ isValid });
		onChange(receivedValue);
	};

	render () {
		return (
			<input
				className={this.className}
				data-valid={this.isValid}
				onChange={this.onChange}
				value={this.value}
			/>)
	}
}

Input.defaultProps = {
	onChange: noop,
	validator: identity,
	className: EMPTY,
	value: DEFAULT_VALUE,
};

Input.propTypes = {
	className: PropTypes.string,
	validator: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.any,
};
