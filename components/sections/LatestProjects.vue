<template>
	<div>
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="$fetchState.pending">loading</template>
		<template v-else>
			<div class="latest_projects">
				<h2 class="title">We offer more than a service</h2>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: null,
	}),
	async fetch() {},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.latest_projects {
	margin-left: 240px;
	margin-top: 80px;

	display: flex;
	flex-direction: column;

	.title {
		max-width: 500px;
		margin-bottom: 80px;
	}
}
</style>
