import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop, identity } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { DEFAULT_VALUE, EMPTY } from './consts/core';
import { VALID, INVALID, INPUT } from './consts/input';

export default class Input extends Component {
	constructor (props) {
		super(props);

		const { value, validator } = this.props;
		const isValid = Boolean(validator(value));
		this.state = { isValid };
	}

	onChange = ({ target }) => {
		const { validator, onChange, value } = this.props;

		let isValid = false;

		const receivedValue = target.value;

		if (validator(receivedValue)) {
			isValid = true;

			if (value == receivedValue) {
				return;
			}

			onChange(receivedValue);
		}

		this.setState({ isValid });
	};

	render () {
		const { className, value } = this.props;
		const { isValid } = this.state;

		const validClassName = isValid ? VALID : INVALID;

		return (
			<input
				className={skipEmptyClassNames([INPUT, validClassName, className])}
				data-valid={isValid}
				onChange={this.onChange}
				value={value}
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
