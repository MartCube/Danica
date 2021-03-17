<template>
	<footer class="footer">
		<template v-if="!$fetchState.pending">
			<div class="wrap">
				<div class="image">
					<div class="to_top" @click="ScrollToTop">
						<IconArrow size="40px" top />
					</div>
					<ImageItem :src="data.image" alt="footer" />
					<div class="text"></div>
				</div>
				<div class="info">
					<h2 class="title">Call us</h2>
					<div class="wrap">
						<div class="office">
							<div class="numbers">
								<h4>office:</h4>
								<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)">
									{{ $prismic.asText(number.number) }}
								</a>
							</div>
							<span>Киев, ул Новозабарская 23 </span>
							<div class="icons">
								<IconFacebook />
								<IconInstagram />
								<IconYoutube />
							</div>
						</div>
						<div class="for_clients">
							<div class="numbers">
								<h4>for clients:</h4>
								<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)">
									{{ $prismic.asText(number.number) }}
								</a>
							</div>
							<span @click="ToggleModal(true)">info@danica.ua</span>
							<div class="icons">
								<IconMessenger />
								<IconTelegram />
								<IconViber />
							</div>
						</div>
					</div>

					<SubscribeForm />
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
			<ContactModal v-show="modalContact" @closeModal="ToggleModal(false)" />
		</template>
	</footer>
</template>

<script>
export default {
	data: () => ({
		modalContact: false,
		data: Object,
	}),
	async fetch() {
		const footer = await this.$prismic.api.getSingle('footer')
		this.data = {
			image: footer.data.image.url,
			office: footer.data.office,
			for_clients: footer.data.for_clients,
		}
	},
	computed: {
		year() {
			return new Date().getFullYear()
		},
	},
	methods: {
		ToggleModal(value) {
			this.modalContact = value
		},
		ScrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		NumberLink(number) {
			number = this.$prismic.asText(number.number)
			number = number.replace(/\D/g, '')
			return 'tel:+' + number
		},
	},
}
</script>

<style lang="scss" scoped>
.footer {
	width: 100%;

	display: flex;
	flex-direction: column;

	color: $white;

	a {
		font-weight: 400;
		color: $white;
		transition: opacity 0.2 ease;
		&:hover {
			color: $grey;
		}
	}

	.wrap {
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
			.to_top {
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

				svg {
					transition: all 0.35s ease;
				}
				&:hover {
					svg {
						transform: rotate(-90deg) scale(1.2);
					}
				}
			}
		}

		.info {
			width: 50%;
			padding: 50px 100px;
			background: $black;

			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				width: max-content;
				border-bottom: 2px solid $primary;
				font-size: 2rem;
			}
			.wrap {
				margin: 50px 0;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;

				.office,
				.for_clients {
					width: 50%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.numbers {
						display: flex;
						flex-direction: column;
						h4 {
							color: $grey;
							text-transform: capitalize;
							font-size: 0.8rem;
							font-weight: medium;
							margin-bottom: 25px;
							user-select: none;
						}
						a {
							margin-bottom: 10px;
						}
					}
					span {
						cursor: pointer;
						transition: all 0.2s ease;
						&:hover {
							color: $grey;
						}
					}
					.icons {
						width: 150px;
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
				.for_clients {
					padding-left: 50px;
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

			span {
				margin: 0 25px;
			}
		}
	}
}
</style>
