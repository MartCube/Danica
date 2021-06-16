<template>
	<div class="contact-info">
		<div class="office">
			<div class="numbers">
				<h4>{{ $t('pages.contact.office') }}:</h4>
				<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)"> <IconPhone size="16px" /> {{ $prismic.asText(number.number) }} </a>
			</div>
			<div class="location">
				<h4>{{ $t('pages.contact.find_us') }}</h4>
				<a :href="map_url" rel="nofollow" target="_blank"> <IconLocation size="20px" />{{ $t('pages.contact.adress') }}</a>
			</div>
			<div class="smedias">
				<h4>{{ $t('pages.contact.follow_us') }}</h4>
				<div class="icons">
					<a href="https://facebook.com/danica.ukraine" rel="nofollow" target="_blank">
						<IconFacebook />
					</a>
					<a href="https://www.instagram.com/danica.ua" rel="nofollow" target="_blank">
						<IconInstagram />
					</a>
					<a href="https://www.youtube.com/channel/UCfA8wYre6FEfokmx3wbxfBA" rel="nofollow" target="_blank">
						<IconYoutube />
					</a>
				</div>
			</div>
		</div>
		<div class="for_clients">
			<div class="numbers">
				<h4>{{ $t('pages.contact.for_clients') }}</h4>
				<a v-for="(number, i) in data.office" :key="i" :href="NumberLink(number)"> <IconPhone size="16px" /> {{ $prismic.asText(number.number) }} </a>
			</div>
			<div class="contact">
				<h4>{{ $t('service.form.write_us') }}</h4>
				<span @click="openModal()"> <IconMail size="20px" /> info@danica.ua</span>
			</div>
			<div class="chat">
				<h4>{{ $t('pages.contact.live_chat') }}</h4>
				<div class="icons">
					<a href="https://m.me/danica.ukraine" rel="nofollow" target="_blank">
						<IconMessenger />
					</a>
					<a href="https://t.me/andreybukin" rel="nofollow" target="_blank">
						<IconTelegram />
					</a>
					<a href="viber://chat/?number=%2B380674011181" rel="nofollow" target="_blank">
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
		const contact = await this.$prismic.api.getSingle('footer', { lang: this.$i18n.localeProperties.prismic })
		this.data = {
			office: contact.data.office,
			for_clients: contact.data.for_clients,
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
			margin-bottom: 14px;
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
				margin-top: 5px;
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
// @media (min-width: 1700px) {
// 	.contact-info {
// 		.office,
// 		.for_clients {
// 			h4 {
// 				font-size: 1.3rem;
// 			}
// 			div:not(.smedias):not(.chat):not(.icons) {
// 				margin-bottom: 3.5rem;
// 			}
// 		}
// 		svg {
// 			width: 25px;
// 			height: 25px;
// 		}
// 		.for_clients {
// 			span {
// 				align-items: center;
// 			}
// 			.location svg {
// 				margin-top: 10px;
// 			}
// 		}
// 	}
// }
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
