import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { DEFAULT_VALUE, EMPTY, DISABLED } from './consts/core';
import { CONTROL } from './consts/controls';

export default class Control extends Component {
	get value () {
		return this.props.value;
	}

	get disabled () {
		return this.props.disabled;
	}

	get className () {
		const { disabled } = this;
		const { className } = this.props;
		const disabledClassName = disabled ? DISABLED : EMPTY;

		return skipEmptyClassNames([CONTROL, disabledClassName, className]);
	}

	onClick = () => !this.disabled && this.props.onClick(this.value);

	render () {
		return (
			<div
				className={this.className}
				data-disabled={this.disabled}
				onClick={this.onClick}
			>
				{this.value}
			</div>
		);
	}
}

Control.defaultProps = {
	onClick: noop,
	disabled: false,
	value: DEFAULT_VALUE,
	className: EMPTY,
};

Control.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.any,
	onClick: PropTypes.func,
};
