<template>
	<footer class="footer">
		<template v-if="!$fetchState.pending">
			<div class="wrap">
				<div class="image">
					<ImageItem :src="data.image" alt="footer" />
					<div class="text"></div>
				</div>
				<div class="info">
					<div class="wrap">
						<div class="office">
							<div class="numbers">
								<h4>office:</h4>
								<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)"> <IconPhone size="16px" /> {{ $prismic.asText(number.number) }} </a>
							</div>
							<div class="location">
								<h4>find us</h4>
								<span> <IconLocation size="20px" /> Киев, ул Новозабарская 23 </span>
							</div>
							<div class="smedias">
								<h4>follow us</h4>
								<div class="icons">
									<IconFacebook />
									<IconInstagram />
									<IconYoutube />
								</div>
							</div>
						</div>
						<div class="for_clients">
							<div class="numbers">
								<h4>for clients:</h4>
								<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)"> <IconPhone size="16px" /> {{ $prismic.asText(number.number) }} </a>
							</div>
							<div class="contact">
								<h4>write us</h4>
								<span @click="openModal()"> <IconMail size="20px" /> info@danica.ua</span>
							</div>
							<div class="chat">
								<h4>live chat</h4>
								<div class="icons">
									<IconMessenger />
									<IconTelegram />
									<IconViber />
								</div>
							</div>
						</div>
					</div>

					<SubscribeForm />
				</div>
			</div>
			<div class="policy">
				<div class="links">
					<n-link to="/"> Danica {{ year }} <IconCopyRight size="16px" /></n-link>
					<span>|</span>
					<n-link to="/">All rights reserved</n-link>
				</div>
				<div class="links">
					<n-link to="/">Privacy Policy</n-link>
					<span>|</span>
					<n-link to="/">Terms and Conditions</n-link>
				</div>
			</div>
			<div class="to_top" @click="ScrollToTop">
				<IconChevron size="40px" top />
			</div>
		</template>
	</footer>
</template>

<script>
export default {
	data: () => ({
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
		openModal() {
			this.$store.dispatch('bindModalContact', true)
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

	h2,
	span,
	a {
		color: $white;
		&::selection {
			color: $black;
		}
	}
	a {
		font-weight: 400;
		transition: opacity 0.2 ease;
		&:hover {
			color: $grey;
		}
	}
	position: relative;

	.wrap {
		height: calc(100vh - 160px);
		display: flex;
		.image {
			width: 50%;

			display: flex;
			position: relative;
			z-index: 4;
			picture {
				width: 100%;
				user-select: none;
			}
		}

		.info {
			width: 50%;
			padding: 0 80px;
			padding-top: 40px;
			background: $black;

			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.wrap {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;

				.office,
				.for_clients {
					width: 50%;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;

					& > * {
						margin-bottom: 25px;
					}

					h4 {
						color: $grey;
						text-transform: capitalize;
						font-size: 0.8rem;
						font-weight: medium;
						margin-bottom: 15px;
						user-select: none;
					}
					svg {
						fill: $primary;
						cursor: pointer;
						transition: opacity 0.2 ease;

						&:hover {
							opacity: 0.75;
						}
					}
					.numbers {
						display: flex;
						flex-direction: column;

						a {
							margin-bottom: 10px;
							display: flex;
							align-items: center;
							svg {
								margin-right: 10px;
							}
						}
					}
					span {
						cursor: pointer;
						transition: all 0.2s ease;

						display: flex;
						align-items: flex-end;
						svg {
							margin-right: 10px;
						}
						&:hover {
							color: $grey;
						}
					}
					.icons {
						width: 150px;
						display: flex;
						justify-content: space-between;
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

			a {
				display: flex;
				align-items: center;
				svg {
					fill: $primary;
					margin-left: 10px;
				}
			}

			span {
				margin: 0 25px;
			}
		}
	}

	.to_top {
		position: absolute;
		top: 0;
		right: 50%;
		width: 80px;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;

		z-index: 4;
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

@media (max-width: 900px) {
	.footer {
		margin-top: 40px;
		.wrap {
			flex-direction: column;
			height: auto;
			.image {
				display: none;
			}
			.info {
				width: 100%;
				padding: 40px 0;
				padding-left: 40px;
				.wrap {
					margin: 0;
					.office,
					.for_clients {
						width: max-content;
						margin: 0;
						padding: 0;
						& > * {
							margin-bottom: 15px;
						}
						.numbers {
							h4 {
								font-size: 1rem;
							}
							a {
								margin-bottom: 15px;
								svg {
									display: initial;
								}
							}
						}
						.icons {
							margin-top: 15px;
						}
					}
				}
			}
		}
		.policy {
			height: auto;
			flex-direction: column;
			padding: 0 40px;
			.links {
				width: 100%;
				& > * {
					margin-bottom: 15px;
				}
				span {
					display: none;
				}
			}
		}
		.to_top {
			top: 0;
			right: 0;
			width: 40px;
			height: 40px;
			svg {
				width: 24px;
				height: 24px;
			}
		}
	}
}

@media (max-width: 360px) {
	.footer .policy .links {
		flex-direction: column;
	}
}
</style>
