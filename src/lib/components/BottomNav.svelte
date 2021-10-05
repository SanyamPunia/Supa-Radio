<script>
	import { fade } from 'svelte/transition';
	export let app;

	let files;
	let volume = 20;
	let prevVolume = volume;

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
		volume = 0;
		app.changeVolume(volume);
	};

	const unmuteAudioClip = () => {
		isSongMuted = false;
		if (prevVolume == 0) prevVolume = 20;
		volume = prevVolume;
		app.changeVolume(volume);
	};

	const onVolumeChange = (e) => {
		prevVolume = volume;
		if (volume == 0) {
			muteAudioClip();
		} else {
			isSongMuted = false;
			app.changeVolume(volume);
		}
	};

	const temp_function = (event) => {
		app.tempFunction(event);
	};
</script>

<div class="bottom-container">
	<div class="bottom-items">
		<input on:change={temp_function} type="file" bind:files />
		{#if !isSongPlaying}
			<i in:fade on:click={playAudioClip} class="playButton fas fa-play" />
		{:else}
			<i in:fade on:click={pauseAudioClip} class="pauseButton fas fa-pause" />
		{/if}

		<i class="fas fa-step-forward" on:click={temp_function} />

		{#if !isSongMuted}
			<i id="muteButton" class="fas fa-volume-up white" on:click={muteAudioClip} />
		{:else}
			<i id="muteButton" class="fas fa-volume-mute red" on:click={unmuteAudioClip} />
		{/if}
		<div class="volumeSlider">
			<input
				type="range"
				min="0"
				max="100"
				bind:value={volume}
				class="slider"
				on:input={onVolumeChange}
			/>
		</div>
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
			display: flex;
			margin: auto;
			font-size: 20px;
			color: white;
			padding: 1.5em 0;
			* {
				margin: 0 1em;
				cursor: pointer;
			}
		}

		.slider {
			-webkit-appearance: none; /* Override default CSS styles */
			height: 0.5em;
			background: #fff; /* Grey background */
		}
		.slider::-webkit-slider-thumb {
			border-radius: 50%;
			-webkit-appearance: none; /* Override default look */
			appearance: none;
			width: 20px; /* Set a specific slider handle width */
			height: 20px; /* Slider handle height */
			background: #5c7aea; /* Green background */
			cursor: pointer; /* Cursor on hover */
		}
	}

	.red {
		color: red;
	}

	.white {
		color: white;
	}
</style>
