<template>
	<client-only>
		<div class="plyr_video">
			<vue-plyr>
				<div data-plyr-provider="vimeo" data-plyr-embed-id="143418951"></div>
			</vue-plyr>
		</div>
	</client-only>
</template>

<style lang="scss">
.plyr_video {
	width: 700px;
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
