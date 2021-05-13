<template>
	<div class="contact-info">
		<div class="office">
			<div class="numbers">
				<h4>{{ $prismic.asText(data.officeTitle) }}</h4>
				<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)"> <IconPhone size="16px" /> {{ $prismic.asText(number.number) }} </a>
			</div>
			<div class="location">
				<h4>{{ $prismic.asText(data.adressTitle) }}</h4>
				<a :href="map_url" target="_blank"> <IconLocation size="20px" />{{ $prismic.asText(data.adress) }}</a>
			</div>
			<div class="smedias">
				<h4>{{ $prismic.asText(data.followUsTitle)  }}</h4>
				<div class="icons">
					<a href="https://facebook.com/danica.ukraine" target="_blank">
						<IconFacebook />
					</a>
					<a href="https://www.instagram.com/danica.ua" target="_blank">
						<IconInstagram />
					</a>
					<a href="https://www.youtube.com/channel/UCfA8wYre6FEfokmx3wbxfBA" target="_blank">
						<IconYoutube />
					</a>
				</div>
			</div>
		</div>
		<div class="for_clients">
			<div class="numbers">
				<h4>{{ $prismic.asText(data.clientsTitle) }}</h4>
				<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)"> <IconPhone size="16px" /> {{ $prismic.asText(number.number) }} </a>
			</div>
			<div class="contact">
				<h4>{{ $prismic.asText(data.emailTitle) }}</h4>
				<span @click="openModal()"> <IconMail size="20px" /> info@danica.ua</span>
			</div>
			<div class="chat">
				<h4>{{ $prismic.asText(data.liveChatTitle) }}</h4>
				<div class="icons">
					<a href="https://m.me/danica.ukraine" target="_blank">
						<IconMessenger />
					</a>
					<a href="https://t.me/andreybukin" target="_blank">
						<IconTelegram />
					</a>
					<a href="viber://chat/?number=%2B380674011181" target="_blank">
						<IconViber />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: Object,
		map_url: 'https://g.page/danica-ua?share',
	}),
	async fetch() {
		const lang = this.$i18n.localeProperties.prismic;
		const contact = await this.$prismic.api.getSingle('footer', {lang})
		this.data = {
			image: contact.data.image.url,
			office: contact.data.office,
			officeTitle: contact.data.office_title,
			clientsTitle: contact.data.clients_title,
			followUsTitle: contact.data.follow_us_title,
			adressTitle: contact.data.adress_title,
			emailTitle: contact.data.email_title,
			liveChatTitle: contact.data.live_chat,
			for_clients: contact.data.for_clients,
			adress: contact.data.adress,
			
		}
	},
	methods: {
		NumberLink(number) {
			number = this.$prismic.asText(number.number)
			number = number.replace(/\D/g, '')
			return 'tel:+' + number
		},
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
	},
}
</script>

<style lang="scss" scoped>
.contact-info {
	width: 100%;
	// height: 100%;
	display: flex;
	justify-content: center;
	color: $grey;

	.office,
	.for_clients {
		width: 50%;
		display: flex;
		flex-direction: column;

		div:not(.smedias):not(.chat):not(.icons) {
			margin-bottom: 2.5rem;
		}

		& > * {
			margin-bottom: 25px;
		}

		h4 {
			color: inherit;

			font-size: 0.8rem;
			font-weight: medium;
			margin-bottom: 15px;
			user-select: none;
			&::first-letter {
				text-transform: capitalize;
			}
		}
		svg {
			fill: $primary;
			cursor: pointer;
			transition: opacity 0.2 ease;

			&:hover {
				opacity: 0.75;
			}
		}
		a {
			color: #fff;
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
		.contact span {
			cursor: pointer;
			color: $white;
		}
		.location {
			a {
				display: flex;
				align-items: flex-start;
			}
			svg {
				align-self: flex-start;
				margin-right: 10px;
			}
		}
		span {
			// cursor: pointer;
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

@media (max-width: 500px) {
	.contact-info {
		flex-wrap: wrap;
		.office,
		.for_clients {
			width: 100%;
			padding-left: 0;
		}
	}
}
</style>
