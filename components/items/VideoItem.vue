<template>
	<div class="video_wrapper">
		<client-only>
			<LazyYoutube :src="videolink" />
		</client-only>
	</div>
</template>

<script>
import { LazyYoutube } from 'vue-lazytube'
export default {
	name: 'VideoItem',
	components: {
		LazyYoutube,
		// LazyVimeo,
	},
	props: {
		video: {
			type: String,
			required: true,
		},
	},

	computed: {
		videolink() {
			return `https://www.youtube.com/watch?v=${this.video}`
		},
	},
	// data: () => ({
	// 	plyr: {},
	// }),
}
</script>

<style lang="scss">
.video_wrapper {
	width: 70%;
}

:root {
	--plyr-color-main: rgb(255, 196, 36);
}

.ipOhDr {
	max-width: 100% !important;
}

@media (max-width: 900px) {
	.video_wrapper {
		width: 100%;
	}
}
</style>
