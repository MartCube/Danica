<template>
	<ValidationProvider v-slot="{ errors, classes }" :rules="rules" mode="eager" tag="div" class="input_item">
		<div v-if="errors.length" class="error" :class="classes">
			{{ errors[0] }}
		</div>

		<input :id="name" v-model="input_value" :type="type" :placeholder="name" :name="name" @change="emitValue" />
		<Icon v-if="subscribe" name="arrow" :class="'arrow'" />

		<label :for="name" class="input_label">{{ label }}</label>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
	name: 'InputItem',
	components: {
		ValidationProvider,
	},
	props: {
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: 'input',
		},
		label: {
			type: String,
			default: '',
		},
		rules: {
			type: [Object, String],
			required: true,
		},
		subscribe: {
			type: Boolean,
			required: false,
		},
	},
	data: () => ({
		input_value: '',
	}),
	methods: {
		emitValue(event) {
			this.$emit('getValue', this.input_value)
		},
	},
}
</script>

<style lang="scss" scoped>
.input_item {
	position: relative;
	padding: 1rem 0 0;
	width: 100%;
	height: 51px;

	input {
		font-family: inherit;
		width: 100%;
		border: 0;
		border-bottom: 2px solid $white;
		outline: 0;
		font-size: 0.9rem;
		color: $white;
		padding: 7px 0;
		background: transparent;
		transition: border-color 0.2s;
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus {
			-webkit-text-fill-color: #fff;
			box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
			transition: background-color 5000s ease-in-out 0s;
		}
		&::placeholder {
			color: transparent;
		}
		&:placeholder-shown ~ label {
			font-size: 1rem;
			cursor: text;
			top: 20px;
		}
		&:focus {
			~ label {
				position: absolute;
				top: 0;
				display: block;
				transition: 0.2s;
				font-size: 0.8rem;
				color: $grey;
			}
		}
		/* reset input */
		&:required,
		&:invalid {
			box-shadow: none;
		}
	}
	label {
		user-select: none;
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 0.8rem;
		color: white;
		// text-transform: capitalize;
	}
	.arrow {
		position: absolute;
		bottom: 5px;
		right: 0;
		fill: $primary;
	}
	.error {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 0.8em;
		color: #ff1461;
		@include d-flex(row, center, center, initial);
		&.invalid {
			display: flex;
		}
	}
}
// @media (min-width: 1700px) {
// 	.input_item {
// 		height: 70px;
// 		input{
// 			height: 55px;
// 			font-size: 1.3rem;
// 			&:placeholder-shown ~ label {
// 				font-size: 1.2rem;
// 			}
// 			&:focus {
// 				~ label {
// 					font-size: 1.2rem;
// 				}
// 			}
// 		}
// 		.error{
// 			font-size: 1.2rem;
// 		}
// 		label{
// 			font-size: 1.5rem;
// 		}
// 		.arrow{
// 			bottom: 10px;
// 			width: 30px;
// 			height: 30px;
// 		}
// 	}
// }
@media (max-width: 600px) {
	.subscribe svg {
		height: 35px;
		width: 35px;
	}
}
</style>
