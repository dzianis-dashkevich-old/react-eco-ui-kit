import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Picker from './Picker';
import Input from './Input';
import Delimeter from './Delimeter';
import Control from './Control';
import Label from './Label';

import {
	calculateAllAvailablePickers,
	calculateVisiblePickers,
	producePickerMap,
	calculateIndexes,
} from './utils/paginator';

import { noop } from './utils/functional';
import { skipEmptyClassNames } from './utils/string';

import { EMPTY } from './consts/core';
import { FIRST, LAST } from './consts/labels';
import { CONTROL_UP, CONTROL_DOWN } from './consts/controls';
import {
	PAGINATOR,
	DEFAULT_INIT_INDEX,
	DEFAULT_DELIMETER,
	DEFAULT_VALUE_PER_PAGE,
	DEFAULT_AMOUNT_PICKERS_TO_SHOW,
	DEFAULT_ENABLE,
} from './consts/paginator';

export default class Paginator extends Component {
	constructor (props) {
		super(props);

		const { valuePerPage, amount, amountPickersToShow, initIndex } = props;
		const allPickers = calculateAllAvailablePickers(amount, valuePerPage);

		this.state = {
			currentIndex: initIndex,
			controlInputValue: initIndex,
			valuePerPage,
			allPickers,
			visiblePickers: calculateVisiblePickers(allPickers, amountPickersToShow),
			direction: { up: true, down: false },
		};
	}

	toggleDirection () {
		const { direction } = this.state;
		const { up, down } = direction;
		const newDirection = { up: !up, down: !down };

		this.setState({ direction: newDirection });
	}

	convertValueToIndex (value) {
		const { firstLabel, lastLabel, controlUp, controlDown } = this.props;
		const { allPickers, currentIndex } = this.state;

		switch (value) {
			case firstLabel:
				return 1;
			case lastLabel:
				return allPickers;
			case controlUp:
				return currentIndex + 1;
			case controlDown:
				return currentIndex - 1;
			default:
				return value;
		}
	}

	onPickerChange = (value) => {
		const index = this.convertValueToIndex(value);
		const { currentIndex } = this.state;

		if (index === currentIndex) {
			this.toggleDirection();

			return;
		}

		this.setState({ currentIndex: index, controlInputValue: index });

		this.props.onPickerChange(index);
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
		const { enableDelimeter, delimeterValue } = this.props;
		return enableDelimeter ? delimeterValue : false;
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

	calculateSequence () {
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

	isDelimeter (value) {
		return value === this.props.delimeterValue;
	}

	isControl (value) {
		return value === this.props.controlUp || value === this.props.controlDown;
	}

	isLabel (value) {
		return value === this.props.firstLabel || value === this.props.lastLabel;
	}

	generateDelimeter (value) {
		const { customDelimeterComponent, delimeterClassName } = this.props;
		const DelimeterComponent = customDelimeterComponent;
		return (<DelimeterComponent key={value} className={delimeterClassName} value={value} />);
	}

	generatePicker (value, disabled, picked) {
		const { customPickerComponent, pickerClassName } = this.props;
		const PickerComponent = customPickerComponent;

		return (<PickerComponent
			key={`${value}${disabled}${picked}`}
			className={pickerClassName}
			value={value}
			disabled={disabled}
			picked={picked}
			onClick={this.onPickerChange}
		/>);
	}

	generateControl (value, disabled) {
		const { customControlComponent, controlClassName } = this.props;
		const ControlComponent = customControlComponent;

		return (<ControlComponent
			key={`${value}${disabled}`}
			className={controlClassName}
			value={value}
			disabled={disabled}
			onClick={this.onPickerChange}
			/>);
	}

	generateLabel (value, disabled) {
		const { customLabelComponent, labelClassName } = this.props;
		const LabelComponent = customLabelComponent;

		return (<LabelComponent
			key={`${value}${disabled}`}
			className={labelClassName}
			value={value}
			disabled={disabled}
			onClick={this.onPickerChange}
			/>);
	}

	generateSequence () {
		return this.calculateSequence()
			.map(({ value, disabled, picked }) => {
				if (this.isDelimeter(value)) {
					return this.generateDelimeter(value);
				}

				if (this.isLabel(value)) {
					return this.generateLabel(value, disabled);
				}

				if (this.isControl(value)) {
					return this.generateControl(value, disabled);
				}

				return this.generatePicker(value, disabled, picked);
			});
	}

	validateInput = (value) => {
		const castToNumber = Number(value);
		return !isNaN(castToNumber)
			&& isFinite(castToNumber)
			&& castToNumber > 0
			&& castToNumber <= this.state.allPickers;
	}

	onInputChange = (value) => {
		this.setState({ controlInputValue: value });

		if (!this.validateInput(value)) {
			return;
		}

		this.onPickerChange(Number(value));
	}

	generateInputControl () {
		const { enableInputControl, customInputComponent, inputControlValidator, inputClassName } = this.props;
		const { controlInputValue } = this.state;

		if (!enableInputControl) {
			return null;
		}

		const InputComponent = customInputComponent;
		const validator = inputControlValidator || this.validateInput;
		return (<InputComponent
			className={inputClassName}
			validator={validator}
			onChange={this.onInputChange}
			value={controlInputValue}
		/>)

	}

	render () {
		const { className } = this.props;

		return (
			<div className={ skipEmptyClassNames([PAGINATOR, className]) } >
				{ this.generateInputControl() }
				{ this.generateSequence() }
			</div>)
	}
}

Paginator.defaultProps = {
	/** assets configuration **/
	valuePerPage: DEFAULT_VALUE_PER_PAGE,
	amountPickersToShow: DEFAULT_AMOUNT_PICKERS_TO_SHOW,
	className: EMPTY,

	/** customization **/
	customPickerComponent: Picker,
	pickerClassName: EMPTY,

	/** delimeter configuration **/
	enableDelimeter: DEFAULT_ENABLE.DELIMETER,
	customDelimeterComponent: Delimeter,
	delimeterValue: DEFAULT_DELIMETER,
	delimeterClassName: EMPTY,

	/** labels configuration **/
	enableLabels: DEFAULT_ENABLE.LABELS,
	customLabelComponent: Label,
	firstLabel: FIRST,
	lastLabel: LAST,
	labelClassName: EMPTY,

	/** controls configuration **/
	enableControls: DEFAULT_ENABLE.CONTROLS,
	customControlComponent: Control,
	controlUp: CONTROL_UP,
	controlDown: CONTROL_DOWN,
	controlClassName: EMPTY,

	/** input configuration **/
	enableInputControl: DEFAULT_ENABLE.INPUT_CONTROL,
	customInputComponent: Input,
	inputClassName: EMPTY,

	/** base configuration **/
	onPickerChange: noop,
	initIndex: DEFAULT_INIT_INDEX,
};

Paginator.propTypes = {
	/** mandatory prop **/
	amount: PropTypes.number.isRequired,

	/** assets configuration **/
	valuePerPage: PropTypes.number,
	amountPickersToShow: PropTypes.number,
	className: PropTypes.string,

	/** customization **/
	customPickerComponent: PropTypes.any,
	pickerClassName: PropTypes.string,

	/** delimeter configuration **/
	enableDelimeter: PropTypes.bool,
	customDelimeterComponent: PropTypes.any,
	delimeterValue: PropTypes.string,
	delimeterClassName: PropTypes.string,

	/** labels configuration **/
	enableLabels: PropTypes.bool,
	customLabelComponent: PropTypes.any,
	firstLabel: PropTypes.string,
	lastLabel: PropTypes.string,
	labelClassName: PropTypes.string,

	/** controls configuration **/
	enableControls: PropTypes.bool,
	customControlComponent: PropTypes.any,
	controlUp: PropTypes.any,
	controlDown: PropTypes.any,
	controlClassName: PropTypes.string,

	/** input configuration **/
	enableInputControl: PropTypes.bool,
	customInputComponent: PropTypes.any,
	inputControlValidator: PropTypes.func,
	inputClassName: PropTypes.string,

	/** base configuration **/
	onPickerChange: PropTypes.func,
	initIndex: PropTypes.number,
};
