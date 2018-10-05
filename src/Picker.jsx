import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { DEFAULT_VALUE, PICKED, DISABLED, EMPTY } from './consts/core';
import { PICKER } from './consts/picker';

export default class Picker extends Component {
	get value () {
		return this.props.value;
	}

	get disabled () {
		return this.props.disabled;
	}

	get picked () {
		return this.props.picked;
	}

	get className () {
		const { disabled, picked } = this;
		const { className } = this.props;
		const disabledClassName = disabled ? DISABLED : EMPTY;
		const pickedClassName = picked ? PICKED : EMPTY;

		return skipEmptyClassNames([PICKER, disabledClassName, pickedClassName, className]);
	}

	onClick = () => !this.disabled && this.props.onClick(this.value);

	render () {
		return (
			<div
				className={this.className}
				data-disabled={this.disabled}
				data-picked={this.picked}
				onClick={this.onClick}
			>
				{this.value}
			</div>
		);
	}
}

Picker.defaultProps = {
	onClick: noop,
	disabled: false,
	picked: false,
	value: DEFAULT_VALUE,
	className: EMPTY,
};

Picker.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	picked: PropTypes.bool,
	value: PropTypes.any,
	onClick: PropTypes.func,
};
