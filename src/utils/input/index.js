export const basicNumberValidator = (value, maxValue) => {
	const castToNumber = Number(value);

	if (isNaN(castToNumber)) {
		return false;
	}

	if (!isFinite(castToNumber)) {
		return false;
	}

	return castToNumber > 0 && castToNumber <= maxValue;
};
