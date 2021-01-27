<template>
	<div class="container">
		<div class="sidebar"></div>
		<Title value="projects" />

		<div class="projects">
			<div class="filter">
				<span v-for="i in filter" :key="i">{{ i }}</span>
			</div>
			<div class="grid">
				<ProjectCard image="1.png" title="fox" />
				<ProjectCard image="2.png" title="freedom" />
				<ProjectCard image="3.png" title="shelter" />
				<ProjectCard image="4.png" title="leon" />
				<ProjectCard image="5.png" title="wolf" />
				<ProjectCard image="6.png" title="bee" />
			</div>
		</div>
		<span class="load">load more</span>
	</div>
</template>

<script>
export default {
	data: () => ({
		filter: ['all', 'architecture', 'design', 'remont'],
	}),
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.projects {
	display: flex;

	.filter {
		width: 240px;
		padding-right: 30px;

		background: white;

		display: flex;
		flex-direction: column;

		span {
			margin: 10px 0;
			text-transform: capitalize;

			display: flex;
			align-items: center;
			cursor: pointer;
			transition: all 0.1s ease;

			&::before {
				content: '';
				width: 100%;
				height: 1px;
				margin-right: 10px;
				background: $black;
				transition: all 0.2s ease;
			}

			&:hover {
				color: $primary;
				&::before {
					background: $primary;
				}
			}
		}
	}

	.grid {
		max-width: 1000px;
		width: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
}
.load {
	height: 2rem;
	margin-left: 240px;

	display: flex;
	align-items: center;
	cursor: pointer;

	text-transform: capitalize;
	font-size: 1.2rem;

	&::before {
		content: '';
		width: 10px;
		height: 100%;
		margin-right: 10px;
		background: $primary;
	}
}
</style>
