import React, { Component } from 'react';

import { INPUT_DEFAULT_PROP_TYPES, INPUT_PROP_TYPES_ALL } from './propTypes';

export default class Input extends Component {
	static defaultProps = INPUT_DEFAULT_PROP_TYPES;
	static propTypes = INPUT_PROP_TYPES_ALL;

	constructor (props) {
		super(props);

		const { currentIndex } = this.props;

		this.state = { isValid: true, value: currentIndex }
	}

	componentWillReceiveProps ({ currentIndex }) {
		this.setState({ value: currentIndex });
	}

	onInputchange = ({ target }) => {
		const { validator, maxValue, onInputChange, currentIndex } = this.props;
		const { value } = target;

		let isValid = false;

		if (validator(value, maxValue)) {
			isValid = true;

			const casted = Number(value);
			const needdToCallChange = currentIndex !== casted;

			needdToCallChange && onInputChange(casted);
		}

		this.setState({ isValid, value });
	};

	render () {
		const { value } = this.state;

		return (
			<input
				onChange={this.onInputchange}
				value={value}
			/>)
	}
}
