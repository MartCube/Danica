<template>
	<div class="container">
		<Title value="contact" />

		<div class="wrap">
			<div class="left_content">
				<template v-if="!$fetchState.pending">
					<h3 class="title">Мы всегда рады новым знакомствам, напишите нам</h3>
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
					<ContactForm />
				</template>
			</div>
			<div class="map">
				<a target="_blank" :href="map_url">
					<p class="hint">Tap to open in Google maps</p>
					<ImageItem :src="map_image" alt="map" />
				</a>
				
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
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: Object,
		map_image: './map.png',
		map_url: 'https://g.page/danica-ua?share',
	}),
	async fetch() {
		const contact = await this.$prismic.api.getSingle('footer')
		this.data = {
			image: contact.data.image.url,
			office: contact.data.office,
			for_clients: contact.data.for_clients,
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
.container {
	background: $black;
	margin-bottom: 0;
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
		transition: opacity 0.2s ease;
		&:hover {
			color: $grey;
		}
	}
	h3.title {
		color: $grey;
		width: 100%;
		padding-right: 50%;
		margin-bottom: 3rem;
		font-weight: 500;
	}
	.wrap {
		width: 100%;
		display: flex;
		flex-wrap: wrap;

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

		.contact_form {
			color: $white;
			display: flex;
			min-height: 30rem;
			width: 75%;
			margin-top: 3rem;
		}
		.left_content {
			width: 70%;
			padding-left: 240px;
			padding-bottom: 3rem;
			display: flex;
			flex-wrap: wrap;
			height: fit-content;

			.office,
			.for_clients {
				h4 {
					color: $white;
					text-transform: capitalize;
					font-size: 0.8rem;
					font-weight: medium;
					margin-bottom: 1.5rem;
					user-select: none;
				}
				width: 50%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;

				& > * {
					margin-bottom: 3rem;
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
						&:last-child {
							margin: 0;
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
		.map {
			position: relative;
			width: 30%;

			.hint{
				position: absolute;
				top: 1rem;
				left: 1rem;
				color: $black;
				z-index: 4;
				font-weight: 500;
			}
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.title {
	color: $white;
	&::selection {
		color: $black;
	}
}

@media (max-width: 1200px) {
	.container {
		h3.title {
			padding-right: 20%;
		}
		.wrap .left_content {
			.for_clients {
				padding-left: 0;
			}
			.office,
			.for_clients {
				width: 100%;
			}
		}
	}
}
@media (max-width: 900px) {
	.container {
		.wrap {
			.left_content {
				padding-left: 50px;
				padding-bottom: 3rem;
				width: 60%;
				.for_clients {
					padding-left: 0;
				}
				.office,
				.for_clients {
					width: 100%;
				}
			}
			.map {
				width: 40%;
				max-height: 50vh;
				margin-top: 4rem;
			}
			.contact_form {
				width: 85%;
			}
			.policy {
				height: auto;
				flex-direction: column;
				padding: 40px;
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
		}
	}
}

@media (max-width: 650px) {
	.container {
		.wrap {
			.left_content {
				padding-left: 40px;
				padding-bottom: 0;
				width: 100%;
				.office,
				.for_clients {
					width: 100%;
				}
			}
			.map {
				width: 100%;
			}
			.contact_form {
				width: 90%;
			}
		}
	}
}
</style>
