<template>
	<header class="navbar" :class="{ transparent_to_white: whiteNavbar && transparent, transparent: transparent }">
		<n-link class="logo" exact :to="localePath('index')" @click.native="CloseMenu">
			<Logo />
		</n-link>

		<div class="lang">
			<div class="current_locale" @click="showLocales = !showLocales">
				<span v-if="currentLocale">{{ currentLocale }}</span>
			</div>

			<n-link v-for="locale in availableLocales" :key="locale.code" class="locale" :to="switchLocalePath(locale.code)" @click.native="showLocales = false">
				{{ locale.code }}
			</n-link>
		</div>

		<nav class="links" :class="{ active: isActive }" @click="CloseMenu">
			<n-link :to="localePath('design')"><span> {{ $t('pages.design') }} </span></n-link>
			<n-link :to="localePath('architecture')"><span> {{ $t('pages.architecture') }} </span></n-link>
			<n-link :to="localePath('projects')"><span> {{ $t('pages.projects') }} </span></n-link>
			<n-link :to="localePath('blog')"><span> {{ $t('pages.blog') }} </span></n-link>
			<n-link :to="localePath('contact')"><span> {{ $t('pages.contact') }} </span></n-link>
		</nav>

		<div class="button" :class="{ active: isActive }" @click="ShowHideMenu">
			<span class="top" />
			<span class="bot" />
		</div>
	</header>
</template>

<script>
import { localleAnim } from '~/assets/anime'

export default {
	data: () => ({
		isActive: false,
		showLocales: false,
		whiteNavbar: false,
		lastScrollPosition: 0,
	}),
	computed: {
		transparent() {
			return this.$store.getters.navbarTransparent
		},
		availableLocales() {
			return this.$i18n.locales.filter((locale) => locale.code !== this.currentLocale)
		},
		currentLocale() {
			return this.$i18n.locale
		},
	},
	watch: {
		transparent() {
			if (this.transparent) window.addEventListener('scroll', this.onScroll)
			else window.removeEventListener('scroll', this.onScroll)
		},
		async showLocales(newValue, oldValue) {
			await this.$nextTick()
			if (newValue) localleAnim(document.querySelectorAll('.locale'), true)
			else localleAnim(document.querySelectorAll('.locale'), false)
		},
	},
	mounted() {
		if (this.transparent) window.addEventListener('scroll', this.onScroll)
	},
	methods: {
		onScroll() {
			// Get the current scroll position
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
			// Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
			if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 80) {
				return
			} // Here we determine whether we need to show or hide the navbar

			this.whiteNavbar = currentScrollPosition > screen.height - 200
			this.lastScrollPosition = currentScrollPosition

			// console.log('onScroll', this.lastScrollPosition, screen.height, this.whiteNavbar)
		},
		ShowHideMenu() {
			this.isActive = !this.isActive
		},
		CloseMenu() {
			this.isActive = false
		},
	},
}
</script>

<style lang="scss" scooped>
$transition: all 0.35s ease;
.navbar {
	width: 100vw;
	height: 80px;
	padding: 0 50px;

	position: fixed;
	top: 0;
	z-index: 9;
	user-select: none;

	background: white;
	transition: $transition;
	&.transparent {
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
		.links .active {
			background: rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
		}
	}
	&.transparent_to_white {
		background: white;
	}

	display: flex;
	align-items: center;

	.logo {
		height: 100%;
		padding-right: 50px;

		display: flex;
		align-items: center;
	}

	.lang {
		height: 20px;
		margin-right: 15px;

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
				font-weight: 400;
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
			font-weight: 400;
			color: $black;
			outline: none;
			position: relative;
		
		}
	}

	.links {
		width: stretch;
		height: 100%;

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		

		a {
			padding: 0 25px;
			position: relative;
			display: flex;
			align-items: center;

			text-decoration: none;
			font-size: 1rem;
			text-transform: capitalize;
			font-weight: 400;
			color: $black;
			outline: none;
			transition: all 0.2s ease;
			&:hover {
				background: $primary;
			}
			&.nuxt-link-active, &:hover {
				background: $primary;
			}
			&::after{
				content: '';
				display: block;
				transition: all 0.2s ease;
				width: 0;
				right: 0;
				position: absolute;
				height: 100%;
				z-index: 1;
				background-color: $primary;
			}
			span{
				position: relative;
				z-index: 3;
				font-size: inherit;
				font-weight: inherit;
				color: inherit;
				outline: inherit;
				transition: inherit;

			}
		}
		
		&.active {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			background: white;
			height: calc(100vh - 60px);
			position: fixed;
			top: 60px;
			right: 0;

			a {
				animation: fadeInRight 0.5s ease forwards;
				margin: 20px 0;
				padding: 0 10px;
				position: relative;

				font-weight: 400;
				font-size: 1.5rem;
				color: $black;

				&::after {
					content: '';
					position: absolute;
					width: 1000%;
					background-color: $primary;
					height: 3rem;
					right: 0;
					z-index: -1;
					opacity: 0;
					transition: all 0.2s ease;
				}

				&:hover {
					background: none;
					&::after {
						opacity: 1;
					}
				}
				&.nuxt-link-active {
					background: none;
					&::after {
						width: 20rem;
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

@media (max-width: 900px) {
	.navbar {
		height: 60px;
		padding: 0 40px;
		justify-content: flex-end;

		.logo {
			padding: 0;
		}
		.lang {
			flex-grow: 1;
			flex-direction: row-reverse;
			margin-right: 40px;
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
		}
		.button {
			display: flex;
		}
	}
}

@media (max-width: 360px) {
	.navbar {
		padding: 0 5px;

		.lang {
			margin-right: 10px;
		}
	}
}
</style>
