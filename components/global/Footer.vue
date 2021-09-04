<template>
	<footer v-show="footer" class="footer">
		<template v-if="!$fetchState.pending">
			<div class="wrap">
				<div class="image">
					<ImageItem :src="data.image" alt="footer" />
					<div class="text"></div>
				</div>
				<div class="info">
					<ContactInfo />
					<SubscribeForm />
				</div>
			</div>
			<div class="policy">
				<div class="links">
					<n-link to="/"> Danica {{ year }} <Icon name="copyright" size="16px" /></n-link>
					<span>|</span>
					<p>{{ $prismic.asText(data.all_rights_reserved) }}</p>
				</div>
				<div class="links">
					<n-link :to="localePath('/privacy-policy')">{{ $prismic.asText(data.privacy_policy) }}</n-link>
				</div>
			</div>
			<div class="to_top" @click="ScrollToTop">
				<Icon name="chevron" fill="hsl(0, 0%, 10%)" size="32px" direction="top" />
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
		const footer = await this.$prismic.api.getSingle('footer', { lang: this.$i18n.localeProperties.prismic })
		this.data = {
			image: footer.data.image.url,
			office: footer.data.office,
			for_clients: footer.data.for_clients,
			all_rights_reserved: footer.data.all_rights_reserved,
			privacy_policy: footer.data.privacy_policy,
		}
		// console.log(this.data);
	},
	computed: {
		year() {
			return new Date().getFullYear()
		},
		footer() {
			return this.$store.getters.footer
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
	z-index: 3;

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
			picture {
				width: 100%;
				user-select: none;
			}
		}

		.info {
			width: 50%;
			padding: 80px 80px 0 80px;
			background: $black;

			display: flex;
			flex-direction: column;
			justify-content: space-between;
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
		z-index: 5;
		background: $black;
		.links {
			display: flex;
			justify-content: space-between;
			justify-items: center;
			align-items: center;
			p {
				color: $white;
				font-size: 1rem;
				font-weight: 400;
			}
			a {
				display: flex;
				align-items: center;
				svg {
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

		&:hover {
			svg {
				transform: rotate(-90deg) scale(1.2);
			}
		}
	}
}
// @media (min-width: 1700px) {
// 	.footer .policy .links p {
// 		font-size: 1.5rem;
// 	}
// }
@media (max-width: 900px) {
	.footer {
		.wrap {
			flex-direction: column;
			height: auto;
			.image {
				display: none;
			}
			.info {
				width: 100%;
				padding: 40px;
				.wrap {
					margin: 0;
					.office,
					.for_clients {
						width: 100%;
						margin: 0;
						padding: 0;
						& > * {
							margin-bottom: 2rem;
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
