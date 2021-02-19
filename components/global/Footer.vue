<template>
	<div class="footer">
		<div class="group">
			<div class="image">
				<div class="map" @click="ScrollToTop">
					<IconArrow size="40px" />
				</div>
				<ImageItem :src="data.image.url" alt="footer" />
				<div class="text"></div>
			</div>
			<div class="info">
				<h2 class="title">Call us</h2>
				<div class="wrap">
					<div class="numbers">
						<h4>Office:</h4>
						<p v-for="(number, i) in data.office" :key="i">
							{{ $prismic.asText(number.number) }}
						</p>
					</div>
					<div class="numbers">
						<h4>For clients:</h4>
						<p v-for="(number, i) in data.for_clients" :key="i">
							{{ $prismic.asText(number.number) }}
						</p>
					</div>
				</div>
				<div class="wrap">
					<span>Киев, ул Новозабарская 23 </span>
					<span @click="toggleModal(true)">info@danica.ua</span>
				</div>
				<div class="wrap">
					<div class="icons">
						<IconFacebook outlined />
						<IconInstagram />
						<IconYoutube />
					</div>
					<div class="icons">
						<IconMessenger />
						<IconTelegram />
						<IconViber />
					</div>
				</div>
				<ValidationObserver ref="subscribe" class="subscribe" tag="form" autocomplete="off" @submit.prevent="Submit()">
					<p>Stay up to date with the latest news</p>
					<InputItem subscribe name="email" rules="email" @getValue="getEmail" />
				</ValidationObserver>
			</div>
		</div>
		<div class="policy">
			<div class="links">
				<IconCopyRight size="16px" />
				<n-link to="/"> Danica {{ year }}</n-link>
				<span>|</span>
				<n-link to="/">All rights reserved</n-link>
			</div>
			<div class="links">
				<n-link to="/">Privacy Policy</n-link>
				<span>|</span>
				<n-link to="/">Terms and Conditions</n-link>
			</div>
		</div>
		<ModalContact v-show="modalContact" @closeModal="toggleModal(false)" />
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		modalContact: false,
		loading: false,
		data: {
			image: '',
			office: [],
			for_clients: [],
		},
		form: {
			email: '',
			action: 'subscribe',
		},
	}),
	async fetch() {
		const data = await this.$prismic.api.getSingle('footer')
		this.data = data.data
	},
	computed: {
		year() {
			return new Date().getFullYear()
		},
	},
	methods: {
		toggleModal(value) {
			this.modalContact = value
		},
		getEmail(value) {
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
				await this.$axios.$post('.netlify/functions/sendmail', this.form)
			} catch (error) {
				console.log(error)
			}

			this.loading = false
			console.log('submited')
		},
		ScrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.footer {
	width: 100%;
	margin-top: 100px;

	display: flex;
	flex-direction: column;

	color: white;

	.group {
		height: calc(100vh - 160px);
		display: flex;
		.image {
			width: 50%;

			display: flex;
			position: relative;
			img {
				width: 100%;
				user-select: none;
			}
			.map {
				position: absolute;
				top: 0;
				right: 0;
				width: 80px;
				height: 80px;
				display: flex;
				justify-content: center;
				align-items: center;

				z-index: 2;
				background: $primary;
				cursor: pointer;
				transform: rotate(-90deg);

				svg {
					transition: all 0.35s ease;
				}
				&:hover {
					svg {
						transform: translateX(5px);
					}
				}
			}
		}

		.info {
			width: 50%;
			padding: 50px 50px 50px 100px;
			background: $black;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 2rem;
				width: max-content;
				border-bottom: 2px solid $primary;
			}
			.wrap {
				display: flex;
				justify-content: space-between;

				.numbers {
					h4 {
						font-size: 0.8rem;
						font-weight: medium;
						opacity: 0.75;
						margin-bottom: 25px;
						user-select: none;
					}
					p {
						margin-bottom: 10px;
					}
				}
				span {
					cursor: pointer;
					transition: all 0.2s ease;
					&:hover {
						opacity: 0.75;
					}
				}
				.icons {
					width: 25%;
					display: flex;
					justify-content: space-between;
					svg {
						fill: $primary;
						cursor: pointer;
						transition: opacity 0.2 ease;

						&:hover {
							opacity: 0.75;
						}
					}
				}
			}
			.subscribe {
				width: 50%;
				p {
					margin-bottom: 10px;
				}
			}
		}
	}

	.policy {
		width: 100%;
		height: 80px;
		padding: 0 50px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;

		background: $black;
		.links {
			display: flex;
			justify-content: space-between;
			justify-items: center;

			svg {
				fill: $primary;
				margin-right: 10px;
			}
			a {
				font-weight: 400;
				color: white;
				transition: opacity 0.2 ease;
				&:hover {
					opacity: 0.75;
				}
			}
			span {
				margin: 0 25px;
			}
		}
	}
}
</style>
