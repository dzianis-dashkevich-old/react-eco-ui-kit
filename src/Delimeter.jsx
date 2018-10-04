import React from 'react';
import PropTypes from 'prop-types';

import { EMPTY } from './consts/core';
import { DELIMETER, DEFAULT_DELIMETER } from './consts/delimeter';

import { skipEmptyClassNames } from './utils/string';

const Delimeter = ({ value, className }) => (
	<span className={skipEmptyClassNames([DELIMETER, className])} >
		{value}
	</span>
);

Delimeter.defaultProps = {
	className: EMPTY,
	value: DEFAULT_DELIMETER,
};

Delimeter.propTypes = {
	className: PropTypes.string,
	value: PropTypes.any,
};

export default Delimeter;