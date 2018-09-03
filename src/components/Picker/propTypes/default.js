import { noop } from '../../../utils/functional';
import { PICKER_DEFAULT_VALUE } from '../consts';

export default {
	onPickerClick: noop,
	disabled: false,
	picked: false,
	value: PICKER_DEFAULT_VALUE,
};
