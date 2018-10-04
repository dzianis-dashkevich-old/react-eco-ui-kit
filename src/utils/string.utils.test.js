import { constructClassName, skipEmptyClassNames } from './string';

import { EMPTY } from '../consts/core';

describe('string utils spec', () => {
	describe('constructClassName', () => {
		it('should return empty string if no values provided', () => {
			expect(constructClassName()).toBe('');
			expect(constructClassName([])).toBe('');
		});

		it('should return className string, whne classes are provided', () => {
			const expected = 'one two three';
			expect(constructClassName(['one', 'two', 'three'])).toBe(expected);
		});

		it('should create className string, depending on provided config', () => {
			const expected = 'one four';
			expect(constructClassName(['two', 'one', 'three', 'four', 'two'], { break: ['two', 'three'] })).toBe(expected);
		});
	});

	describe('skipEmptyClassNames', () => {
		it('should skip EMPTY classNames', () => {
			const expected = 'one two';

			expect(skipEmptyClassNames([EMPTY, EMPTY, 'one', EMPTY, 'two'])).toBe(expected);
		});
	});
});