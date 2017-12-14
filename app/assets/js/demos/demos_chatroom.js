$(document).ready(function() {
	let current = {
		nickname_salt : (getCookie('nickname_salt') || generateSalt())
	};
	let current_users = [];

	function generateSalt() {
		let salt = Math.floor(Math.random() * 10000);
		setCookie('nickname_salt', salt);
		return salt;
	}
	function updateUsers() {
		$users = $('.users');
		$users.find('ul').remove();
		$list = $('<ul></ul>');
		current_users.forEach((user) => {
			$list.append($(`<li class="user">${user.nickname}</li>`));
		});
		$users.append($list);
	}
	function receiveMessage(message) {
		let content = message.content,
			author = message.nickname,
			author_salt = message.nickname_salt;
		let $message_list = $('.messages ul');
		let scrollHeight = $message_list[0].scrollHeight,
			p_top = parseInt($message_list.css('padding-top').replace('px', ''));
			p_bot = parseInt($message_list.css('padding-bottom').replace('px', ''));
			// + 30 because of padding
			scrollDiff = Math.abs($message_list.scrollTop() + $message_list.height() - scrollHeight + p_top + p_bot);
		let from_self = (author == current.nickname) && (author_salt == current.nickname_salt);
		message = $(`<li class="${from_self ? 'self ' : ''}message"></li>`);
		$(message).html(`<div class="message-content"><label>${author || author_salt}</label>${escapeHtml(content)}</div>`);
		$('.messages ul').append(message);
		// check scroll
		if (scrollDiff < 2) {
			$('.messages ul').scrollTop(scrollHeight);
		}
	}
	function sendMessage(content) {
		receiveMessage({
			content: content,
			nickname: current.nickname,
			nickname_salt: current.nickname_salt
		});
		socket.emit('message', {
			content: content,
			nickname: current.nickname,
			nickname_salt: current.nickname_salt
		});
	}
	function setCookie(cname, cvalue) {
		let exdays = 10000;
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";";
	}
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	function escapeHtml(str) {
		let div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	}
	// message input
	$('.messenger-input').on('keypress', function(e) {
		let code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13 && !event.shiftKey && $(this).val()) {
			sendMessage($(this).val());
			$(this).val('');
			e.preventDefault();
		}
	});
	// nickname input
	let nickname = getCookie('nickname');
	if (nickname && nickname != "undefined") {
		current.nickname = nickname;
		$('.login-space').hide();
		socket.emit('join', current);
		current_users.push(current);
		updateUsers();
	}
	$('.demo-space').removeClass('hidden');
	$('.nickname-input').on('keypress', function(e) {
		let code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13) {
			$('.login-space').addClass('hidden');
			current.nickname = $(this).val();
			setCookie('nickname', current.nickname);
			// current_users.push(current);
			// updateUsers();
			// socket.emit('join', current);
			window.location.reload();
		}
	});
	// nickname leave
	$(window).on("beforeunload", function() { 
		socket.emit('leave', current);
	});
	// reset nickname
	$('.reset-user').on('click', function() {
		let confirm = window.confirm('Are you sure you want to reset your persona?');
		if (confirm) {
			setCookie('nickname', undefined);
			window.location.reload();
		}
	});
	// socket actions
	socket.on('message', function(data) {
		receiveMessage(data);
	});
	socket.on('join', function(data) {
		let to_add = {
			nickname: data.nickname,
			nickname_salt: data.nickname_salt
		}
		let not_found = true;
		current_users.forEach(function(user) {
			if ((user.nickname == to_add.nickname) && (user.nickname_salt == to_add.nickname_salt)) {
				not_found = false;
			}
		});
		if (not_found) {
			current_users.push(to_add);
		}
		updateUsers();
	});
	socket.on('leave', function(data) {
		if ((data.nickname == current.nickname) && (data.nickname_salt == current.nickname_salt)) {
			socket.emit('join', current);
		} else {
			current_users = current_users.filter((user) => {
				return ((user.nickname != data.nickname) || (user.nickname_salt != data.nickname_salt));
			});
			updateUsers();
		}
	});
});