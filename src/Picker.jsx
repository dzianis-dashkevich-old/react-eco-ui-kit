import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';

import { DEFAULT_VALUE, EMPTY } from './consts/core';
import { PICKER_DISABLED, PICKER_PICKED, PICKER } from './consts/picker';

export default class Picker extends Component {
	onClick = () => {
		const { onPickerClick, disabled, value } = this.props;

		!disabled && onPickerClick(value);
	};

	render () {
		const { value, disabled, picked, className } = this.props;

		const disabledClassName = disabled ? PICKER_DISABLED : EMPTY;
		const pickedClassName = picked ? PICKER_PICKED : EMPTY;

		const pickerClassName = `${PICKER} ${disabledClassName} ${pickedClassName} ${className}`;

		return (
			<div
				className={pickerClassName}
				data-disabled={disabled}
				data-picked={picked}
				onClick={ this.onClick }
			>
				{ value }
			</div>
		);
	}
}

Picker.defaultProps = {
	onPickerClick: noop,
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
	onPickerClick: PropTypes.func,
};
