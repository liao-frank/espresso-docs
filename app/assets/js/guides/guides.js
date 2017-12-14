function formatCode(code, keywords) {
	lines = code.split('\n');
	// apply class - comment
	lines = lines.map(function(line) {
		return line.match(/^\s*\/\//) ? `<span class="comment">${line}</span>` : line
	});
	// color codes
	lines = lines.map(function(line) {
		// this
		line = line.replace(/\s*this/g, `<span class="this">$&</span>`)
		// let
		line = line.replace(/\s*let/g, `<span class="let">$&</span>`)
		// keywords
		line = line.replace(new RegExp(keywords.join('|'), 'g'), `<span class="keyword">$&</span>`);
		// return
		return line;
	});
	// \t -> &nbsp&nbsp&nbsp&nbsp
	lines = lines.map(function(line) {
		return line.replace(/\t/g, '&nbsp&nbsp&nbsp&nbsp');
	});
	// add line numbers
	lines = lines.map(function(line, index) {
		return `<span class='line-number'>${index + 1}</span>` + line;
	});
	return lines.join('\n');
}

$(document).ready(function() {
	// docuementation navigation
	let $markdown_body = $('.markdown-body');
	if ($markdown_body) {
		const BOOKMARKS = ['h2', 'h3', 'h4'];
		let $markdown_nav = $('<ul class="markdown-nav"></ul>');
		let $headers = $markdown_body.find(BOOKMARKS.join(','));
		$headers.each(function(index, elem) {
			let $elem = $(elem),
				type = BOOKMARKS.filter(t => $elem.is(t))[0],
				$nav_elem = $(`<li class="${type}">${$elem.text()}</li>`);

			$markdown_nav.append($nav_elem);
			$nav_elem.on('click', () => {
				let time = Math.abs($nav_elem.offset().top - $elem.offset().top) / $markdown_body.height() * 200 + 200;
				$('html, body').animate({
					scrollTop: $elem.offset().top,
					easing: 'swing'
				}, time);
			});
		});
		$markdown_body.prepend($markdown_nav);
	}
});