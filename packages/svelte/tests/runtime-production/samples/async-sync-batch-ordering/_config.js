import { tick } from 'svelte';
import { test } from '../../test';

// Regression: an effect scheduled by the async batch (A) must not be flushed
// by a later synchronous batch (B). When DEV=false the invariant guard is
// absent, so batch B can traverse the root, find A's dirty render-effect, and
// flush it using B's batch_values which still holds the *previous* (stale)
// value of the async derived — producing "block: 0\n1" instead of "block: 1\n1".
export default test({
	async test({ assert, target }) {
		// let the initial async derived (await 0) settle
		await tick();

		const [btn] = target.querySelectorAll('button');

		btn.click();

		// wait for both the async derived resolution and the sync y++ to propagate
		await tick();
		await tick();

		assert.htmlEqual(
			target.innerHTML,
			'<button>increment</button> <p>block: 1</p> 1'
		);
	}
});
