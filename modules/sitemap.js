import prismic from '@prismicio/client'

const apiEndpoint = 'https://danica.cdn.prismic.io/api/v2'
const client = prismic.client(apiEndpoint)

const sitemap = async function () {
	const pages = []
	let lang
	let data

	lang = '/en'
	data = await client.query('', {
		pageSize: 100,
		lang: 'en-us',
	})
	transform(data)

	lang = '/ru'
	data = await client.query('', {
		pageSize: 100,
		lang: 'ru',
	})
	transform(data)

	lang = ''
	data = await client.query('', {
		pageSize: 100,
		lang: 'ua-ua',
	})
	transform(data)

	function transform(data) {
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
				case 'policy':
					pages.push({
						url: `${lang}/privacy-policy`,
						changefreq: 'monthly',
						priority: 0.25,
						lastmod: page.last_publication_date,
					})
					break
				case 'blog_post':
					pages.push({
						url: `${lang}/blog/${page.uid}`,
						changefreq: 'weekly',
						priority: 0.25,
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
				case 'services':
					pages.push({
						url: `${lang}/${page.uid}`,
						changefreq: 'monthly',
						priority: 0.75,
						lastmod: page.last_publication_date,
					})
					break
				case '':
					pages.push({
						url: `${lang}`,
						changefreq: 'monthly',
						priority: 0.75,
						lastmod: page.last_publication_date,
					})
					break
				default:
					break
			}
		})
		console.log(pages)
	}
	return pages
}

export default sitemap
