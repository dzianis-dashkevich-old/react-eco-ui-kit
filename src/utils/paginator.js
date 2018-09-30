import { pipe, assert } from './functional';

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

export const addValue = (value) => (arr = []) => value ? [...arr, value] : arr;
export const addValues = (values = []) => (arr = []) => values.length ? arr.concat(values) : arr;

export const producePickerMap = ({
	withLast,
	currentIndex,
	lastIndex,
	indexes = [],
	labels = {},
	controls = {},
	delimeter,
} = {}) => {
	assert(lastIndex, 'last index should be provided');

	return pipe(
		addValue(labels.firstLabel),
		addValue(controls.controlDown),
		addValues(indexes),
		addValue(withLast && delimeter),
		addValue(withLast && lastIndex),
		addValue(controls.controlUp),
		addValue(labels.lastLabel)
	)([]).map((value) => {
		const isControlUp = value === controls.controlUp;
		const isControlDown = value === controls.controlDown;

		const isFirsLabel = value === labels.firstLabel;
		const isLastLabel = value === labels.lastLabel;

		const isFirst = currentIndex === 1;
		const isLast = currentIndex === lastIndex;

		const disableFirst = isControlDown || isFirsLabel;
		const disableLast = isControlUp || isLastLabel;

		const disabled = (disableFirst && isFirst) || (disableLast && isLast);
		const picked = value === currentIndex;
		const pickerIndex = isFirsLabel ? 1 : isLastLabel ? lastIndex : value;

		return { value, disabled, picked, pickerIndex };
	});
};