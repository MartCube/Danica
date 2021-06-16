<template>
	<aside>
		<ul class="messengers">
			<li>
				<a href="https://t.me/andreybukin" rel="nofollow" target="_blank">
					<IconTelegram :fill="color" />
				</a>
			</li>
			<li>
				<a href="https://facebook.com/danica.ukraine" rel="nofollow" target="_blank">
					<IconFacebook :fill="color" />
				</a>
			</li>
			<li>
				<a href="https://www.instagram.com/danica.ua" rel="nofollow" target="_blank">
					<IconInstagram :fill="color" />
				</a>
			</li>
			<li>
				<a href="viber://chat/?number=%2B380674011181" rel="nofollow" target="_blank">
					<IconViber :fill="color" />
				</a>
			</li>
			<li>
				<a href="tel:tel:+380973591111" rel="nofollow" target="_blank">
					<IconPhone :fill="color" />
				</a>
			</li>
		</ul>
	</aside>
</template>

<script>
import { messengersAnim } from '~/assets/anime'

export default {
	data: () => ({
		color: 'hsl(44deg 100% 47%)',
	}),
	mounted() {
		messengersAnim(document.querySelectorAll('.messengers li'))
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

aside {
	height: fit-content;
	position: fixed;
	left: 205px;
	bottom: 0;

	z-index: 2;
	ul.messengers {
		width: 45px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		li {
			opacity: 0; // opacity: 1
			list-style-type: none;
			margin-bottom: 5px;
			a {
				svg {
					width: 20px;
					height: 20px;
					transition: all 0.2s ease;
				}
				&:hover {
					svg {
						fill: $primary;
					}
				}
			}
			&:last-child {
				a {
					display: flex;
					align-items: center;
					justify-content: center;
					svg {
						width: 18px;
						height: 18px;
					}
				}
			}
		}
	}
}
@media (min-width: 1700px) {
	aside {
		left: 197px;
		ul.messengers li {
			&:last-child a svg {
				width: 28px;
				height: 28px;
			}
			a svg {
				width: 30px;
				height: 30px;
			}
		}
	}
}
@media (max-width: 900px) {
	aside {
		left: 0;
		ul.messengers li {
			margin-bottom: 15px;
		}
	}
}
</style>
