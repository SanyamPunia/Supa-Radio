<slot />

<style lang="scss">
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(::-webkit-scrollbar) {
		width: 5px;
	}
	:global(::-webkit-scrollbar-track) {
		background-color: #fff;
	}
	:global(::-webkit-scrollbar-thumb) {
		background-color: #5c7aea;
	}
</style>
