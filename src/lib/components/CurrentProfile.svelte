<script>
	import { userName } from '$lib/stores/stateStore';
	import supabase from '$lib/supabase';


    async function logOut() {
        const { error } = await supabase.auth.signOut()
        
        console.log(error);
        userName.set(null);
    }
</script>

{#if $userName != null}
	<div class="profile-container">
		<div class="profile">
			<p>
				<span>{$userName}</span>
				<i class="fas fa-user" />
				<i on:click={logOut} class="fas fa-sign-out-alt" />
			</p>
		</div>
	</div>
{/if}

<style lang="scss">
	.profile-container {
		position: absolute;
		right: 2em;
		top: 2em;
		.profile {
			p {
				color: #fff;
				font-family: 'Montserrat';
				display: flex;
				align-items: center;
				background-color: rgb(0, 0, 0); /* Fallback color */
				background-color: rgba(0, 0, 0, 0.3); /* Black w/opacity/see-through */
				backdrop-filter: blur(5px);
				padding: 10px;

				span {
					color: #5c7aea;
					font-weight: bold;
					transition: 0.2s all ease;
					margin-right: 1em;
					font-size: 20px;
				}
				span:hover {
					color: rgb(151, 236, 117);
					cursor: default;
				}

				.fa-sign-out-alt {
					display: none;

                    transition: 0.2s all ease;
				}
			}

			p:hover {
				.fa-sign-out-alt {
                    display: flex;
                    margin-left: 1em;
                    cursor: pointer;
                }
                .fa-sign-out-alt:hover {
                    color: rgb(151, 236, 117);
                }
			}
		}
	}
</style>
