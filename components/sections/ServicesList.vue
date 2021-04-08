<template>
	<section>
		<div class="name">
			<span>services</span>
		</div>
		<div class="content">
			<h2 class="title">{{ title }}</h2>
			<div class="links">
				<div v-for="(link, i) in links" :key="i" class="link">
					<n-link to="/">
						<span>0{{ i + 1 }}/</span>
						{{ link }}
						<IconArrow />
					</n-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		links: [' interior design', 'passive house block', 'remont', 'architectural design', 'construction', 'other types of work'],
	}),
	computed: {
		title() {
			return this.$prismic.asText(this.data.services_list_title)
		},
	},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.content {
	display: flex;
	flex-direction: column;

	.links {
		width: 1000px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.link {
			width: 50%;
			padding: 10px 0;
			margin-bottom: 20px;

			a {
				padding: 0.5rem 1rem;
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

@media (max-width: 900px) {
	.content .links {
		width: min-content;
		flex-direction: column;
		.link a svg {
			display: none;
		}
		.link:last-child {
			margin: 0;
		}
	}
}

@media (max-width: 360px) {
	.content .links {
		flex-direction: column;
		.link a {
			font-size: 1.2rem;
		}
	}
}
</style>
