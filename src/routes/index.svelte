<script>
	import PlayAudio from "$lib/visualizer"
	import { onMount } from 'svelte';

	onMount(() => {
		window.focus();
		const playAudio = new PlayAudio();
		window.app = playAudio;
	});
</script>

<div class="container">
	<canvas class="canvas1"></canvas>
	<audio class="audio1" controls />
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.container {
		position: absolute;
		top: 0;
		left: 0;
		background: black;
		width: 100%;
		height: 100%;
	}

	.canvas1 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.audio1 {
		width: 50%;
		margin: 50px auto;
		display: block;
	}
</style>
