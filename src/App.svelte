<script lang="ts">
	import Inputs from './components/Inputs.svelte';
	import Buttons from './components/Buttons.svelte';
	import EventHolder from './components/EventHolder.svelte';
	import Steps from './components/Steps.svelte';

	import GithubIcon from './icons/Github.svelte';
</script>

<GithubIcon href="https://github.com/EmNudge/Abstract-Equality-Guide" />

<main>
	<Inputs />
	<Buttons />
	
	<div>
		<EventHolder />
		<Steps />
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}
	div {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-gap: 10px;
	}
</style>