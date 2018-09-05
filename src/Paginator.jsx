import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Picker from './Picker';
import Input from './Input';

import {
	calculateAllAvailablePickers,
	calculateVisablePickers,
	producePickerMap,
	calculateIndexes,
	needDelimeter,
} from './utils/paginator';
import { noop } from './utils/functional';

export default class Paginator extends Component {
	constructor (props) {
		super(props);

		const { valuePerPage, amount, amountPickersToShow, initIndex } = props;

		const allPickers = calculateAllAvailablePickers(amount, valuePerPage);
		const visiblePickers = calculateVisablePickers(allPickers, amountPickersToShow);

		const initialDirection = { up: true, down: false };

		this.state = {
			valuePerPage,
			allPickers,
			visiblePickers,
			currentIndex: initIndex,
			direction: initialDirection,
		};

		console.log(this.state);

		this._defaultStyle = {
			display: 'flex',
			alignItems: 'baseline',
		}
	}

	toggleDirection () {
		const { direction } = this.state;
		const { up, down } = direction;
		const newDirection = { up: !up, down: !down };

		this.setState({ direction: newDirection });

		console.log('toggle direction');
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

		console.log('change index');

		this.props.onPickerChange(indexToUpdate);
	};

	calculateLabels () {
		const { enableLabels, firstLabel, lastLabel } = this.props;

		if (!enableLabels) {
			return false;
		}

		return { firstLabel, lastLabel };
	}

	calculateControls () {
		const { enableControls, controlUp, controlDown } = this.props;

		if (!enableControls) {
			return false;
		}

		return { controlUp, controlDown };
	}

	calculateDelimeter () {
		const { enableDelimeter, delimeter } = this.props;

		if (!enableDelimeter) {
			return false;
		}

		return delimeter;
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

	calculateDelimeterVisibility (indexes) {
		const { visiblePickers } = this.state;

		return needDelimeter(indexes, visiblePickers);
	}

	calculatePickerSequence () {
		const indexes = this.calculateIndexes();
		const labels = this.calculateLabels();
		const controls = this.calculateControls();
		const delimeter = this.calculateDelimeter();

		const { currentIndex, allPickers } = this.state;

		const isDelimeterViseble = this.calculateDelimeterVisibility(indexes);

		return producePickerMap({
			isDelimeterViseble,
			currentIndex,
			indexes,
			labels,
			delimeter,
			controls,
			lastIndex: allPickers,
		});
	}

	generatePickers () {
		const { delimeter, customPicker, color } = this.props;

		const PickerComponent = customPicker;

		const sequence = this.calculatePickerSequence();

		console.log(sequence);

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
					color={color}
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
			<div className='paginator' style={this._defaultStyle} >
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
	color: 'blue',

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
	amount: PropTypes.number,

	/** assets configuration **/
	valuePerPage: PropTypes.number,
	amountPickersToShow: PropTypes.number,

	/** customization **/
	customPicker: PropTypes.any,
	color: PropTypes.string,

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
