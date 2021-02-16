<template>
	<nav class="navbar">
		<n-link class="logo" exact :to="localePath('index')">
			<Logo />
		</n-link>

		<div class="lang">
			<div class="current_locale" @click="showLocales = !showLocales">
				<span>{{ currentLocale }}</span>
			</div>

			<template v-if="showLocales">
				<n-link v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" @click.native="showLocales = false">
					{{ locale.code }}
				</n-link>
			</template>
		</div>

		<div class="links" :class="{ active: isActive }" @click="CloseMenu">
			<n-link :to="localePath('services')">{{ $t('pages.services') }}</n-link>
			<n-link :to="localePath('projects')">{{ $t('pages.projects') }}</n-link>
			<n-link :to="localePath('blog')">{{ $t('pages.blog') }}</n-link>
			<n-link :to="localePath('contact')">{{ $t('pages.contact') }}</n-link>
		</div>

		<div class="button" :class="{ active: isActive }" @click="ShowHideMenu">
			<span class="top" />
			<span class="bot" />
		</div>
	</nav>
</template>

<script>
export default {
	data: () => ({
		isActive: false,
		showLocales: false,
	}),
	computed: {
		availableLocales() {
			return this.$i18n.locales
		},
		currentLocale() {
			return this.$i18n.locale
		},
	},

	methods: {
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
@import '~/assets/colors.scss';

.navbar {
	width: 100%;
	height: 80px;
	padding: 0 50px;

	position: fixed;
	top: 0;
	z-index: 9;
	background: white;
	user-select: none;

	display: flex;
	align-items: center;

	.logo {
		height: 100%;
		padding-right: 50px;

		display: flex;
		align-items: center;
	}

	.lang {
		height: 15px;
		margin-right: 15px;

		display: flex;

		.current_locale {
			height: 100%;
			padding: 0 10px;

			display: flex;
			justify-content: center;
			span {
				line-height: 12px;
				font-weight: 400;
			}
			border-left: 3px solid $primary;
			cursor: pointer;
		}

		a {
			height: 12px;
			padding: 0 10px;

			display: flex;
			align-items: center;

			text-decoration: none;
			line-height: 22px;
			font-weight: 400;
			color: $black;
			outline: none;

			&.nuxt-link-active {
				display: none;
			}
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

			display: flex;
			align-items: center;

			text-decoration: none;
			font-size: 1rem;
			text-transform: capitalize;
			font-weight: 400;
			color: $black;
			outline: none;

			&.nuxt-link-active {
				background: $primary;
			}
		}

		&.active {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			background: white;
			overflow: hidden;

			position: fixed;
			top: 60px;
			right: 0;
			width: 100%;
			height: calc(100vh - 80px);

			a {
				animation: fadeInRight 0.5s ease forwards;
				margin: 20px 0;
				padding: 0 10px;
				position: relative;

				font-weight: 400;
				font-size: 1.5rem;
				&.nuxt-link-active {
					background: none;

					&::after {
						content: '';
						position: absolute;
						width: 1000%;
						background-color: $primary;
						height: 3rem;
						right: 0;
						z-index: -1;
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
			height: 2px;
			background: $black;
			transition: all 0.3s ease;
		}
		position: relative;
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 2px;
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
		padding: 0 15px;
		justify-content: flex-end;

		.logo {
			padding: 0;
		}
		.lang {
			flex-grow: 1;

			flex-direction: row-reverse;
			.current_locale {
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
</style>
