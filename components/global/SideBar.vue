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
	ul.messengers{
		position: fixed;
    left: 150px;
    height: fit-content;
    bottom: 2vh;
    z-index: 1;
		li{
			list-style-type: none;
		}	
	}
}

// @media (max-width: 900px) {
// 	svg {
// 		height: 50px;
// 	}
// }
</style>
