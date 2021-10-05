<script>
	import supabase from '$lib/supabase';
	import { readable, get } from 'svelte/store';

	let inputField;
	let newFieldValue = '';

	async function addChatInput(e) {
		const chatData = new FormData(e.target);
		const { data: chat, error } = await supabase.from('chat').insert({
			name: chatData.get('name')
		});
		console.log(error);
		inputField.value = '';
	}

	const chat = readable(null, (set) => {
		supabase
			.from('chat')
			.select('*')
			.then(({ error, data }) => set(data));

		//subscription
		const subscription = supabase
			.from('chat')
			.on('INSERT', (payload) => {
				set([...get(chat), payload.new]);
			})
			.subscribe();

		return () => supabase.removeSubscription(subscription);
	});
</script>

<form on:submit|preventDefault={addChatInput}>
	<input
		name="name"
		type="text"
		autocomplete="off"
		bind:this={inputField}
		bind:value={newFieldValue}
	/>
	<button>submit</button>
</form>

{#if $chat}
	{#each $chat as { name }}
		<p>{name}</p>
	{/each}
{:else}
	<i class="fas fa-spinner fa-pulse" />
{/if}