export const noop = () => {};

export const identity = (arg) => arg;

export const pipe = (...funcs) => {
	if (!funcs.length) {
		return identity;
	}

	if (funcs.length === 1) {
		return funcs[0]
	}

	return funcs.reduceRight((a, b) => (...args) => a(b(...args)))
};

export const assert = (condition, message) => {
	if (!condition) {
		throw new Error(`Assertion failed: ${message}`);
	}

	return condition;
}
