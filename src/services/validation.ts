/**
 * Defines types and validation
 * @param toBeValidated
 * @returns
 */

interface Validatable {
	someObject: unknown;
}

export function validate(toBeValidated: Validatable) {
	console.log('validation called: ', toBeValidated);
	return true;
}
