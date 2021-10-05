<script>
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Chatbox from '$lib/components/Chatbox.svelte';
	import App from '$lib/threejs/App';
	import { onMount } from 'svelte';

	import { user } from "$lib/stores/user";
	console.log($user);
	let app;

	onMount(() => {
		window.focus();
		app = new App();
		window.app = app;
	});
</script>

<BottomNav {app} />
<Chatbox />