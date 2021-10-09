<script>
	import { playlist, songIndex, loading } from '$lib/stores/stateStore';
	import supabase from '$lib/supabase'

	let isToggle = false;
	let toggleIcon;
	export let app;

	function containerToggle(e) {
		isToggle = !isToggle;
		if (isToggle) toggleIcon.className = 'fas fa-music';
		else toggleIcon.className = 'fas fa-dot-circle';
	}
</script>

<div class="playlist-container">
	<div on:click={containerToggle} class="toggle-container">
		<i bind:this={toggleIcon} class="fas fa-dot-circle" />
	</div>
	{#if isToggle == false}
		<h1>Playlist</h1>
		{#each $playlist as song, i}
			<p class={$songIndex == i ? 'currentSong' : ''}>{song.songName.split('.')[0]}</p>
		{/each}
	{/if}
</div>

<style lang="scss">
	.toggle-container {
		margin: 0.5em 0;
		color: white;
		font-size: 1.5em;

		cursor: pointer;
		transition: 0.2s all ease;
		&:hover {
			color: #97ed75;
		}
	}
	.playlist-container {
		position: absolute;
		color: white;
		font-family: 'Montserrat';
		bottom: 50%;
		transform: translateY(50%);
		border-radius: 0 30px 30px 0;
		font-size: 12px;
		padding: 40px;
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.3); /* Black w/opacity/see-through */
		backdrop-filter: blur(5px);
		.currentSong {
			color: #5c7aea;
		}
		h1 {
			margin-bottom: 1em;
		}
		p {
			font-size: 1.2em;
			font-weight: bold;
			margin-bottom: 1em;
			transition: color 0.3s;
		}
	}
</style>
