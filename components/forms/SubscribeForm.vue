<template>
	<ValidationObserver ref="subscribe" class="subscribe" tag="form" autocomplete="off" @submit.prevent="Submit()">
		<p>{{ $t('service.form.subscriptionText') }}</p>
		<InputItem subscribe name="email" rules="email" :label="$t('service.form.email')" @getValue="GetEmail" />
	</ValidationObserver>
</template>

<script>
import { ValidationObserver, extend } from 'vee-validate'
import { email } from 'vee-validate/dist/rules'

extend('email', {
	...email,
	message: 'email not valid',
})
const axios = require('axios')
export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		message: false,
		loading: false,
		form: {
			email: '',
			action: 'subscribe',
		},
	}),
	methods: {
		GetEmail(value) {
			this.form.email = value
		},
		async Submit() {
			const isValid = await this.$refs.subscribe.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			this.form.emailTemplate = `
				<h4>${this.form.email} just subscribed.</h4>
			
			`

			// trigger netlify function
			try {
				await axios.$post('https://danica.ua/.netlify/functions/sendmail', this.form)
			} catch (error) {
				console.log(error)
			}

			this.loading = false
			console.log('submited')
			this.$router.push('/success/')
			this.$store.dispatch('bindModalContact', false)
		},
	},
}
</script>

<style lang="scss" scoped>
.subscribe {
	width: 50%;

	p {
		font-size: 1rem;
		line-height: 1.5rem;

		margin-bottom: 10px;
		color: $grey;

		&::selection {
			color: $black;
		}
	}
	.input_item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
// @media (min-width: 1700px) {
// 	.subscribe p{
// 		font-size: 1.5rem;
// 		margin-bottom: 30px;
// 	}
// }
@media (max-width: 900px) {
	.subscribe {
		width: calc(100vw - 80px);
		margin-bottom: 15px;
	}
}
// @media (max-width: 600px) {
// 	.input_item {
// 		display: flex;
// 		justify-content: space-between;
// 	}
// }
</style>
