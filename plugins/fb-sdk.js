/* eslint-disable prefer-const */
/* eslint-disable no-undef */
const vm = this
window.fbAsyncInit = () => {
	FB.init({
		appId: 1303536193006608,
		cookie: true,
		xfbml: true,
		version: 'v2.8',
	})
	FB.getLoginStatus(function (response) {
		vm.statusChangeCallback(response)
	})
}
;(function (d, s, id) {
	let js
	const fjs = d.getElementsByTagName(s)[0]
	if (d.getElementById(id)) {
		return
	}
	js = d.createElement(s)
	js.id = id
	js.src = '//connect.facebook.net/en_US/sdk.js'
	fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
