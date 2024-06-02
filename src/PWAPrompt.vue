<!-- PWAPrompt.vue -->
<template>
	<div class="prompt" v-if="shown">
		<div class="prompt-body">
			<h3>Add app to home screen?</h3>
			<div class="button-group">
				<button class="prompt-button" @click="installPWA">
					Install!
				</button>
				<button class="prompt-button" @click="dismissPrompt">
					No, thanks
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		shown: false,
	}),

	beforeMount() {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault()
			this.installEvent = e
			this.shown = true
		})
	},

	methods: {
		dismissPrompt() {
			this.shown = false
		},

		installPWA() {
			this.installEvent.prompt()
			this.installEvent.userChoice.then((choice) => {
				this.dismissPrompt() // Hide the prompt once the user's clicked
				if (choice.outcome === 'accepted') {
					// Do something additional if the user chose to install
				} else {
					// Do something additional if the user declined
				}
			})
		},
	}
}
</script>

<style scoped>
.prompt {
	position: fixed;
	z-index: 9999;
	backdrop-filter: blur(2px);
	-webkit-backdrop-filter: blur(2px);
	width: 100vw;
	height: 100vh;
	right: 0;
	top: 0;
	background: rgba(136, 136, 136, 0.233);
}

.prompt-body {
	margin: auto;
	position: relative;
	margin-top: 10px;
	width: 300px;
	height: 120px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background: white;
	border-radius: 20px;
}

.button-group {
	margin-top: 10px;
	display: flex;
	width: 100%;
	justify-content: space-evenly;
}

.prompt-button {
	padding: 10px;
	background-color: blueviolet;
	border-radius: 10px;
	outline: none;
	color: white;
	cursor: pointer;
}
</style>