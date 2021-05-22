<template>
	<div class="container">
		<Title :value="$t('pages.contact.name')" />

		<div class="wrap">
			<div class="left_content">
				<template v-if="!$fetchState.pending">
					<h3 class="title">{{ $t('pages.contact.title') }}</h3>
					<ContactInfo />
					<ContactForm :data="contactFormData" />
				</template>
			</div>
			<div class="map">
				<a target="_blank" :href="map_url">
					<p class="hint">{{ $t('pages.contact.tap_to_open') }}</p>
					<ImageItem :src="map_image" alt="map" />
				</a>
			</div>
			<div class="policy">
				<div class="links">
					<n-link to="/"> Danica {{ year }} <IconCopyRight size="16px" /></n-link>
					<span>|</span>
					<p>{{ $prismic.asText(data.all_rights_reserved) }}</p>
				</div>
				<div class="links">
					<n-link :to="localePath('/privacy-policy')">{{ $prismic.asText(data.privacy_policy) }}</n-link>
					<!-- <span>|</span>
					<n-link :to="localePath('/policy')">{{ $t('service.footer.terms') }}</n-link> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ContactInfo from '~/components/local/ContactInfo.vue'
export default {
	components: { ContactInfo },
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindFooter', true)
		next()
	},
	middleware: 'footer',
	data: () => ({
		data: Object,
		contactFormData: Object,
		map_image: '../map.png',
		map_url: 'https://g.page/danica-ua?share',
	}),
	async fetch() {
		const formData = await this.$prismic.api.getSingle('contact_form',{ lang : this.$i18n.localeProperties.prismic })
		this.contactFormData = {
			title: formData.data.title,
			name: formData.data.name,
			number: formData.data.number,
			submit: formData.data.submit,
			email: formData.data.email,
			message: formData.data.message,
			response: formData.data.response,
			goback: formData.data.goback,
		}
		const contact = await this.$prismic.api.getSingle('footer')
		// console.log(contact);
		this.data = {
			image: contact.data.image.url,
			office: contact.data.office,
			for_clients: contact.data.for_clients,
			all_rights_reserved: contact.data.all_rights_reserved,
			privacy_policy: contact.data.privacy_policy,
		}
	},
	computed: {
		year() {
			return new Date().getFullYear()
		},
	},
	methods: {
		ScrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
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
		padding-left: 2rem;

		.policy {
			width: 100%;
			height: 80px;
			padding: 0 2rem 0 240px;

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

			.contact-info {
				color: $white;
			}
			.for_clients {
				padding-left: 50px;
			}
		}
		.map {
			position: relative;
			width: 30%;
			.hint {
				position: absolute;
				top: 1rem;
				left: 40px;
				color: $black;
				background: $primary;
				padding: 2px 10px;
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
			padding-left: 0;

			.left_content {
				padding-left: 56px;
				padding-bottom: 3rem;
				width: 100%;
				.for_clients {
					padding-left: 0;
				}
				.office,
				.for_clients {
					width: 100%;
				}
			}
			.map {
				width: 100%;
				max-height: 50vh;
				margin-top: 4rem;
				z-index: 6;
			}
			.contact_form {
				width: 85%;
			}
			.policy {
				height: auto;
				flex-direction: column;
				padding: 16px 16px 16px 56px;
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
