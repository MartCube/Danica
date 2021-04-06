<template>
	<section class="intro">
		<div class="bg">
			<ImageItem :src="image.url" :mobile="image.mobile.url" :alt="image.alt" />
		</div>
	</section>
</template>

<script>
export default {
	props: {
		image: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	margin-left: 0;
	width: 100vw;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	.bg {
		position: absolute;
		top: 0;
		left: -240px;
		width: inherit;
		height: inherit;
	}
	@media (max-width: 900px) {
		.bg{
			left: -15vw;
		}
	}
}

</style>
