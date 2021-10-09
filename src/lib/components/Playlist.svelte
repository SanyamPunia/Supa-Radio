<script>
	import supabase from '$lib/supabase';
	import { playlist, songIndex } from '$lib/stores/stateStore';
	import { onMount } from 'svelte';

	export let app;
	let isToggle = false;

	onMount(() => {
		playlistSong();
	});

	async function playlistSong() {
		let tempPlaylist = [];
		const { data, error } = await supabase.storage.from('music-files').list();
		data.map((element) => {
			tempPlaylist.push({
				songName: element.name,
				url: null
			});
		});
		playlist.set(tempPlaylist);
	}

	function containerToggle(e) {
		isToggle = !isToggle;
		if (isToggle) e.target.className = 'toggle-container fas fa-music';
		else e.target.className = 'toggle-container fas fa-dot-circle';
	}
</script>

<div class="playlist-container">
	<div on:click={containerToggle} class="toggle-container">
		<i class="fas fa-music" />
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
			color: rgb(151, 236, 117);
		}
	}
	.playlist-container {
		position: absolute;
		color: white;
		font-family: 'Montserrat';
		bottom: 50%;
		transform: translateY(50%);
		border-radius: 0 30px 30px 0;
		padding: 40px;
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.3); /* Black w/opacity/see-through */
		backdrop-filter: blur(5px);
		* {
			// margin-bottom: 1em;
		}
		.currentSong {
			color: #5c7aea;
		}
		h1 {
			margin-bottom: 1em;
		}
		p {
			font-weight: bold;
			margin-bottom: 1em;
		}
	}
</style>
