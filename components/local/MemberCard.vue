<template>
	<n-link :to="localePath(`/${parent}/${data.member_link.uid}`)" class="member_card">
		<div class="image">
			<ImageItem :width="image.dimensions.width" :height="image.dimensions.height" :mobile="image.mobile.url" :src="image.url" :retina="image.url" :alt="name" />
			<!-- <div class="link">
				<Icon name="chevron" fill="hsl(0, 0%, 10%)" size="25px" />
			</div> -->
		</div>
		<div class="content">
			<h2>{{ name }}</h2>
			<span>{{ role }}</span>
		</div>
	</n-link>
</template>

<script>
export default {
	name: 'MemberCard',
	props: {
		data: {
			type: Object,
			required: true,
		},
		parent: {
			type: String,
			required: true,
		},
	},
	computed: {
		image() {
			return this.data.member_image
		},
		name() {
			return this.data.member_name
		},
		role() {
			return this.data.role
		},
	},
}
</script>

<style lang="scss" scoped>
.member_card {
	width: 48%;
	cursor: pointer;

	display: flex;
	justify-content: center;
	margin-left: 5px;
	&:nth-child(odd) {
		margin-left: 0;
		.image {
			order: 2;
			border-right: 5px solid transparent;
		}
		.content {
			order: 1;
			padding-right: 40px;
			align-items: flex-end;
			text-align: right;
		}
	}
	.image {
		width: 50%;
		height: 100%;
		min-height: 300px;
		overflow: hidden;
		border-left: 5px solid transparent;
		picture {
			width: 100%;
			height: 100%;
			z-index: 1;
			position: relative;
			transition: all 0.75s ease;
			object-fit: cover;
			object-position: top;
			display: block;
			object-fit: cover;
			&.lazyload,
			&.lazyloading {
				opacity: 0;
			}
			&.lazyloaded {
				opacity: 1;
				transition: all 0.75s ease;
			}
		}
	}
	.content {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 40px;
		align-items: flex-start;
		text-align: left;
		h2 {
			margin-bottom: 20px;
			font-size: 1.8rem;
			&::first-letter {
				text-transform: capitalize;
			}
		}
		span {
			color: $grey;
		}
	}

	&:hover {
		&:nth-child(odd) {
			.image{
				border-right-color: $primary;
				border-left-color: transparent;
			}
		}
		.image {
			border-left-color: $primary;
			picture {
				transform: scale(1.05);
			}
		}
		.content {
			h2 {
				text-decoration: underline;
				text-decoration-color: $primary;
			}
		}
	}
}

// @media (min-width: 1700px) {
// 	.member_card h2{
// 		font-size: 2rem;
// 	}
// }

@media (max-width: 800px) {
	.member_card {
		width: 100%;
		.image {
			height: 100%;
			width: 100%;
		}
		.content {
			width: 100%;
		}
		h2 {
			margin: 20px;
			font-size: 1.4rem;
		}
	}
}
@media (max-width: 500px) {
}
</style>
