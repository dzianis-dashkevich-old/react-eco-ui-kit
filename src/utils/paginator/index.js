export const isValueInvalid = value => !value || value < 1;

export const calculateAllAvailablePickers = (all, perPage) =>
	isValueInvalid(all) || isValueInvalid(perPage)
		? 0
		: Math.ceil(all / perPage);

export const calculateVisiblePickers = (all, toShow) => {
	if (isValueInvalid(all) || isValueInvalid(toShow)) {
		return 0;
	}

	if (all >= toShow) {
		return toShow;
	}

	return all;
};

export const createSequence = (from, to, step = 1) => {
	if(isNaN(parseInt(from)) || isNaN(parseInt(to))) {
		return [];
	}

	const max = Math.max(from, to);
	const min = Math.min(from, to);

	const getBreakCase = (from) => (step > 0 && from > max) || (step < 0 && from < min);
	const makeStep = () => from = from + step;

	const result = [from];

	while(!getBreakCase(makeStep())) {
		result.push(from);
	}

	return result;
};

export const calculateIndexesUp = (currentIndex, indexCount, lastIndex) => {
	if (currentIndex > lastIndex) {
		throw new Error('Current index can`t be more then last index');
	}

	const withoutLast = currentIndex + indexCount < lastIndex;

	if (!withoutLast) {
		return createSequence(lastIndex - indexCount, lastIndex);
	}

	return createSequence(currentIndex, indexCount + (currentIndex - 1));
};

export const calculateIndexesDown = (currentIndex, indexCount, lastIndex) => {
	if (currentIndex - indexCount <= 0) {
		return createSequence(1, indexCount);
	}

	const from = currentIndex - (indexCount - 1);

	return calculateIndexesUp(from, indexCount, lastIndex);
};

export const calculateIndexes = (
	{ currentIndex, up, down, all, visibleAmount },
	calcIndexUp = calculateIndexesUp,
	calIndexDown = calculateIndexesDown
	) => {
	if (up && down) {
		throw new Error("only one direction should be provided");
	}

	if (isValueInvalid(currentIndex) || isValueInvalid(all) || isValueInvalid(visibleAmount)) {
		return [];
	}

	if (visibleAmount <= 2) {
		return createSequence(1, visibleAmount);
	}

	const args = [currentIndex, visibleAmount - 1, all];

	if(!up && !down) {
		up = true;
	}

	return up ? calcIndexUp(...args) : calIndexDown(...args);
};

const wrapPickerMeta = value => ({
	value,
	pickerIndex: value,
	disabled: false,
	picked: false
});

const updateMetaDependingOnFlags = ({
	                                    meta,
	                                    isFirsLabel,
	                                    isLastLabel,
	                                    isDisabled,
	                                    isPicked,
	                                    lastIndex
                                    }) => {
	const result = { ...meta };

	if (isFirsLabel) {
		result.pickerIndex = 1;
	}

	if (isLastLabel) {
		result.pickerIndex = lastIndex;
	}

	if (isDisabled) {
		result.disabled = true;
	}

	if (isPicked) {
		result.picked = true;
	}

	return result;
};

export const producePickerMap = ({
	                                 isDelimeterViseble,
	                                 currentIndex,
	                                 lastIndex = 1,
	                                 indexes = [],
	                                 labels,
	                                 controls,
	                                 delimeter
                                 }) => {
	const result = [];

	labels && result.push(labels.firstLabel);
	controls && result.push(controls.controlDown);

	result.push(...indexes);

	if (isDelimeterViseble) {
		delimeter && result.push(delimeter);

		result.push(lastIndex);
	}

	controls && result.push(controls.controlUp);
	labels && result.push(labels.lastLabel);

	return result.map(value => {
		const meta = wrapPickerMeta(value);

		const isControlUp = value === controls.controlUp;
		const isControlDown = value === controls.controlDown;

		const isFirsLabel = value === labels.firstLabel;
		const isLastLabel = value === labels.lastLabel;

		const isFirst = currentIndex === 1;
		const isLast = currentIndex === lastIndex;

		const disableFirst = isControlDown || isFirsLabel;
		const disableLast = isControlUp || isLastLabel;

		const isDisabled = (disableFirst && isFirst) || (disableLast && isLast);
		const isPicked = value === currentIndex;

		return updateMetaDependingOnFlags({
			meta,
			isFirsLabel,
			isLastLabel,
			isDisabled,
			isPicked,
			lastIndex
		});
	});
};

export const needDelimeter = (indexes, visibleAmount) => indexes.length !== visibleAmount;
