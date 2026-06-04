<script>
	let state = $state("not attached")
</script>


<svelte:boundary>
	{await new Promise((resolve) => setTimeout(resolve, 50))}
	<div
		{@attach () => {
			state = "attached";
		}}
	>
		{state}
	</div>
	{#snippet pending()}
		pending
	{/snippet}
</svelte:boundary>
