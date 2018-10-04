import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { DEFAULT_VALUE, EMPTY, DISABLED } from './consts/core';
import { LABEL } from './consts/labels';

export default class Label extends Component {
	onClick = () => {
		const { onLabelClick, disabled, value } = this.props;

		!disabled && onLabelClick(value);
	};

	render () {
		const { value, disabled, className } = this.props;
		const disabledClassName = disabled ? DISABLED : EMPTY;

		return (
			<div
				className={skipEmptyClassNames([LABEL, disabledClassName, className])}
				data-disabled={disabled}
				onClick={ this.onClick }
			>
				{ value }
			</div>
		);
	}
}

Label.defaultProps = {
	onLabelClick: noop,
	disabled: false,
	value: DEFAULT_VALUE,
	className: EMPTY,
};

Label.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.any,
	onLabelClick: PropTypes.func,
};
