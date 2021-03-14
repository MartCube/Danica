<template>
	<div class="services">
		<template v-if="!$fetchState.pending">
			<h2 class="title">Optimality and quality are the grounds of our Company</h2>
			<div class="links">
				<div v-for="(link, i) in links" :key="i" class="link">
					<n-link to="/">
						<span>0{{ i + 1 }}/</span>
						{{ link }}
						<IconArrow />
					</n-link>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: null,
		links: [' interior design', 'passive house block', 'remont', 'architectural design', 'construction', 'other types of work'],
	}),
	async fetch() {
		// const achievements = await this.$prismic.api.getSingle('achievements')
	},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.services {
	margin-left: 240px;
	margin-top: 80px;

	display: flex;
	flex-direction: column;
	position: relative;
	.title {
		max-width: 500px;
		margin-bottom: 80px;
	}
	.links {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.link {
			width: 50%;
			padding: 10px 0;
			margin-bottom: 20px;

			a {
				padding: 10px;
				text-transform: capitalize;
				font-size: 1.5rem;

				width: max-content;
				display: flex;
				align-items: center;
				position: relative;

				span {
					color: $primary;
					font-size: 1.5rem;
					margin-right: 20px;
					transition: $transition;
				}
				&::after {
					content: '';
					top: 0;
					left: 0;
					position: absolute;
					width: 0;
					height: 100%;
					z-index: -1;
					background: $primary;
					transition: $transition;
				}
				svg {
					margin-left: 20px;
					opacity: 0;
					transform: translateX(-20px);
					transition: $transition;
				}
				&:hover {
					span {
						color: $black;
					}
					&::after {
						width: 100%;
					}
					svg {
						opacity: 1;
						transform: translateX(0);
					}
				}
			}
		}
	}
}
</style>
