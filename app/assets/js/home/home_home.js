const tools = {
	'node.js' : {
		'icon' : 'https://pbs.twimg.com/profile_images/702185727262482432/n1JRsFeB.png',
		'img' : 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png',
		'url' : 'https://nodejs.org/'
	},
	'express' : {
		'img' : 'https://camo.githubusercontent.com/a049cb056d378ed4572ff6eb9c9d4b66624894cf/687474703a2f2f6d65616e2e696f2f77702d636f6e74656e742f7468656d65732f7477656e74797369787465656e2d6368696c642f696d616765732f657870726573732e706e67',
		'icon' : '/images/icons/express.png',
		'url' : 'https://expressjs.com/'
	},
	'socket.io' : {
		'img' : 'https://www.pubnub.com/wp-content/uploads/2014/07/SOCKETIOICON.gif',
		'icon' : 'https://www.pubnub.com/wp-content/uploads/2014/07/SOCKETIOICON.gif',
		'url' : 'https://socket.io/'
	},
	'EJS' : {
		'img' : '/images/logos/ejs.png',
		'icon' : '/images/icons/ejs.png',
		'url' : 'http://ejs.co/'
	}
}

$(document).ready(function() {
	// replace slideshow images
	$('.what .tool').each(function() {
		let name = $(this).text();
		$(this).addClass(`icon ${ name.replace('.', '-').toLowerCase() }`);
		$(this).attr('title', name);
		$(this).css('background-image', `url(${tools[name].icon})`);
		$(this).on('click', function() {
			window.open(tools[name].url);
		});
	});
	$('.what .tools').css('display', 'block');
});