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
	position: fixed;
	left: 150px;
	height: fit-content;
	bottom: 2vh;
	z-index: 1;
	ul.messengers{
		
		li{
			list-style-type: none;
			margin-bottom: 5px;
		}	
	}
}

@media (max-width: 900px) {
	aside{
		left: 3vw;
	}
}
@media (max-width: 600px) {
	aside{
		left: 2vw;			
	}
}
@media (max-width: 320px) {
	aside{
		left: 1vw;			
	}
}
</style>
