<template>
	<div class="container">
		<Title value="contact" />
		<div class="wrap">
			<ContactForm />
			<div class="map">
				<div class="directions">
					<IconDirections size="40px" />
				</div>
				<ImageItem :src="map_url" alt="map" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		map_url: 'https://maps.googleapis.com/maps/api/staticmap?center=50.490841015518846,30.446994616564965&zoom=13&format=png32&&size=1920x1920&key=AIzaSyBnTb01XNm3AOU8jwhC3neqhpNdMVLxnlI&map_id=c26449f55b3ee7',
	}),
}
</script>

<style lang="scss" scoped>
.container {
	background: $black;
	margin-bottom: 0;

	.wrap {
		width: 100%;
		height: calc(100vh - 80px);

		display: flex;
		& > * {
			width: 50%;
		}
		.contact_form {
			padding: 50px 0;
			padding-left: 240px;
			padding-right: 100px;
			color: $white;
		}
		.map {
			position: relative;
			.directions {
				position: absolute;
				top: 0;
				left: 0;
				width: 80px;
				height: 80px;
				display: flex;
				justify-content: center;
				align-items: center;

				z-index: 2;
				background: $primary;
				cursor: pointer;

				svg {
					transition: all 0.35s ease;
				}
				&:hover {
					svg {
						transform: scale(1.2);
					}
				}
			}
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.title {
	color: $white;
	&::selection {
		color: $black;
	}
}
</style>
