import {
	noop,
	identity,
	pipe,
	assert,
} from './functional';

describe('functional utils spec', () => {
	describe('noop', () => {
		it('should return undefind', () => {
			expect(noop()).toBeUndefined();
		});
	});

	describe('identity', () => {
		it('should return provided argument', () => {
			expect(identity()).toBeUndefined();
			expect(identity(12)).toBe(12);

			const a = { a: 12 };
			expect(identity(a)).toBe(a);
		});
	});

	describe('pipe', () => {
		it('should return identity if no funcs provided', () => {
			const identity = pipe();
			expect(identity).toBeInstanceOf(Function);
			expect(identity(12)).toBe(12);
		});

		it('should return provided func, if there are only one func provided', () => {
			const func = (val) => val + 12;
			const f = pipe(func);

			expect(f).toBe(func);
			expect(f(12)).toBe(func(12));
		});

		it('should create flow of function invoke', () => {
			const addA = (val) => (obj) => ({ ...obj, a: val });
			const addB = (val) => (obj) => ({ ...obj, b: val });
			const addC = (val) => (obj) => ({ ...obj, c: val });

			const addMultipleValues = pipe(addA(1), addB(2), addC(3));

			expect(addMultipleValues({})).toEqual({ a: 1, b: 2, c: 3 });
		});
	});

	describe('assert', () => {
		it('should throw error if condition is false', () => {
			const f = () => assert(false, 'NO');
	
			expect(f).toThrowError('Assertion failed: NO');
		});

		it('should return condition if condition is truthy', () => {
			expect(assert(true, 'NO')).toBe(true);
		});
	});
});
