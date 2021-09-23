import prismic from '@prismicio/client'

const apiEndpoint = 'https://danica.cdn.prismic.io/api/v2'
const client = prismic.client(apiEndpoint)

const routes = async function () {
	const pages = []

	await client
		.query('', {
			pageSize: 100,
			lang: 'en-us',
		})
		.then((data) => {
			transform(data, 'en')
		})

	await client
		.query('', {
			pageSize: 100,
			lang: 'ru',
		})
		.then((data) => {
			transform(data, '')
		})

	await client
		.query('', {
			pageSize: 100,
			lang: 'ua-ua',
		})
		.then((data) => {
			transform(data, 'ua')
		})

	function transform(data, lang) {
		data.results.forEach((page) => {
			switch (page.type) {
				case 'home_index':
					pages.push(`${lang}`)
					break
				case 'projects':
					pages.push(`${lang}/${page.uid}`)
					break
				case 'blog':
					pages.push(`${lang}/${page.uid}`)
					break
				case 'contact':
					pages.push(`${lang}/${page.uid}`)
					break
				case 'about_us':
					pages.push(`${lang}/${page.uid}`)
					break
				case 'policy':
					pages.push(`${lang}/privacy-policy`)
					break
				case 'blog_post':
					pages.push(`${lang}/blog/${page.uid}`)
					break
				case 'project_post':
					pages.push(`${lang}/projects/${page.uid}`)
					break
				case 'team_member':
					console.log(page);
					pages.push(`${lang}/o-nas/${page.uid}`)
					break
				case 'services':
					pages.push(`${lang}/${page.uid}`)
					break
				case 'service_second':
					pages.push(`${lang}/${page.data.parent_page.uid}/${page.uid}`)
					break
				default:
					break
			}
		})
		console.log(pages)
	}
	return pages
}

export default routes
