<script>
	import supabase from '$lib/supabase';
    import { playlist, songIndex } from "$lib/stores/stateStore";
    import { onMount } from 'svelte';

    export let app;

    onMount(() => {
        playlistSong();
    })

	async function playlistSong() {
        let tempPlaylist = [];
		const { data, error } = await supabase.storage.from('music-files').list();
        data.map(element => {
            tempPlaylist.push(
                {
                    songName: element.name,
                    url: null
                }
            )
        })
        playlist.set(tempPlaylist);
	}
</script>

<div class="playlist-container">
	<h1>Playlist</h1>
	{#each $playlist as song, i}
		<p class={$songIndex==i?'currentSong':''}>{song.songName.split('.')[0]}</p>
	{/each}
</div>

<style lang="scss">
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
            margin-bottom: 1em;
        }
        .currentSong {
            color: #5c7aea;
        }
        p {
            font-weight: bold;
        }
	}
</style>
