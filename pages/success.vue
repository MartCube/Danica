<template>
	<div class="container">
		<div class="message">
			<p>{{ $t('service.form.text_responce1') }}</p>
			<p>{{ $t('service.form.text_responce2') }} 😎</p>
			<ButtonItem ><n-link :to="localePath('/')">{{ $t('service.form.button_tohome') }}</n-link></ButtonItem>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'Success',
}
</script>

<style lang="scss" scoped>
.container {
	margin-left: 240px;
	margin-top: 120px;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: 1px solid $line;
	// background-color: $black;
	&::after {
		display: none;
	}
	.message {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 240px;
		p {
			color: $black;
			line-height: 1.5rem;
		}
		button {
			margin-top: 2rem;
		}
	}
}
@media (max-width: 900px) {
	.container {
		margin-left: 45px;
		margin-top: 30px;
		.message {
			margin-right: 0;
		}
	}
}
</style>
