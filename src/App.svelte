<script lang="ts">
	import Inputs from './components/Inputs/Index.svelte';
	import StartStopButtons from './components/Buttons/StartStop.svelte';
	import SettingsButton from './components/Buttons/Settings.svelte';

	import EventHolder from './components/EventHolder.svelte';
	import Steps from './components/Steps/Index.svelte';
	import SettingsMenu from './components/Settings.svelte';

	import GithubIcon from './icons/Github.svelte';

	import { settingsMenuOpen } from './stores'
</script>

{#if $settingsMenuOpen}
	<SettingsMenu />
{/if}

<GithubIcon href="https://github.com/EmNudge/Abstract-Equality-Guide" />

<header>
	<div>
		<Inputs />
		<SettingsButton />
	</div>

	<StartStopButtons />
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
	@media screen and (max-width: 1000px) {
		main {
			display: block;
		}
		header div {
			margin-right: 40px;
		}
	}
	header div {
		display: flex;
		grid: 10px;
    justify-content: center;
	}
</style>