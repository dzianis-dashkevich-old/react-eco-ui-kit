import { noop } from '../../../utils/functional.js';
import { basicNumberValidator } from '../utils';

export default {
	onInputChange: noop,
	validator: basicNumberValidator,
};
