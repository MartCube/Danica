<template>
	<div class="contact_form">
		<ValidationObserver v-if="!message" ref="contact" tag="form" autocomplete="off" @submit.prevent="Submit()">
			<h2 class="title">{{ data.title }}</h2>
			<InputItem name="name" :label="data.name" rules="required" @getValue="getName" />
			<InputItem name="number" :label="data.number" rules="min:9|required" @getValue="getNumber" />
			<InputItem name="email" :label="data.email" rules="email" @getValue="getEmail" />
			<InputItem name="message" :label="data.message" rules="" @getValue="getMessage" />
			<ButtonItem white> {{ data.submit }} <Icon name="mail" /> </ButtonItem>
		</ValidationObserver>

		<div v-else class="message">
			<prismic-rich-text class="rich_text" :field="data.response" />
			<ButtonItem white> {{ data.goback }} </ButtonItem>
		</div>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
const axios = require('axios')

export default {
	components: {
		ValidationObserver,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		message: false,
		loading: false,

		form: {
			name: '',
			number: '',
			email: '',
			message: '',
			action: 'contact',
		},
	}),
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
		getName(value) {
			this.form.name = value
		},
		getNumber(value) {
			this.form.number = value
		},
		getEmail(value) {
			this.form.email = value
		},
		getMessage(value) {
			this.form.message = value
		},
		async Submit() {
			const isValid = await this.$refs.contact.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			this.form.emailTemplate = `
				<h4>Name</h4>
				<p>${this.form.name}</p>
				<h4>Number</h4>
				<p>${this.form.number}</p>
				<h4>Email</h4>
				<p>${this.form.email}</p>
				<h4>Message</h4>
				<p>${this.form.message}</p>
			`

			// trigger netlify function
			try {
				await axios.$post('.netlify/functions/sendmail', this.form)
			} catch (error) {
				console.log(error)
			}

			this.loading = false
			console.log('submited')

			this.message = !this.message
		},
	},
}
</script>

<style lang="scss">
.contact_form {
	width: 100%;
	height: 100%;
	display: flex;
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.title {
		width: max-content;
		border-bottom: 2px solid $primary;

		font-size: 2rem;
		color: $white;
		&::selection {
			color: $black;
		}
	}

	.message {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.rich_text p {
			color: $white;
			line-height: 1.5rem;
		}
		button {
			margin-top: 2rem;
		}
	}
}
@media (max-width: 420px) {
	.contact_form {
		.title {
			font-size: 1.5rem;
		}
	}
}
</style>
