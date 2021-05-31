<template>
	<ValidationProvider v-slot="{ errors, classes }" :rules="rules" mode="eager" tag="div" class="input_item">
		<div v-if="errors.length" class="error" :class="classes">
			{{ errors[0] }}
		</div>

		<input :id="name" v-model="input_value" v-mask="mask" :type="type" :placeholder="name" :name="name" @change="emitValue" />
		<IconArrow v-if="subscribe" class="arrow" />

		<label :for="name" class="input_label">{{ label }}</label>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
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
		mask: {
			type: String,
			default: '',
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

	font-weight: 500;

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

@media (max-width: 1200px) {
}
</style>
