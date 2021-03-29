<template>
	<div v-swiper="swiperOption" class="swiper-container">
		<div class="swiper-wrapper">
			<slot> </slot>
		</div>
		<div v-if="pagination" slot="pagination" class="swiper-pagination"></div>
	</div>
</template>

<script>
export default {
	props: {
		pagination: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		swiperOption: {
			slidesPerView: 1,
			spaceBetween: 100,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: true,
			},
			pagination: {
				el: '.swiper-pagination',
				// dynamicBullets: true,
				clickable: true,
			},
			// effect: 'fade',
		},
	}),

	computed: {},
	methods: {},
}
</script>

<style lang="scss" scoped>
::v-deep {
	--swiper-theme-color: rgb(255, 196, 36);
}
::v-deep .swiper-pagination-bullet {
	width: 12px;
	height: 12px;
	border-radius: 10px;
	transition: width 0.3s ease;
	&.swiper-pagination-bullet-active {
		width: 40px;
	}
}

.swiper-pagination {
	position: initial;
	margin-top: 20px;

	width: max-content;
	height: 20px;
	display: flex;
}
</style>
