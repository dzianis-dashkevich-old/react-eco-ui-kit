import { noop } from '../../../utils/functional';

export default {
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
