<template>
	<div class="container">
		<template  v-if="!$fetchState.pending">
			<div v-for="(slice, i) in slices" :key="i" class="slice" :class="slice.slice_type">
				<h3 class="title">{{ $prismic.asText(slice.primary.title) }}</h3>
				<prismic-rich-text class="rich_text" :field="slice.primary.text" />
			</div>
		</template>
	</div>
</template>

<script>
/* eslint-disable prettier/prettier */
import gql from "graphql-tag";
import client from "@/plugins/apollo.js";

export default {
	name: 'Policy',
	data: () => ({
		data: [],
	}),
  async fetch() {
		await client
      .query({
        /* eslint-disable prettier/prettier */
        query: gql`
          {
            policy(uid: "${this.getRoutePart}", lang: "${this.$i18n.localeProperties.prismic}") {
							meta_title
							meta_description
							meta_keywords
							meta_image
							_meta {
								alternateLanguages {
									uid
									lang
								}
							}
              body {
                ... on PolicyBodyText {
                  type
                  primary {
                    title
                    text
                  }
                }
              }
            }
          }
        `,
      })
      .then((data) => {
				this.data = data;
				const meta = {
					htmlAttrs: { lang: this.$i18n.localeProperties.code },
					title: this.data.data.policy.meta_title,
					link: [
						{ hid: 'alternate', rel: 'alternate', 
							href: this.$i18n.localeProperties.code === 'ru' ? 
							`${this.$store.getters.domain}${this.$route.fullPath}` : 
							`${this.$store.getters.domain}/${this.getRoutePart}/`, 
							hreflang: 'x-default' },
						{ hid: 'alternate', rel: 'alternate', 
							href: this.data.data.policy._meta.alternateLanguages[0].lang.slice(0, 2) === 'ru' ? 
							`${this.$store.getters.domain}/${this.data.data.policy._meta.alternateLanguages[0].uid}/` :
							`${this.$store.getters.domain}/${this.data.data.policy._meta.alternateLanguages[0].lang.slice(0, 2)}/${this.data.data.policy._meta.alternateLanguages[0].uid}/`, 
							hreflang: this.data.data.policy._meta.alternateLanguages[0].lang.slice(0, 2) 
						},
						{ hid: 'alternate', rel: 'alternate', 
							href: this.data.data.policy._meta.alternateLanguages[1].lang.slice(0, 2) === 'ru' ? 
							`${this.$store.getters.domain}/${this.data.data.policy._meta.alternateLanguages[1].uid}/` :
							`${this.$store.getters.domain}/${this.data.data.policy._meta.alternateLanguages[1].lang.slice(0, 2)}/${this.data.data.policy._meta.alternateLanguages[1].uid}/` 
							, 
							hreflang: this.data.data.policy._meta.alternateLanguages[1].lang.slice(0, 2) },
					], 
					meta: [
						{ hid: '', rel: 'canonical', href: `${this.$store.getters.domain}${this.$route.fullPath}` },
						{ hid: 'description', name: 'description', content: this.data.data.policy.meta_description },
						// facebook
						{ hid: 'og:type', property: 'og:type', content: '' },
						{ hid: 'og:url', property: 'og:url', content: `${this.$store.getters.domain}${this.$route.fullPath}` },
						{ hid: 'og:title', property: 'og:title', content: this.data.data.policy.meta_title },
						{ hid: 'og:description', property: 'og:description', content: this.data.data.policy.meta_description },
						{ hid: 'og:image', property: 'og:image', content: this.data.data.policy.meta_image === null ? '' : this.data.data.policy.meta_image.url },
						// twitter
						{ hid: 'twitter:card', name: 'twitter:card', content: this.data.data.policy.meta_image === null ? '' : this.data.data.policy.meta_image.url },
					],
				}
				this.$store.dispatch('bindMeta', meta)
      })
      .catch((e) => {
				console.log(e);
      });

  },
	head() {
		return this.$store.getters.page.head
	},
	computed: {
		slices() {
			return [...this.data.data.policy.body];
		},
		getRoutePart() {
			let route = this.$route.path.split('/')
			route = route[route.length - 2]
			return route
		}
	},
	watch: {
		'$route.path': '$fetch'
	},
 
};
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
