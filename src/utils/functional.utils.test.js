import { noop } from './functional';

describe('functional utils spec', () => {
	describe('noop', () => {
		it('should return undefind', () => {
			expect(noop()).toBeUndefined();
		});
	});
});
