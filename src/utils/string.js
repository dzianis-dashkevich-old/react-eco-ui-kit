import { EMPTY } from '../consts/core';

export const constructClassName = (classes = [], config = {}) =>
	classes.reduce(
		(prev, className) => {
			const needBreak = config.break && config.break.indexOf(className) !== -1;
			prev = needBreak ? prev : `${prev} ${className}`;
			return prev.trim();
		}, '');

export const skipEmptyClassNames = (classes) => constructClassName(classes, { break: [EMPTY] });