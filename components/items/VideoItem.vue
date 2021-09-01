<template>
	<client-only>
		<div class="plyr_video">
			<vue-plyr>
				<!-- <div data-plyr-provider="vimeo" :data-plyr-embed-id="video"></div> -->
				<div data-plyr-provider="youtube" :data-plyr-embed-id="video"></div>
			</vue-plyr>
		</div>
	</client-only>
</template>

<script>
import '~/plugins/vue-plyr'
export default {
	props: {
		video: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss">
.plyr_video {
	width: 70%;
}

:root {
	--plyr-color-main: rgb(255, 196, 36);
}

@media (max-width: 900px) {
	.plyr_video {
		width: 100%;
	}
}
</style>
