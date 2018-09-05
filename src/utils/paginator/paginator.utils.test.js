import { isValueInvalid } from './index';

describe('paginator utils spec', () => {
	describe('isValueInvalid', () => {
		it('should return true if value is invalid', () => {
			expect(isValueInvalid(0)).toBeTruthy();
			expect(isValueInvalid(-1)).toBeTruthy();
			expect(isValueInvalid(null)).toBeTruthy();
			expect(isValueInvalid(undefined)).toBeTruthy();
			expect(isValueInvalid(false)).toBeTruthy();
		});
	});
});
