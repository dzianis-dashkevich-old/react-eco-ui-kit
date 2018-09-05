import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';

import { PICKER_DISABLED, PICKER_PICKED, PICKER } from './consts/picker';

export default class Picker extends Component {
	onClick = () => {
		const { onPickerClick, pickerIndex, disabled } = this.props;

		!disabled && onPickerClick(pickerIndex);
	};

	render () {
		const { value, disabled, picked } = this.props;

		const disabledClassName = disabled ? PICKER_DISABLED : '';
		const pickedClassName = picked ? PICKER_PICKED : '';

		const classNames = `${PICKER} ${disabledClassName} ${pickedClassName}`;

		return (
			<div
				style={this._defaultStyle}
				className={classNames}
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
	value: 'def',
};

Picker.propTypes = {
	disabled: PropTypes.bool,
	picked: PropTypes.bool,
	value: PropTypes.any,
	onPickerClick: PropTypes.func,
	pickerIndex: PropTypes.any,
};
