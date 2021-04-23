<template>
	<aside>
		<ul class="messengers">
			<li>
				<a href="#">
					<IconFacebook />
				</a>
			</li>
			<li>
				<a href="#">
					<IconInstagram />
				</a>
			</li>
			<li>
				<a href="#">
					<IconViber />
				</a>
			</li>
			<li>
				<a href="#">
					<IconPhone />
				</a>
			</li>
		</ul>
	</aside>
</template>

<script>
import { messengersAnim } from '~/assets/anime'

export default {
	data: () => ({
		messengersIconColor: 'hsl(44deg 100% 47%)',
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
	left: 217px;
	bottom: 0;

	z-index: 2;
	ul.messengers {
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

@media (max-width: 900px) {
	aside {
		left: 0.5rem;
	}
}
</style>
