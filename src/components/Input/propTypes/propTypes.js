import PropTypes from "prop-types";

export default {
	maxValue: PropTypes.number,
	validator: PropTypes.func,
	onInputChange: PropTypes.func,
	currentIndex: PropTypes.any,
};
