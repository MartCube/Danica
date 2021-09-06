<template>
	<div class="container">
		<div v-if="!$fetchState.pending">
			<ul class="links">
				<!-- <li v-for="link in "></li> -->
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ i18n, store }) {
		await store.dispatch('storeSingle', {
			type: 'sitemap',
			language: i18n.localeProperties.prismic,
		})
		return {
			slices: store.getters.page.data.body,
		}
	},
	data: () => ({
		links: [],
	}),
	fetch() {
		// console.log(this.$prismic.api);
		this.$prismic.api.query('', { pageSize: 100, lang: this.$i18n.localeProperties.prismic }).then((data) => {
			// if (this.$i18n.localeProperties.code === 'ru') {
			// 	this.transform(data, '')
			// } else {
			// 	this.transform(data, this.$i18n.localeProperties.code)
			// }
			console.log(data)
			// console.log(this.links)
		})
	},
	head() {
		return this.$store.getters.page.head
	},
	methods: {
		transform(data, lang) {
			data.results.forEach((page) => {
				switch (page.type) {
					case 'home_index':
						this.links.push({
							url: `${lang}`,
						})
						break
					case 'projects':
						this.links.push({
							url: `${lang}/${page.uid}`,
						})
						break
					case 'blog':
						this.links.push({
							url: `${lang}/${page.uid}`,
						})
						break
					case 'contact':
						this.links.push({
							url: `${lang}/${page.uid}`,
						})
						break
					case 'policy':
						this.links.push({
							url: `${lang}/privacy-policy`,
						})
						break
					case 'blog_post':
						this.links.push({
							url: `${lang}/blog/${page.uid}`,
						})
						break
					case 'project_post':
						this.links.push({
							url: `${lang}/projects/${page.uid}`,
						})
						break
					case 'services':
						this.links.push({
							url: `${lang}/${page.uid}`,
						})
						break
					case 'service_second':
						// console.log(page);
						this.links.push({
							url: `${lang}/${page.data.parent_page.uid}/${page.uid}`,
						})
						break
					default:
						break
				}
			})
			// console.log(pages)
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	margin-left: 240px;
	margin-top: 120px;
	padding: 0 0 40px 1rem;
	border-left: 1px solid $line;
	&::after {
		display: none;
	}
	.slice {
		.title {
			margin: 40px 0;
			text-transform: uppercase;
		}
		.rich_text {
			width: 80%;
		}
	}
}
@media (max-width: 900px) {
	.container {
		margin-left: 45px;
		margin-top: 30px;
	}
}
</style>
