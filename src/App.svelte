<script lang="ts">
	import Inputs from './components/Inputs.svelte';
	import Buttons from './components/Buttons.svelte';
	import EventHolder from './components/EventHolder.svelte';
	import Steps from './components/Steps.svelte';
	import SettingsMenu from './components/Settings.svelte';

	import GithubIcon from './icons/Github.svelte';

	import { settingsMenuOpen } from './stores'
</script>

{#if $settingsMenuOpen}
	<SettingsMenu />
{/if}

<GithubIcon href="https://github.com/EmNudge/Abstract-Equality-Guide" />

<header>
	<Inputs />
	<Buttons />
</header>

<main>
	<EventHolder />
	<Steps />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-gap: 10px;
		overflow: auto;
	}
</style>