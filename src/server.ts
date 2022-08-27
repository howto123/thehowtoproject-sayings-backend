console.log('   Program has started.   ');
let a: unknown;
console.log('a = ', a);
a = 'zwei';
a = 1;
console.log('a = ', a);
function b(c: unknown) {
	console.log('function called', c);
}
b('hello ');
console.log(typeof a);
console.log('   Program has finished.   ');
