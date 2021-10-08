<script>
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Chatbox from '$lib/components/Chatbox.svelte';
import CurrentProfile from '$lib/components/CurrentProfile.svelte';
	import Playlist from '$lib/components/Playlist.svelte';
	import App from '$lib/threejs/App';
	import { onMount } from 'svelte';

	let app;
	onMount(() => {
		window.focus();
		app = new App();
		window.app = app;
	});
</script>

<Playlist {app} />
<Chatbox />
<BottomNav {app} />
<CurrentProfile />