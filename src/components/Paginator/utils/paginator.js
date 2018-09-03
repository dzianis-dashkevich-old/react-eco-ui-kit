import { noop } from "../../../utils/functional";

export const isValueInvalid = value => !value || value < 1;

export const calculateAllAvailablePickers = (all, perPage) =>
	isValueInvalid(all) || isValueInvalid(perPage)
		? 0
		: Math.ceil(all / perPage);

export const calculateVisablePickers = (all, toShow) => {
	if (isValueInvalid(all) || isValueInvalid(toShow)) {
		return 0;
	}

	if (all >= toShow) {
		return toShow;
	}

	return all;
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

const createSequence = (from, to, step = 1) => {
	const result = [];

	let init = from;

	for (let i = 0; i <= to - from; i++) {
		result.push(init);

		init = init + step;

		if (init > to) {
			break;
		}
	}

	return result;
};

const calculateIndexesUp = (currentIndex, indexCount, all) => {
	const withoutLast = currentIndex + indexCount < all;

	if (!withoutLast) {
		return createSequence(all - indexCount, all);
	}

	return createSequence(currentIndex, indexCount + (currentIndex - 1));
};

const calculateIndexesDown = (currentIndex, indexCount, all) => {
	if (currentIndex - indexCount <= 0) {
		return createSequence(1, indexCount);
	}

	const currentFromValue = currentIndex - (indexCount - 1);

	return calculateIndexesUp(currentFromValue, indexCount, all);
};

export const calculateIndexes = ({
	currentIndex,
	up,
	down,
	all,
	visibleAmount
}) => {
	if (
		isValueInvalid(currentIndex) ||
		isValueInvalid(all) ||
		isValueInvalid(visibleAmount)
	) {
		return [];
	}

	if (up && down) {
		throw new Error("only one direction should be provided");
	}

	if (visibleAmount <= 2) {
		return createSequence(1, visibleAmount);
	}

	const indexCount = visibleAmount - 1;

	if (up) {
		return calculateIndexesUp(currentIndex, indexCount, all, visibleAmount);
	}

	if (down) {
		return calculateIndexesDown(
			currentIndex,
			indexCount,
			all,
			visibleAmount
		);
	}
};

export const needDelimeter = (indexes, visibleAmount) =>
	indexes.length !== visibleAmount;
