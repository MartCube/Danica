<template>
	<section>
		<div class="name">
			<span>{{ data.primary.name }}</span>
		</div>
		<div class="content">
			<h2 class="title">{{ data.primary.title }}</h2>
			<div class="links">
				<div v-for="(item, i) in data.items" :key="i" class="link">
					<n-link :to="linkResolver(item)">
						<span>0{{ i + 1 }}/</span>
						{{ item.name }}
						<Icon name="arrow" fill="hsl(0, 0%, 10%)" />
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
		// parent: String
	},
	methods: {
		linkResolver(value) {
			return this.localePath(`${this.$route.fullPath}${value.link.uid}/`)
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
				&::first-letter {
					text-transform: capitalize;
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
@media (min-width: 1700px) {
	.content .links {
		width: 100%;
		.link a {
			font-size: 2rem;
			span {
				font-size: 2.3rem;
			}
		}
	}
}

@media (max-width: 900px) {
	.content .links {
		width: min-content;
		flex-direction: column;
		.link {
			width: 100%;
			a {
				white-space: normal;
				width: 100%;
				align-items: flex-start;
				svg {
					display: none;
				}
			}
			&:last-child {
				margin: 0;
			}
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
