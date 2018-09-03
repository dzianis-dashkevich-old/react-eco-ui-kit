export const basicNumberValidator = (value, maxValue) => {
	const castToNamber = Number(value);

	if (isNaN(castToNamber)) {
		return false;
	}

	if (!isFinite(castToNamber)) {
		return false;
	}

	return castToNamber > 0 && castToNamber <= maxValue;
};
