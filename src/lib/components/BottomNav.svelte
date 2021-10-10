<script>
	import { fade } from 'svelte/transition';
	import { songIndex, playlist, loading } from '$lib/stores/stateStore';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';

	export let app;

	let volume = 20;
	let prevVolume = volume;

	let isSongPlaying = false;
	let isSongMuted = false;
	let visualizers = ['stars', 'cubes'];
	let activeVisualizer = visualizers[0];
	let progressBar;

	let currentSongStatus = {
		callback: () => {
			nextSong();
		}
	};

	onMount(async () => {
		$loading = true;
		let songUrl;
		if ($playlist[$songIndex].url == null) {
			const { data, error } = await supabase.storage
				.from('music-files')
				.download($playlist[$songIndex].songName);
			songUrl = URL.createObjectURL(data);
			$playlist[$songIndex].url = songUrl;
		}
		app.changeSound(songUrl);
		app.addProgressEvent(progressBar);
		app.addSongEndEvent(currentSongStatus);
		changeVisualizer();
		$loading = false;
	});

	const playAudioClip = async () => {
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

	const nextSong = async () => {
		pauseAudioClip();
		$loading = true;
		songIndex.set(($songIndex + 1) % $playlist.length);
		let songUrl;
		if ($playlist[$songIndex].url == null) {
			const { data, error } = await supabase.storage
				.from('music-files')
				.download($playlist[$songIndex].songName);
			songUrl = URL.createObjectURL(data);
			$playlist[$songIndex].url = songUrl;
		}
		app.changeSound(songUrl);
		$loading = false;
		playAudioClip();
	};

	const prevSong = async () => {
		$loading = true;
		pauseAudioClip();
		if ($songIndex == 0) songIndex.set($playlist.length - 1);
		else songIndex.set($songIndex - 1);
		let songUrl;
		if ($playlist[$songIndex].url == null) {
			const { data, error } = await supabase.storage
				.from('music-files')
				.download($playlist[$songIndex].songName);
			songUrl = URL.createObjectURL(data);
			$playlist[$songIndex].url = songUrl;
		} else {
			songUrl = $playlist[$songIndex].url;
		}
		app.changeSound(songUrl);
		$loading = false;
		playAudioClip();
	};

	const changeVisualizer = () => {
		visualizers.forEach((element) => {
			if (element == activeVisualizer) {
				app.setActiveVisualizer(activeVisualizer);
			}
		});
	};

	const handleSpacebar = (e) => {
		if (e.keyCode == 32) {
			if (isSongPlaying) pauseAudioClip();
			else playAudioClip();
		}
	};
</script>

<svelte:window on:keydown={handleSpacebar} />

<div class="bottom-container">
	<div class="bottom-items">
		<div bind:this={progressBar} class="progressBar" />

		<div class="nowPlayingContainer">
			{#if $playlist.length > 0}
				<span class="green">Now Playing</span>{$playlist[$songIndex].songName.split('.')[0]}
			{/if}
		</div>
		<div class="songControls">
			{#if !$loading}
				<i class="fas fa-step-backward" on:click={prevSong} />
				{#if !isSongPlaying}
					<i in:fade on:click={playAudioClip} class="playButton fas fa-play" />
				{:else}
					<i in:fade on:click={pauseAudioClip} class="pauseButton fas fa-pause" />
				{/if}

				<i class="fas fa-step-forward" on:click={nextSong} />
			{:else}
				<i class="fas fa-spinner fa-pulse" />
			{/if}
		</div>

		<div class="volumeSlider">
			{#if !isSongMuted}
				<i id="muteButton" class="fas fa-volume-up white" on:click={muteAudioClip} />
			{:else}
				<i id="muteButton" class="fas fa-volume-mute red" on:click={unmuteAudioClip} />
			{/if}
			<input
				type="range"
				min="0"
				max="100"
				bind:value={volume}
				class="slider"
				on:input={onVolumeChange}
			/>
		</div>
		<div class="selectVisualizer">
			<select bind:value={activeVisualizer} on:change={changeVisualizer}>
				{#each visualizers as visualizer}
					<option>{visualizer}</option>
				{/each}
			</select>
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
		max-height: 10vh;

		.bottom-items {
			position: relative;
			display: grid;
			grid-template-columns: 3fr 3fr 2fr 1fr;
			place-items: center;
			width: 100%;
			font-size: 1em;
			color: white;
			padding: 1.5em 0;
			* {
				margin: 0 1em;
				cursor: pointer;
			}
			.nowPlayingContainer {
				font-family: 'Montserrat';
				.green {
					color: rgb(151, 236, 117);
				}
			}

			.progressBar {
				background: rgb(151, 236, 117);
				position: absolute;
				top: 0;
				left: 0;
				height: 2px;
				width: 0;
				margin: 0;
			}

			.selectVisualizer {
				select {
					background: none;
					border: none;
					font-family: 'Montserrat', sans-serif;
					color: #fff;
					padding: 0.3em;
					border: 2px solid #5c7aea;
					cursor: pointer;
					border-radius: 4px;
					font-size: 15px;
					background: transparent;
					transition: 0.2s all ease;
					font-weight: bold;
					text-transform: capitalize;
					option {
						color: black;
					}
				}
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

	@media screen and (max-width: 1400px) {
		.bottom-container {
			.bottom-items {
				font-size: 0.8em;
			}
		}
	}
</style>
