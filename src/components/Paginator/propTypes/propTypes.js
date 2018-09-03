import PropTypes from 'prop-types';

export default {
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
