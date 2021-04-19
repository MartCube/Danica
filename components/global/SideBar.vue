<template>
	<aside>
		<ul class="messengers">
			<li>
				<a href="#">
					<IconFacebook :fill="this.messengersIconColor"/>
				</a>
			</li>
			<li>
				<a href="#">
					<IconInstagram :fill="this.messengersIconColor"/>
				</a>
			</li>
			<li>
				<a href="#">
					<IconViber :fill="this.messengersIconColor"/>
				</a>
			</li>
			<li>
				<a href="#">
					<IconPhone :fill="this.messengersIconColor"/>
				</a>
			</li>
		</ul>
	</aside>
</template>

<script>
import { messengersAnim } from '~/assets/anime'

export default {
	data: () =>({
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
	bottom: -3rem;

	z-index: 2;
	transform: translateY(-50%);
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
					svg {
						fill: $primary;
					}
				}
				&:hover {
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
