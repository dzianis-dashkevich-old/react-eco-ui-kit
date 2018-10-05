import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { DEFAULT_VALUE, PICKED, DISABLED, EMPTY } from './consts/core';
import { PICKER } from './consts/picker';

export default class Picker extends Component {
	onClick = () => {
		const { onClick, disabled, value } = this.props;

		!disabled && onClick(value);
	};

	render () {
		const { value, disabled, picked, className } = this.props;

		const disabledClassName = disabled ? DISABLED : EMPTY;
		const pickedClassName = picked ? PICKED : EMPTY;

		return (
			<div
				className={skipEmptyClassNames([PICKER, disabledClassName, pickedClassName, className])}
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
