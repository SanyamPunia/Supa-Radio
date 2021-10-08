<script>
	import { fade } from 'svelte/transition';
	import { songIndex, playlist } from '$lib/stores/stateStore';
	import supabase from '$lib/supabase';

	export let app;

	let files;
	let volume = 20;
	let prevVolume = volume;
	let loading = false;

	let isSongPlaying = false;
	let isSongMuted = false;

	const playAudioClip = async () => {
		loading = true;
		isSongPlaying = true;
		let songUrl;
		if ($playlist[$songIndex].url == null) {
			const { data, error } = await supabase.storage
				.from('music-files')
				.download($playlist[$songIndex].songName);
			console.log(data);
			songUrl = URL.createObjectURL(data);
			$playlist[$songIndex].url = songUrl;
		} else {
			songUrl = $playlist[$songIndex].url;
		}
		app.playSound(songUrl);
		loading = false;
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

	const nextSong = () => {
		pauseAudioClip();
		songIndex.set(($songIndex + 1) % $playlist.length);
		playAudioClip();
	};

	const prevSong = () => {
		pauseAudioClip();
		if ($songIndex == 0) songIndex.set($playlist.length - 1);
		else songIndex.set($songIndex - 1);
		playAudioClip();
	};
</script>

<div class="bottom-container">
	<div class="bottom-items">
		<div class="nowPlayingContainer">
			{#if $playlist.length > 0}
				<span class="green">Now Playing</span>{$playlist[$songIndex].songName.split(".")[0]}
			{/if}
		</div>
		<div class="songControls">
			{#if !loading}
			<i class="fas fa-step-backward" on:click={prevSong} />
			{#if !isSongPlaying}
				<i in:fade on:click={playAudioClip} class="playButton fas fa-play" />
			{:else}
				<i in:fade on:click={pauseAudioClip} class="pauseButton fas fa-pause" />
			{/if}

			<i class="fas fa-step-forward" on:click={nextSong} />
			{:else}
			<i class="fas fa-spinner fa-pulse"></i>
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
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			place-items: center;
			width: 100%;
			font-size: 20px;
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

			.songControls {
				justify-self: center;
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
