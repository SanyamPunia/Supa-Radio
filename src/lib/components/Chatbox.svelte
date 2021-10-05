<script>
	import supabase from '$lib/supabase';
	import { readable, get } from 'svelte/store';

	let inputField;
	let newFieldValue = '';
	let chatDisplay;

	async function addChatInput(e) {
		const chatData = new FormData(e.target);
		const { data: chat, error } = await supabase.from('chat').insert({
			name: chatData.get('name')
		});
		console.log(error);
		inputField.value = '';
		chatDisplay.scrollTop = chatDisplay.scrollHeight;
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
		<div bind:this={chatDisplay} class="chat-display">
			{#if $chat}
				{#each $chat as { name }}
					<div class="chat-content">
						<p>{name}</p>
					</div>
				{/each}
			{:else}
				<i class="fas fa-spinner fa-pulse" />
			{/if}
		</div>
		<div class="form-elements">
			<input
				required
				placeholder="Enter Message..."
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

<style lang="scss">
	.container {
		.chat-display {
			max-height: 30em;
			overflow: auto;
		}
		form {
			border-radius: 30px;
			padding: 40px;
			background-color: rgb(0, 0, 0); /* Fallback color */
			background-color: rgba(0, 0, 0, 0.3); /* Black w/opacity/see-through */
			backdrop-filter: blur(5px);
			position: absolute;
			bottom: 20%;
			right: 0;
			.chat-content {
				color: white;
				font-family: 'Montserrat', sans-serif;
				display: flex;

				p {
					font-size: 20px;
					margin: 7px 0;
				}
			}
			.form-elements {
				padding-top: 20px;
				display: flex;
				input {
					outline: none;
					font-size: 24px;
					border: 3px solid white;
					border-radius: 10px;
					padding: 7px 15px 7px 15px;
					font-size: 18px;
				}
				input:focus {
					transition: 0.2s all ease;
					border: 3px solid #5c7aea;
				}

				.btn {
					margin-top: 0.5em;
					button {
						margin: auto 0.7em;
						border: none;
						background-color: transparent;
						color: white;
						font-size: 25px;
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
