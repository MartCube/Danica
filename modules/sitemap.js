import prismic from '@prismicio/client'

const apiEndpoint = 'https://danica.cdn.prismic.io/api/v2'
const client = prismic.client(apiEndpoint)

const sitemap = async function () {
	const pages = []

	await client
		.query('', {
			pageSize: 100,
			lang: 'en-us',
		})
		.then((data) => {
			transform(data, 'en', 'about-us')
		})

	await client
		.query('', {
			pageSize: 100,
			lang: 'ru',
		})
		.then((data) => {
			transform(data, '', 'o-nas')
		})

	await client
		.query('', {
			pageSize: 100,
			lang: 'ua-ua',
		})
		.then((data) => {
			transform(data, 'ua', 'pro-nas')
		})

	function transform(data, lang, aboutus) {
		data.results.forEach((page) => {
			switch (page.type) {
				case 'home_index':
					pages.push({
						url: `${lang}`,
						changefreq: 'monthly',
						priority: 1,
						lastmod: page.last_publication_date,
					})
					break
				case 'projects':
					pages.push({
						url: `${lang}/${page.uid}`,
						changefreq: 'monthly',
						priority: 1,
						lastmod: page.last_publication_date,
					})
					break
				case 'blog':
					pages.push({
						url: `${lang}/${page.uid}`,
						changefreq: 'monthly',
						priority: 1,
						lastmod: page.last_publication_date,
					})
					break
				case 'contact':
					pages.push({
						url: `${lang}/${page.uid}`,
						changefreq: 'monthly',
						priority: 1,
						lastmod: page.last_publication_date,
					})
					break
				case 'about_us':
					// pages.push({
					// 	url: `${lang}/${page.uid}`,
					// 	changefreq: 'monthly',
					// 	priority: 1,
					// 	lastmod: page.last_publication_date,
					// })
					break
				case 'policy':
					pages.push({
						url: `${lang}/privacy-policy`,
						changefreq: 'monthly',
						priority: 0.3,
						lastmod: page.last_publication_date,
					})
					break
				case 'blog_post':
					pages.push({
						url: `${lang}/blog/${page.uid}`,
						changefreq: 'weekly',
						priority: 0.3,
						lastmod: page.last_publication_date,
					})
					break
				case 'project_post':
					pages.push({
						url: `${lang}/projects/${page.uid}`,
						changefreq: 'monthly',
						priority: 0.5,
						lastmod: page.last_publication_date,
					})
					break
				case 'about_us':
					pages.push({
						url: `${lang}/${page.uid}`,
						changefreq: 'monthly',
						priority: 0.5,
						lastmod: page.last_publication_date,
					})
					break
				case 'team_member':
					pages.push({
						url: `${lang}/${aboutus}/${page.uid}`,
						changefreq: 'monthly',
						priority: 0.5,
						lastmod: page.last_publication_date,
					})
					break
				case 'services':
					pages.push({
						url: `${lang}/${page.uid}`,
						changefreq: 'monthly',
						priority: 0.7,
						lastmod: page.last_publication_date,
					})
					break
				case 'service_second':
					// console.log(page);
					pages.push({
						url: `${lang}/${page.data.parent_page.uid}/${page.uid}`,
						changefreq: 'monthly',
						priority: 0.7,
						lastmod: page.last_publication_date,
					})
					break
				default:
					break
			}
		})
		// console.log(pages)
	}
	return pages
}

export default sitemap
