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

<div class="container">
	<form on:submit|preventDefault={addChatInput}>
		<div class="form-elements">
			<input
				class="form-input"
				name="name"
				type="text"
				autocomplete="off"
				bind:this={inputField}
				bind:value={newFieldValue}
			/>
			<div class="btn">
				<button class="form-btn"><i class="fas fa-arrow-right" /></button>
			</div>
		</div>
	</form>
</div>

{#if $chat}
	{#each $chat as { name }}
		<p>{name}</p>
	{/each}
{:else}
	<i class="fas fa-spinner fa-pulse" />
{/if}

<style lang="scss">
	p {
		font-family: 'Montserrat', sans-serif;
	}
	.container {
		form {
			position: absolute;
			bottom: 20%;
			.form-elements {
				display: flex;
				input {
					outline: none;
					font-size: 24px;
					border: 3px solid white;
					border-radius: 10px;
					padding: 10px 20px 10px 20px;
					font-size: 18px;
				}
				input:focus {
					transition: 0.2s all ease;
					border: 3px solid #5c7aea;
				}

				.btn {
					button {
						// margin-left: 0.7em;
						margin: auto 0.7em;
						border: none;
						font-size: 20px;
						background-color: transparent;
						color: white;
						font-size: 35px;
						i {
							cursor: pointer;
						}
						i:hover {
							transition: 0.2s all;
							color: #5c7aea;
						}
					}
				}
			}
		}
	}
</style>
