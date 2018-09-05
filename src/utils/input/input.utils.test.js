import { basicNumberValidator } from './index';

describe('input utils spec', () => {
	describe('basic number validator', () => {
		it('should return false, if provided value cant cast to number', () => {
			expect(basicNumberValidator('val')).toBeFalsy();
		});
	});
});
