<template>
	<div class="project_card">
		<div class="image">
			<img :src="image" :alt="title" />
			<div class="link">
				<IconChevron size="25px" />
			</div>
		</div>
		<h2>{{ title }}</h2>
	</div>
</template>

<script>
export default {
	props: {
		image: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.project_card {
	margin-bottom: 50px;
	cursor: pointer;

	display: flex;
	flex-direction: column;
	.image {
		width: 300px;
		height: 300px;
		user-select: none;
		position: relative;
		overflow: hidden;
		img {
			width: inherit;
			height: inherit;
			transition: all 0.75s ease;
		}
		.link {
			position: absolute;
			bottom: 0;
			right: 0;
			padding: 25px;
			background: $primary;

			opacity: 0;
			transition: all 0.3s ease;
		}
	}
	h2 {
		margin: 20px 40px;
		padding-top: 10px;
		position: relative;

		text-transform: capitalize;
		&::after {
			content: '';
			position: absolute;
			width: 10%;
			background-color: $black;
			height: 2px;
			top: 0;
			left: 0;
		}
	}

	&:hover {
		.image {
			img {
				transform: scale(1.1);
			}
			.link {
				opacity: 1;
			}
		}
	}
}
</style>
