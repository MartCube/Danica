<template>
	<div v-if="modalVideo.data" ref="modal" class="video_modal">
		<VideoItem :video="modalVideo.data" />
		<Icon name="close" class="close" size="35px" @click.native="closeModal" />
	</div>
</template>

<script>
import { modalAnim } from '~/assets/anime'

export default {
	computed: {
		modalVideo() {
			return this.$store.getters.modalVideo
		},
	},
	watch: {
		async modalVideo() {
			await this.$nextTick()
			if (this.modalVideo) modalAnim(this.$refs.modal)
		},
	},
	methods: {
		closeModal() {
			this.$store.dispatch('bindModalVideo', { data: null, open: false })
		},
	},
}
</script>

<style lang="scss" scoped>
.video_modal {
	will-change: opacity;
	will-change: transform;
	opacity: 1;

	width: 100%;
	height: 100vh;
	z-index: 11;
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;
	background: $black;

	.close {
		position: fixed;
		top: 25px;
		right: 25px;
		fill: $white;
		transition: all 0.2s ease;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
}
@media (max-width: 900px) {
}
</style>
