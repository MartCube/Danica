<template>
	<header class="navbar" :class="{ transparent_to_white: whiteNavbar && transparent, transparent: transparent }">
		<div class="top-content" :class="{ hide: !topHeader }">
			<ButtonItem @click.native="openModal"> {{ $t('service.form.write_us') }} </ButtonItem>
			<!-- <address> -->
			<a href="mailto:info@danica.ua" class="email">
				<Icon name="mail" :size="topHeaderIconSize" :fill="topHeaderIconColor" />
				info@danica.ua
			</a>
			<a href="tel:+380973591111" class="phone">
				<Icon name="phone" :size="topHeaderIconSize" :fill="topHeaderIconColor" />
				+38(097)-359-11-11
			</a>
			<span class="schedule">
				<Icon name="clock" :size="topHeaderIconSize" :fill="topHeaderIconColor" />
				пн-пт 10:00 -18:00
			</span>
			<!-- </address> -->
		</div>

		<n-link class="logo" exact :to="localePath('index')" @click.native="CloseMenu">
			<Logo />
		</n-link>

		<div class="lang">
			<div class="current_locale" @click="showLocales = !showLocales">
				<span>{{ currentLocale }}</span>
			</div>

			<n-link v-for="locale in availableLocales" :key="locale.code" class="locale" :to="switchLocalePath(locale.code)" @click.native="showLocales = false">
				{{ locale.code }}
			</n-link>
		</div>

		<template v-if="!$fetchState.pending && !$fetchState.error">
			<ul class="links" :class="{ active: isActive }" @click="CloseMenu">
				<li v-for="item in data.links" :key="item.link.uid">
					<n-link exact :to="localePath(`/${item.link.uid}/`)">{{ item.name }}</n-link>

					<template v-if="item.list_binding_name === 'architecture_links'">
						<ul>
							<li v-for="sublink in data.architecture_links" :key="sublink.uid">
								<n-link exact :to="localePath(`/${item.link.uid}/${sublink.link.uid}/`)">{{ sublink.name }} </n-link>
							</li>
						</ul>
					</template>
					<template v-if="item.list_binding_name === 'design_links'">
						<ul>
							<li v-for="sublink in data.design_links" :key="sublink.uid">
								<n-link exact :to="localePath(`/${item.link.uid}/${sublink.link.uid}/`)">{{ sublink.name }} </n-link>
							</li>
						</ul>
					</template>
					<template v-if="item.list_binding_name === 'construction_links'">
						<ul>
							<li v-for="sublink in data.construction_links" :key="sublink.uid">
								<n-link exact :to="localePath(`/${item.link.uid}/${sublink.link.uid}/`)">{{ sublink.name }} </n-link>
							</li>
						</ul>
					</template>
				</li>
			</ul>
		</template>

		<div class="button" :class="{ active: isActive }" @click="ShowHideMenu">
			<span class="top" />
			<span class="bot" />
		</div>
	</header>
</template>

<script>
import { localleAnim } from '~/assets/anime'

export default {
	name: 'Navbar',
	data: () => ({
		isActive: false,
		showLocales: false,

		topHeaderIconColor: 'rgb(255, 196, 36)',
		topHeaderIconSize: '20px',

		whiteNavbar: false,
		topHeader: true,
		lastScrollPosition: 0,

		data: null,
	}),
	async fetch() {
		console.log('navbar fetch')
		await this.$prismic.api
			.getSingle('navbar', { lang: this.$i18n.localeProperties.prismic })
			.then((fetch) => {
				// set data
				this.data = fetch.data
			})
			.catch((error) => {
				console.log('log error', error)
			})
	},
	fetchKey: 'navbar',
	computed: {
		transparent() {
			return this.$store.getters.navbarTransparent
		},
		availableLocales() {
			return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
		},
		currentLocale() {
			return this.$i18n.locale
		},
	},
	watch: {
		currentLocale(newValue, oldValue) {
			console.log('currentLocale changed')
			this.$fetch()
		},
		async showLocales(newValue, oldValue) {
			await this.$nextTick()
			if (newValue) localleAnim(document.querySelectorAll('.locale'), true)
			else localleAnim(document.querySelectorAll('.locale'), false)
		},
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll)
		this.onScroll()
	},
	destroyed() {
		window.removeEventListener('scroll', this.onScroll)
	},
	methods: {
		onScroll() {
			// Get the current scroll position
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

			this.topHeader = currentScrollPosition < screen.height - 200

			// Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
			if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 80) {
				return
			} // Here we determine whether we need to show or hide the navbar
			this.lastScrollPosition = currentScrollPosition
			if (this.transparent) {
				this.whiteNavbar = currentScrollPosition > screen.height - 200
			}
		},
		ShowHideMenu() {
			this.isActive = !this.isActive
		},
		CloseMenu() {
			this.isActive = false
		},
		linkResolver(value) {
			return this.localePath(this.$prismic.linkResolver(value))
		},
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
	},
}
</script>

<style lang="scss" scooped>
$transition: all 0.35s ease;
.navbar {
	width: 100vw;
	max-height: 120px;
	padding: 0 50px;

	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	position: fixed;
	top: 0;
	z-index: 10;
	user-select: none;

	background: white;
	border-bottom: 1px solid $line;
	transition: $transition;
	&.transparent {
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
		.links .active {
			background: rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
		}
		.links li ul {
			background: rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
		}
	}
	&.transparent_to_white {
		background: white;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 240px;

		width: 1px;
		height: 100%;
		background: $line;
	}

	.logo {
		height: 80px;
		padding-right: 50px;

		display: flex;
		align-items: center;
	}

	.lang {
		height: 20px;
		margin-right: 15px;
		margin-top: 31px;

		display: flex;

		.current_locale {
			padding: 0 10px;
			padding-bottom: 2px;

			display: flex;
			align-items: center;
			z-index: 2;
			cursor: pointer;
			span {
				line-height: 12px;
			}
			&:hover {
				background: $primary;
			}
		}
		.locale {
			opacity: 0; //opacity:1
			padding-bottom: 2px;

			&:hover {
				background: $primary;
			}
		}

		a {
			padding: 0 10px;

			display: flex;
			align-items: center;
			text-decoration: none;
			line-height: 12px;
			color: $black;
			outline: none;
			position: relative;
		}
	}

	.links {
		flex: 1;
		height: 80px;

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		list-style-type: none;
		li {
			display: flex;
			height: 100%;
			a {
				padding: 0 15px;
				position: relative;
				display: flex;
				align-items: center;
				white-space: nowrap;

				text-decoration: none;
				font-size: 1rem;
				text-transform: capitalize;
				color: $black;
				outline: none;
				transition: all 0.2s ease;
				&:hover {
					background: $primary;
				}
				&.nuxt-link-active,
				&:hover {
					background: $primary;
				}
				&::after {
					content: '';
					display: block;
					width: 0;
					right: 0;
					position: absolute;
					height: 100%;
					z-index: 1;
					background-color: $primary;
				}
				span {
					position: relative;
					z-index: 3;
					font-size: inherit;
					color: inherit;
					outline: inherit;
					transition: inherit;
				}
			}
			position: relative;
			ul {
				position: absolute;
				display: none;
				opacity: 0;
				top: 80px;
				left: 0;
				width: fit-content;
				list-style-type: none;
				border-left: 5px solid $primary;
				background-color: $white;
				transition: opacity 0.3s linear;
				li {
					a {
						height: 40px;
						display: flex;
						align-items: center;
					}
				}
			}
			&:hover {
				ul {
					// animation: menuFadeiIn .3s linear forwards;
					opacity: 1;
					display: block;
				}
			}
		}

		&.active {
			width: 100%;
			height: calc(100vh - 60px);
			top: 60px;
			right: 0;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			position: fixed;
			overflow: hidden;
			background: white;
			a {
				will-change: transform;
				will-change: opacity;
				animation: fadeInRight 0.35s ease;
				margin: 20px 0;
				padding: 0 10px;
				position: relative;

				font-size: 1.5rem;
				color: $black;

				&::after {
					content: '';
					position: absolute;
					background-color: $primary;
					height: 3rem;
					right: 0;
					width: 0;
					z-index: -1;
					opacity: 0;
				}

				&:hover {
					background: none;
					&::after {
						opacity: 1;
						width: 50rem;
					}
				}
				&.nuxt-link-active {
					background: none;
					&::after {
						width: 50rem;
						opacity: 1;
					}
				}
			}
		}
	}

	.button {
		display: none;
		flex-direction: column;
		justify-content: space-evenly;
		width: 30px;
		height: 20px;

		cursor: pointer;

		span {
			width: 100%;
			height: 0.2rem;
			background: $black;
			transition: all 0.3s ease;
		}
		position: relative;
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 0.2rem;
			background: $primary;
			top: 0;
			right: 0;
			opacity: 0;
			transition: all 0.3s ease;
		}

		transition: all 0.3s ease;
		&.active {
			&::after {
				opacity: 1;
				top: 8px;
				right: -2px;
				width: 110%;
				transform: rotate(45deg);
			}
		}
	}

	.top-content {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-end;
		transition: height 0.1s ease-out;
		button {
			padding: 5px 30px;
		}
		.email,
		.phone,
		button,
		.schedule {
			margin-right: 2rem;
			margin: 5px 2rem 5px 0;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
		}
		.schedule {
			margin-right: 1.5rem;
		}
		.email,
		.phone,
		.schedule {
			display: flex;
			align-items: center;
			&:hover {
				color: $primary;
			}
			svg {
				margin-right: 10px;
			}
		}
		&.hide {
			height: 0;
			opacity: 0;
		}
	}
}
@keyframes menuFadeiIn {
	0% {
		display: none;
		opacity: 0;
	}
	1% {
		display: block;
	}
	100% {
		display: block;
		opacity: 1;
	}
}
@keyframes fadeInRight {
	0% {
		opacity: 0;
		transform: translateX(-50px);
	}
	100% {
		opacity: 1;
		transform: translateX(0px);
	}
}
// @media (min-width: 1700px) {
// 	.navbar {
// 		padding-left: 40px;
// 		padding-right: 20px;
// 		max-height: 150px;
// 		.links{
// 			height: 100px;
// 			a {
// 				font-size: 1.5rem;
// 			}
// 		}
// 		.lang {
// 			margin-right: 10px;
// 			margin-top: 45px;
// 		}
// 		.logo{
// 			margin-top: 15px;
// 		}
// 		.top-content{
// 			.email,
// 			.phone,
// 			button,
// 			.schedule{
// 				font-size: 19px;
// 				line-height: 1;
// 			}
// 		}
// 	}
// }

@media (max-width: 1120px) {
	.navbar {
		height: 60px;
		padding: 0 40px;
		justify-content: flex-end;

		&::after {
			display: none;
		}
		.logo {
			padding: 0;
			height: 100%;
			svg {
				height: inherit;
			}
		}
		.lang {
			flex-grow: 1;
			flex-direction: row-reverse;
			margin-right: 40px;
			margin-top: 20px;
			.current_locale {
				background: $primary;

				border-left: none;
				border-right: 3px solid $primary;
			}
			a {
				margin: 0;
			}
		}
		.links {
			display: none;
			li {
				height: 60px;
			}
			li:hover ul {
				display: none !important;
			}
		}
		.button {
			display: flex;
			margin-top: 20px;
		}
		.top-content {
			display: none;
		}
	}
}

@media (max-width: 400px) {
	.navbar {
		padding-left: 40px;
		padding-right: 20px;
		.logo {
			height: 90%;
			margin-top: 1%;
		}
		.lang {
			margin-right: 10px;
		}
	}
}
</style>
