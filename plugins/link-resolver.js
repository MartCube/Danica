export default function (doc, parent) {
	// Return the path depending on Prismic Document's type

	// If it is a Repeatable Custom Type with the API ID
	if (doc.type === 'services') {
		return '/' + doc.uid
	} else if (doc.type === 'blog_post') {
		return '/blog/' + doc.uid
	} 
	else if (doc.type === 'project_post') {
		return '/projects/' + doc.uid
	} 
	// else if (doc.type === 'service_second') {
	// 	// console.log(doc, parent);
	// 	if (parent !== undefined) return `/${ parent.uid }/${ doc.uid }`
	// 	else return `/${doc.uid}`
		
	// } 
	else {
		// workaround for navbar links
		return doc.slug
	}
}
