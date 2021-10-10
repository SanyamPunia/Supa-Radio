<script>
	import supabase from '$lib/supabase';
	import { readable, get } from 'svelte/store';
	import SignInPopup from './SignInPopup.svelte';
	import { fade } from 'svelte/transition';
	import { state, userName, formFocus } from '$lib/stores/stateStore';
	import SignUpPopup from './SignUpPopup.svelte';
	import CurrentProfile from '$lib/components/CurrentProfile.svelte';

	let inputField;
	let newFieldValue = '';
	let chatDisplay;
	let isToggle = false;
	let toggleIcon;

	async function addChatInput(e) {
		const chatData = new FormData(e.target);
		const { data: chat, error } = await supabase.from('chat').insert({
			name: chatData.get('name'),
			user: $userName
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

	function containerToggle(e) {
		isToggle = !isToggle;
		if (isToggle) toggleIcon.className = 'far fa-comment-dots';
		else toggleIcon.className = 'fas fa-dot-circle';
	}
</script>

<div class="container">
	<div class="chatForm">
		<div class="toggle-container" on:click={containerToggle} >
			<i bind:this={toggleIcon} class="fas fa-dot-circle" />
		</div>
		{#if isToggle == false}
			{#if $state == 'home'}
				<div bind:this={chatDisplay} class="chat-display">
					{#if $chat}
						{#each $chat as { name, user }}
							<div class="chat-content">
								<p><span>{user}</span>: {name}</p>
							</div>
						{/each}
					{:else}
						<i class="fas fa-spinner fa-pulse" />
					{/if}
				</div>
				{#if $userName == null}
					<div class="auth-btn">
						<button
							on:click={() => {
								state.set('sign-in');
							}}
							in:fade
						>
							Join Chat
						</button>
					</div>
				{:else}
					<form on:submit|preventDefault={addChatInput}>
						<div class="form-elements">
							<input
								on:focus={e=>{formFocus.set(true)}}
								on:blur={e=>{formFocus.set(false)}}
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
				{/if}
			{:else if $state == 'sign-in'}
				<SignInPopup />
			{:else if $state == 'sign-up'}
				<SignUpPopup />
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">

	* {
		// border: 2px solid red;
	}

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
	.container {
		.auth-btn {
			text-align: center;
			margin: 1em;
			margin-bottom: 0;
			button {
				font-family: 'Montserrat', sans-serif;
				color: #fff;
				padding: 0.8em 3em;
				border: 2px solid #5c7aea;
				cursor: pointer;
				border-radius: 4px;
				font-size: 15px;
				background: transparent;
				transition: 0.2s all ease;
				font-weight: bold;
			}

			button:hover {
				background: #5c7aea;
				color: black;
			}
		}
		color: white;

		.chatForm {
			max-width: 20vw;
			overflow-x: hidden;
			.chat-display {
				max-height: 40vh;
				overflow: auto;
			}
			border-radius: 30px 0 0 30px;
			padding: 40px;
			background-color: rgb(0, 0, 0); /* Fallback color */
			background-color: rgba(0, 0, 0, 0.3); /* Black w/opacity/see-through */
			backdrop-filter: blur(5px);
			position: absolute;
			bottom: 50%;
			transform: translateY(50%);
			right: 0;
			.chat-content {
				color: white;
				font-family: 'Montserrat', sans-serif;
				display: flex;

				p {
					font-size: 1.2em;
					margin: 7px 0;
					max-width: 100%;
					overflow-wrap: break-word;
					span {
						color: rgb(151, 236, 117);
					}
				}
			}
			form {
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
	}
	@media screen and (max-width: 1400px) {
		.container {
			.chatForm {
				font-size: 0.8em;
			}
		}
	}
</style>
