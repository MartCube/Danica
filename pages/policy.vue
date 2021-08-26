<template>
  <div class="container">
    <div v-for="(slice, i) in slices" :key="i" class="slice" :class="slice.slice_type">
			<h3 class="title">{{ $prismic.asText(slice.primary.title) }}</h3>
			<prismic-rich-text class="rich_text" :field="slice.primary.text" />
		</div>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import gql from "graphql-tag";
import client from "@/plugins/apollo.js";

export default {
	data: () => ({
		// slices: [],
		data: [],

		
	}),
  async fetch() {
		// console.log(route, this.$i18n.localeProperties.prismic);
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
				console.log(this.data.data.policy._meta);
      })
      .catch((e) => {
				console.log(e);
      });

			// this.$store.dispatch('setMeta', {})
  },
	head() {
		// await this.$nextTick()
		return this.headData
  },
	computed: {
		headData() {
			return {
					htmlAttrs: { lang: this.$i18n.localeProperties.code },
					title: this.data.data.policy.meta_title,
					link: [
						{ hid: 'alternate', rel: 'alternate', href: this.$i18n.localeProperties.code === 'ru' ? `${this.$store.getters.domain}${this.$route.fullPath}` : `${this.$store.getters.domain}/${this.getRoutePart}/`, hreflang: 'x-default' }
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
		},
		slices() {
			return [...this.data.data.policy.body];
		},
		getRoutePart() {
			let route = this.$route.path.split('/')
			route = route[route.length - 2]
			return route
		}
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
