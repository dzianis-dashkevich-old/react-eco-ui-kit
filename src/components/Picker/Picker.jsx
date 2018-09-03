import React, { Component } from 'react';

import { PICKER_DEFAUL_PROP_TYPES, PICKER_PROP_TYPES_ALL } from './propTypes';
import { PICKER_DISABLED, PICKER_PICKED, PICKER } from './consts';

export default class Picker extends Component {
	static defaultProps = PICKER_DEFAUL_PROP_TYPES;
	static propTypes = PICKER_PROP_TYPES_ALL;

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
