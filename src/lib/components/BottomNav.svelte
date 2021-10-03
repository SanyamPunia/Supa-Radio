<script>
	import { fade } from 'svelte/transition';
	export let app;

    let files;

	let isSongPlaying = false;
	let isSongMuted = false;

	const playAudioClip = () => {
		isSongPlaying = true;
		app.playSound();
	};

	const pauseAudioClip = () => {
		isSongPlaying = false;
		app.pauseSound();
	};

	const muteAudioClip = () => {
		isSongMuted = true;
		app.muteSound();
	};

	const unmuteAudioClip = () => {
		isSongMuted = false;
		app.unmuteSound();
	};

	const temp_function = (event) => {
		
		app.tempFunction(event);
	};
</script>

<div class="bottom-container">
	<div class="bottom-items">
		<input on:change={temp_function} type="file" bind:files />
		<button>CLICK</button>
		<i class="fas fa-step-backward" on:click={muteAudioClip} />
		{#if !isSongPlaying}
			<i in:fade on:click={playAudioClip} class="playButton fas fa-play" />
		{:else}
			<i in:fade on:click={pauseAudioClip} class="pauseButton fas fa-pause" />
		{/if}

		<i class="fas fa-step-forward" on:click={temp_function} />

		{#if !isSongMuted}
			<i id="muteButton" class="fas fa-volume-mute" on:click={muteAudioClip} />
		{:else}
			<i id="muteButton" class="fas fa-volume-up" on:click={unmuteAudioClip} />
		{/if}
	</div>
</div>

<style lang="scss">
	.bottom-container {
		width: 100%;
		position: absolute;
		bottom: 0;
		display: flex;
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.1); /* Black w/opacity/see-through */
		backdrop-filter: blur(5px);
		margin: 0 auto;

		.bottom-items {
			margin: auto;
			font-size: 20px;
			color: white;
			padding: 1.5em 0;
			* {
				margin: 0 1em;
				cursor: pointer;
			}
			#muteButton {
				color: red;
			}
		}
	}
</style>
