import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { DEFAULT_VALUE, EMPTY, DISABLED } from './consts/core';
import { CONTROL } from './consts/controls';

export default class Control extends Component {
	onClick = () => {
		const { onControlClick, disabled, value } = this.props;

		!disabled && onControlClick(value);
	};

	render () {
		const { value, disabled, className } = this.props;
		const disabledClassName = disabled ? DISABLED : EMPTY;

		return (
			<div
				className={skipEmptyClassNames([CONTROL, disabledClassName, className])}
				data-disabled={disabled}
				onClick={ this.onClick }
			>
				{ value }
			</div>
		);
	}
}

Control.defaultProps = {
	onControlClick: noop,
	disabled: false,
	value: DEFAULT_VALUE,
	className: EMPTY,
};

Control.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.any,
	onControlClick: PropTypes.func,
};
