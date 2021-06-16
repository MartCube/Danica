<template>
	<VueIfBot>
		<CookieConsent>
			<template slot="message">
				<span>
					{{ $t('cookie.message') }}
					<n-link :to="localePath('/privacy-policy')">{{ $t('cookie.policy') }}</n-link>
				</span>
			</template>
			<template slot="button">
				<ButtonItem class="btn btn-info" :animated="false">
					{{ $t('cookie.button') }}
				</ButtonItem>
			</template>
		</CookieConsent>
	</VueIfBot>
</template>

<script>
import VueIfBot from 'vue-if-bot/dist/vue-if-bot.es'
export default {
	components: {
		VueIfBot,
	},
	computed: {},
}
</script>

<style lang="scss">
.cookie-consent {
	width: 100%;
	height: 80px;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 9;

	display: flex;
	justify-content: center;
	align-items: center;

	background: $line;
	color: $black;
	a {
		color: inherit;
		text-decoration: underline;
		font-weight: 400;
	}

	section {
		padding-top: 0;
		button {
			margin-left: 40px;
			padding: 8px 30px;
			font-size: inherit;
		}
	}
}

@media (max-width: 900px) {
	.cookie-consent {
		flex-direction: column;
		align-items: flex-start;
		padding: 10px 40px;
		height: auto;
		bottom: initial;
		top: 60px;
		span {
			display: flex;
			flex-direction: column;

			& > * {
				margin: 10px 0;
			}
		}
		section button {
			margin: 0;
		}
	}
}
</style>
