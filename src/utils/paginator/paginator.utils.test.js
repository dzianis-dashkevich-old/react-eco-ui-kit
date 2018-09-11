import {
	isValueInvalid,
	calculateAllAvailablePickers,
	calculateVisiblePickers,
	createSequence,
	calculateIndexesUp,
	calculateIndexesDown,
	calculateIndexes,
} from './index';

describe('paginator utils spec', () => {
	describe('isValueInvalid', () => {
		it('should return true if value is invalid', () => {
			expect(isValueInvalid(0)).toBeTruthy();
			expect(isValueInvalid(-1)).toBeTruthy();
			expect(isValueInvalid(null)).toBeTruthy();
			expect(isValueInvalid(undefined)).toBeTruthy();
			expect(isValueInvalid(false)).toBeTruthy();
		});

		it('should return false if value is valid', () => {
			expect(isValueInvalid(1)).toBeFalsy();
			expect(isValueInvalid(123)).toBeFalsy();
			expect(isValueInvalid(Infinity)).toBeFalsy();
			expect(isValueInvalid(true)).toBeFalsy();
		})
	});

	describe('calculateAllAvailablePickers', () => {
		it('should return 0, if provided values is not valid', () => {
			expect(calculateAllAvailablePickers(0, 12)).toBe(0);
			expect(calculateAllAvailablePickers(12, 0)).toBe(0);
		});

		it('should retun ceil value, as a result of division', () => {
			const all = 90;
			const perPage = 12;
			const expected = Math.ceil(all / perPage);

			expect(calculateAllAvailablePickers(all, perPage)).toBe(expected);
		});
	});

	describe('calculateVisiblePickers', () => {
		it('should return 0 if provided values are not valid', () => {
			expect(calculateVisiblePickers(0, 12)).toBe(0);
			expect(calculateVisiblePickers(12, 0)).toBe(0);
		});

		it('should return value - how many pickers to show, depend on arguments', () => {
			expect(calculateVisiblePickers(123, 12)).toBe(12);
			expect(calculateVisiblePickers(10, 12)).toBe(10);
			expect(calculateVisiblePickers(12, 12)).toBe(12);
			expect(calculateVisiblePickers(1, 12)).toBe(1);
			expect(calculateVisiblePickers(100, 99)).toBe(99);
		});
	});

	describe('createSequence', () => {
		it('should return empty array, if provided value is not valid', () => {
			expect(createSequence()).toEqual([]);
			expect(createSequence(null, null)).toEqual([]);
			expect(createSequence(NaN, NaN)).toEqual([]);
			expect(createSequence(NaN, 12)).toEqual([]);
			expect(createSequence(12, null)).toEqual([]);
		});

		it('should return sequence, depending on provided values', () => {
			expect(createSequence(0, 5)).toEqual([0,1,2,3,4,5]);
			expect(createSequence(10, 15)).toEqual([10,11,12,13,14,15]);
			expect(createSequence(-1, 3)).toEqual([-1,0,1,2,3]);
			expect(createSequence(-10, -7)).toEqual([-10,-9,-8,-7]);
			expect(createSequence(3, 0)).toEqual([3]);
			expect(createSequence(0, -10)).toEqual([0]);
		});

		it('should return sequence, with provided step value', () => {
			expect(createSequence(0, 5, 2)).toEqual([0,2,4]);
			expect(createSequence(0, 5, 5)).toEqual([0,5]);
			expect(createSequence(0, 100, 20)).toEqual([0,20,40,60,80,100]);
			expect(createSequence(0, 99, 20)).toEqual([0,20,40,60,80]);
			expect(createSequence(0, -20, -20)).toEqual([0,-20]);
			expect(createSequence(0, -34, -12)).toEqual([0,-12,-24]);
		});
	});

	describe('calculateIndexesUp', () => {
		it('should throw an error, if value is not valid', () => {
			expect(() => calculateIndexesUp(12, 5, 6)).toThrow();
		});

		it('should return sequence with full visible count, if it is include last value', () => {
			expect(calculateIndexesUp(8, 4, 12)).toEqual([8,9,10,11,12]);
			expect(calculateIndexesUp(9, 4, 12)).toEqual([8,9,10,11,12]);
			expect(calculateIndexesUp(10, 4, 12)).toEqual([8,9,10,11,12]);
			expect(calculateIndexesUp(11, 4, 12)).toEqual([8,9,10,11,12]);
			expect(calculateIndexesUp(12, 4, 12)).toEqual([8,9,10,11,12]);

			expect(calculateIndexesUp(1, 4, 5)).toEqual([1,2,3,4,5]);
			expect(calculateIndexesUp(2, 4, 5)).toEqual([1,2,3,4,5]);
			expect(calculateIndexesUp(3, 4, 5)).toEqual([1,2,3,4,5]);
			expect(calculateIndexesUp(4, 4, 5)).toEqual([1,2,3,4,5]);
			expect(calculateIndexesUp(5, 4, 5)).toEqual([1,2,3,4,5]);
		});

		it('should return correct sequence, depending on visible count -1', () => {
			expect(calculateIndexesUp(1, 4, 12)).toEqual([1,2,3,4]);
			expect(calculateIndexesUp(2, 4, 12)).toEqual([2,3,4,5]);
			expect(calculateIndexesUp(3, 4, 12)).toEqual([3,4,5,6]);
			expect(calculateIndexesUp(4, 4, 12)).toEqual([4,5,6,7]);
			expect(calculateIndexesUp(5, 4, 12)).toEqual([5,6,7,8]);
			expect(calculateIndexesUp(6, 4, 12)).toEqual([6,7,8,9]);
			expect(calculateIndexesUp(7, 4, 12)).toEqual([7,8,9,10]);

			expect(calculateIndexesUp(12, 3, 18)).toEqual([12,13,14]);
			expect(calculateIndexesUp(13, 3, 18)).toEqual([13,14,15]);
			expect(calculateIndexesUp(14, 3, 18)).toEqual([14,15,16]);
		})
	});

	describe('calculateIndexesDown', () => {
		it(`should return sequence from 1 to visible count - 1,
			if current index less then visible count -1`, () => {
			expect(calculateIndexesDown(1, 4, 5)).toEqual([1,2,3,4]);
			expect(calculateIndexesDown(2, 4, 5)).toEqual([1,2,3,4]);
			expect(calculateIndexesDown(3, 4, 5)).toEqual([1,2,3,4]);
			expect(calculateIndexesDown(4, 4, 5)).toEqual([1,2,3,4]);

			expect(calculateIndexesDown(1, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(2, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(3, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(4, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(5, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(6, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(7, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(8, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
			expect(calculateIndexesDown(9, 9, 15)).toEqual([1,2,3,4,5,6,7,8,9]);
		});

		it(`should invoke calculateIndexesUp, 
		so that current index should be last value in array, or include last value`, () => {
			expect(calculateIndexesDown(5, 4, 15)).toEqual([2,3,4,5]);
			expect(calculateIndexesDown(6, 4, 15)).toEqual([3,4,5,6]);
			expect(calculateIndexesDown(7, 4, 15)).toEqual([4,5,6,7]);
			expect(calculateIndexesDown(8, 4, 15)).toEqual([5,6,7,8]);
			expect(calculateIndexesDown(9, 4, 15)).toEqual([6,7,8,9]);
			expect(calculateIndexesDown(10, 4, 15)).toEqual([7,8,9,10]);
			expect(calculateIndexesDown(11, 4, 15)).toEqual([8,9,10,11]);
			expect(calculateIndexesDown(12, 4, 15)).toEqual([9,10,11,12]);
			expect(calculateIndexesDown(13, 4, 15)).toEqual([10,11,12,13]);
			expect(calculateIndexesDown(14, 4, 15)).toEqual([11,12,13,14,15]);
			expect(calculateIndexesDown(15, 4, 15)).toEqual([11,12,13,14,15]);

			expect(calculateIndexesDown(3, 2, 5)).toEqual([2,3]);
			expect(calculateIndexesDown(4, 2, 5)).toEqual([3,4,5]);
			expect(calculateIndexesDown(5, 2, 5)).toEqual([3,4,5]);
		});
	});

	describe('calculateIndexes', () => {
		it('should return empty array if provided values is not valid', () => {
			expect(calculateIndexes({ currentIndex: -1 })).toEqual([]);
			expect(calculateIndexes({ })).toEqual([]);
			expect(calculateIndexes({ all: 0 })).toEqual([]);
			expect(calculateIndexes({ visibleAmount: 0 })).toEqual([]);
			expect(calculateIndexes({ up: true })).toEqual([]);
		});

		it('should throw an error if both directions are provided', () => {
			expect(() => calculateIndexes({ up: true, down: true })).toThrow();
		});

		it(`should return array of one item, or from 1 to 2,
		if visible amount is less or equal 2`, () => {
			expect(calculateIndexes({ visibleAmount: 1, currentIndex: 1, all: 20 })).toEqual([1]);
			expect(calculateIndexes({ visibleAmount: 2, currentIndex: 1, all: 20 })).toEqual([1, 2]);
		});

		it('should use up direction by default', () => {
			expect(calculateIndexes({ visibleAmount: 5, currentIndex: 1, all: 20 })).toEqual([1,2,3,4]);
			expect(calculateIndexes({ visibleAmount: 5, currentIndex: 2, all: 20 })).toEqual([2,3,4,5]);
			expect(calculateIndexes({ visibleAmount: 5, currentIndex: 3, all: 20 })).toEqual([3,4,5,6]);
		});

		it('should call calculate indexes, depending on provided direction', () => {
			const calcIndexUp = jest.fn();
			const calIndexDown = jest.fn();

			expect(calculateIndexes({
				visibleAmount: 5,
				currentIndex: 1,
				all: 20,
				up: true,
			})).toEqual([1,2,3,4]);

			calculateIndexes({
					visibleAmount: 5,
					currentIndex: 1,
					all: 20,
					up: true
				}, calcIndexUp, calIndexDown);

			expect(calcIndexUp).toHaveBeenCalledTimes(1);
			expect(calcIndexUp).toHaveBeenCalledWith(1, 4, 20);

			expect(calculateIndexes({
				visibleAmount: 5,
				currentIndex: 6,
				all: 20,
				down: true,
			})).toEqual([3,4,5,6]);

			calculateIndexes({
				visibleAmount: 5,
				currentIndex: 6,
				all: 20,
				down: true,
			}, calcIndexUp, calIndexDown);

			expect(calIndexDown).toHaveBeenCalledTimes(1);
			expect(calIndexDown).toHaveBeenCalledWith(6, 4, 20);
		});
	});
});
