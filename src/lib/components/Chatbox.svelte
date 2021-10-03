<script>
	import supabase from '$lib/supabase';

	async function addChatInput() {
		const { data, error } = await supabse
        .from("chat")
	}
</script>

<form on:submit|preventDefault={addChatInput}>
	<input type="text" />
	<button>submit</button>
</form>

<style lang="scss">
	form {
		input {
			padding: 20px;
		}
	}
</style>
