import { tick } from 'svelte';
import { test } from '../../test';

export default test({
	async test({ assert, target }) {
		await tick();

		assert.htmlEqual(target.innerHTML, 'pending');

		await new Promise((resolve) => setTimeout(resolve, 60));
		await tick();

		assert.htmlEqual(
			target.innerHTML,
			'<div>attached</div>'
		);
	}
});