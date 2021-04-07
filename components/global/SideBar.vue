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
// import { logoAnim } from '~/assets/anime'

export default {
	// mounted() {
	// 	logoAnim(this.$refs.triangle)
	// },
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

aside {
	width: 240px;
	position: relative;
	border-right: 1px solid $line;
	position: relative;
	z-index: 4;
	ul.messengers {
		height: fit-content;

		position: fixed;
		left: 240px;
		bottom: 0;
		transform: translate(-120%, -50%);
		z-index: 1;
		li {
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
		width: 10vw;
		ul.messengers {
			left: 3vw;
		}
	}
}
@media (max-width: 600px) {
	aside {
		ul.messengers {
			left: 2vw;
		}
	}
}
@media (max-width: 320px) {
	aside {
		ul.messengers {
			left: 1vw;
		}
	}
}
</style>
