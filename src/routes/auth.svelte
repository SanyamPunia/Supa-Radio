<script>
	import supabase from '$lib/supabase';
	import { user } from "$lib/stores/user";

	async function auth() {
		const { myUser, session, error } = await supabase.auth.signIn({
			provider: 'google'
		});

		user.set(myUser);

        // console.log(user);
	}
</script>

<h1>Sign In using Google</h1>

<form on:submit|preventDefault={auth}>
	<button>Sign In</button>
</form>