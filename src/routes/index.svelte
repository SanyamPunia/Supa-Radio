<script>
	import App from "$lib/threejs/App"
	import { onMount } from 'svelte';

	let app;

	onMount(() => {
		window.focus();
		app = new App();
		window.app = app;
	});

	const playAudioClip = () => {
		app.playSound();
	}

</script>

<div on:click={playAudioClip} class="playButton">
	Play Button
</div>

<style>
	.playButton {
		position: absolute;
		background: white;
		padding: 0.3em 1em;
		cursor: pointer;		
	}
</style>
