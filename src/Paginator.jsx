import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Picker from './Picker';
import Input from './Input';

import {
	calculateAllAvailablePickers,
	calculateVisiblePickers,
	producePickerMap,
	calculateIndexes,
} from './utils/paginator';
import { noop } from './utils/functional';

export default class Paginator extends Component {
	constructor (props) {
		super(props);

		const { valuePerPage, amount, amountPickersToShow, initIndex } = props;

		const allPickers = calculateAllAvailablePickers(amount, valuePerPage);
		const visiblePickers = calculateVisiblePickers(allPickers, amountPickersToShow);

		const initialDirection = { up: true, down: false };

		this.state = {
			valuePerPage,
			allPickers,
			visiblePickers,
			currentIndex: initIndex,
			direction: initialDirection,
		};
	}

	toggleDirection () {
		const { direction } = this.state;
		const { up, down } = direction;
		const newDirection = { up: !up, down: !down };

		this.setState({ direction: newDirection });
	}

	onPickerChange = (index) => {
		const { controlUp, controlDown } = this.props;
		const { currentIndex } = this.state;

		if (index === currentIndex) {
			this.toggleDirection();

			return;
		}

		let indexToUpdate = index;

		if (index === controlUp) {
			indexToUpdate = currentIndex + 1;
		}

		if (index === controlDown) {
			indexToUpdate = currentIndex - 1;
		}

		this.setState({ currentIndex: indexToUpdate });

		this.props.onPickerChange(indexToUpdate);
	};

	calculateLabels () {
		const { enableLabels, firstLabel, lastLabel } = this.props;
		return enableLabels ? { firstLabel, lastLabel } : {};
	}

	calculateControls () {
		const { enableControls, controlUp, controlDown } = this.props;
		return enableControls ? { controlUp, controlDown } : {};
	}

	calculateDelimeter () {
		const { enableDelimeter, delimeter } = this.props;
		return enableDelimeter ? delimeter : false;
	}

	calculateIndexes () {
		const { currentIndex, allPickers, visiblePickers, direction } = this.state;
		const { up, down } = direction;

		return calculateIndexes({
			currentIndex,
			up,
			down,
			all: allPickers,
			visibleAmount: visiblePickers });
	}

	calculatePickerSequence () {
		const indexes = this.calculateIndexes();

		const { currentIndex, allPickers, visiblePickers } = this.state;

		return producePickerMap({
			withLast: indexes.length !== visiblePickers,
			labels: this.calculateLabels(),
			delimeter: this.calculateDelimeter(),
			controls: this.calculateControls(),
			currentIndex,
			indexes,
			lastIndex: allPickers,
		});
	}

	generatePickers () {
		const { delimeter, customPicker } = this.props;

		const PickerComponent = customPicker;

		const sequence = this.calculatePickerSequence();

		return sequence.map(({ value, disabled, picked, pickerIndex }) => {
				if (value === delimeter) {
					return (<span key={value} >{value}</span>);
				}

				return (<PickerComponent
					key={`${value}${disabled}${picked}`}
					pickerIndex={pickerIndex}
					value={value}
					disabled={disabled}
					picked={picked}
					onPickerClick={this.onPickerChange}
				/>)
			});
	}

	generateInputControl () {
		const { enableInputControl, customInput, inputControlValidator } = this.props;
		const { currentIndex, allPickers } = this.state;

		if (!enableInputControl) {
			return null;
		}

		const InputComponent = customInput;

		return (<InputComponent
			maxValue={allPickers}
			validator={inputControlValidator}
			onInputChange={this.onPickerChange}
			currentIndex={currentIndex}
		/>)

	}

	render () {
		return (
			<div className='paginator' >
				{ this.generateInputControl() }
				{ this.generatePickers() }
			</div>)
	}
}

Paginator.defaultProps = {
	/** assets configuration **/
	valuePerPage: 10,
	amountPickersToShow: 4,

	/** customization **/
	customPicker: Picker,

	/** delimeter configuration **/
	enableDelimeter: true,
	delimeter: '...',

	/** labels configuration **/
	enableLabels: true,
	firstLabel: 'First',
	lastLabel: 'Last',

	/** controls configuration **/
	enableControls: true,
	controlUp: '>',
	controlDown: '<',

	/** input configuration **/
	enableInputControl: true,
	customInput: Input,

	/** base configuration **/
	onPickerChange: noop,
	initIndex: 1,
};

Paginator.propTypes = {
	/** mandatory prop **/
	amount: PropTypes.number.isRequired,

	/** assets configuration **/
	valuePerPage: PropTypes.number,
	amountPickersToShow: PropTypes.number,

	/** customization **/
	customPicker: PropTypes.any,

	/** delimeter configuration **/
	enableDelimeter: PropTypes.bool,
	delimeter: PropTypes.string,

	/** labels configuration **/
	enableLabels: PropTypes.bool,
	firstLabel: PropTypes.string,
	lastLabel: PropTypes.string,

	/** controls configuration **/
	enableControls: PropTypes.bool,
	controlUp: PropTypes.any,
	controlDown: PropTypes.any,

	/** input configuration **/
	enableInputControl: PropTypes.bool,
	customInput: PropTypes.any,
	inputControlValidator: PropTypes.func,

	/** base configuration **/
	onPickerChange: PropTypes.func,
	initIndex: PropTypes.number,
};
