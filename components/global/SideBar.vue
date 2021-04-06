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

aside{
	width: 240px;
	position: relative;
	border-right: 1px solid #EAEAEA;
	position: relative;
	z-index: 4;
	ul.messengers{
		position: fixed;
    left: 150px;
    height: fit-content;
    bottom: 2vh;
    z-index: 1;
		li{
			list-style-type: none;
			margin-bottom: 5px;
		}	
	}
}

	@media (max-width: 900px) {
		aside{
			width: 10vw;
			ul.messengers{
				left: 3vw;
			}
		}
	}
	@media (max-width: 600px) {
		aside{
			ul.messengers{
				left: 2vw;			
			}
		}
	}
	@media (max-width: 320px) {
		aside{
			ul.messengers{
				left: 1vw;			
			}
		}
	}
</style>
