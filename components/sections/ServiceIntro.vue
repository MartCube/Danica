<template>
	<section class="intro">
		<div class="bg">
			<ImageItem :src="image.url" :mobile="image.mobile.url" :alt="image.alt" />
		</div>
		<div class="content" :class="{ 'white': isWhiteClassEnabled }">
			<div class="text">
				<h1 class="main-title">{{ title.main}}</h1>
				<h3 class="sub-title">{{ title.subtitle }}</h3>

				<ButtonItem @click.native="openModal"> Write us </ButtonItem>
			</div>

			<div class="project-description">
				<div class="project">
					<span>
						{{project.name}}
					</span> 
				</div>
				<div class="author">
					<span>
						{{project.author}}
					</span> 
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		image: {
			type: Object,
			required: true,
		},
		project: {
			type: Object,
			required: true
		},
		title: {
			type: Object,
			required: true
		},
		isWhiteClassEnabled: false
	},
}
</script>

<style lang="scss" scoped>
.intro {
	margin-left: 0;
	width: 100%;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	.bg {
		position: absolute;
		top: 0;
		left: -240px;
		width: 100vw;
		height: inherit;
	}

	.content{
		display: flex;
		width: calc( 100% - 240px);
		height: 100vh;
		position: relative;
		z-index: 5;
		margin-left: -1px;
		flex:initial;
		border-left: 1px solid $black;
		color: $black;
		.text{
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 1rem;
			flex:1;
			color: inherit;
			.main-title{
				font-size: 5vw;
				color: inherit;
			}
			.sub-title{
				font-size: 4vw;
				color: inherit;
				text-transform: lowercase;
			}
			button{
				margin-top: 5rem;
			}
		}
		button{
			color: $black
		}
		&.white{
			border-left: 1px solid $white;
			color: $white;
			.project-description{
				.project, .author{
					&::after{
						background-color: $white;
					}
				}
			}
		}


		.project-description {
			display: flex;
			align-items: center;
			.project{
				margin-right: .5rem;
			}
			.project, .author{
				
				writing-mode: vertical-rl;
				text-orientation: mixed;
				display: flex;
				height: 100%;
				align-items:center;
				position: relative;
				padding-top: 35vh;
				color: $black;
				&::after{
					content: '';
					display: flex;
					width: 1px;
					height: 100%;
					position: absolute;
					background-color: $black;
					left: 0;
					top: 0;
				}
				span{
					font-weight: 500;
					background-color: $primary;
					display: inline-block;
					padding: 5px 3px;
				}
			}
		}
	}
}
@media (max-width: 900px) {
	
	.intro{
		flex-direction: row;
		.bg{
			left: -10vw;
		}
		.content{
			width: 100%;
			padding: 0;
			.text{
				.main-title{
					font-size: 6.5vw;
				}
				.sub-title{
					font-size: 5vw;
				}
				
			}
	
		}
	}
}

@media (max-width: 600px) {
	.intro{
		.content{
			.text{
				align-items: flex-end;
				justify-content: flex-end;
				padding-bottom: 10vh;
				padding-left: 0;
				.main-title{
					font-size: 2rem;
				}
				.sub-title{
					font-size: 1.5rem;
				}
			}
			.project-description{
				.project, .author{
					padding-top: 60px;
				}
			}
			button{
				margin-right: -63px;
			}
		}
	}
} 
@media (max-width: 400px) {
	.intro{
		.content{
			.text{
				.main-title{
					font-size: 1.8rem;
				}
				.sub-title{
					font-size: 1.5rem;
				}
			}
		}
	}
} 

</style>
