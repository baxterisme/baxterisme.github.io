// best selling slider
$('#bestSelling').slick({
	arrows: false,
	autoplay: true,
	autoplaySpeed: 3000,
	infinite: true
});

$('.lightbox-child').slick({
	arrows: true
});

function hideMobileMenu() {
	document.querySelector('.mobileMenu').style.transform = 'translateX(-100%)';

	setTimeout(() => {
		document.querySelector('#mobileMenu').style.opacity = 0;
	}, 300);

	setTimeout(() => {
		document.querySelector('#mobileMenu').style.display = 'none';
	}, 400);
}

document.querySelector('.menuButton').onclick = () => {
	document.querySelector('#mobileMenu').style.display = 'flex';

	setTimeout(() => {
		document.querySelector('#mobileMenu').style.opacity = 1;
	}, 100);

	setTimeout(() => {
		document.querySelector('.mobileMenu').style.transform = 'none';
	}, 300);
}
document.querySelector('.exit_menu_m').onclick = () => hideMobileMenu();

if(/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	let _this_ = null;
	let dropdown = document.getElementsByClassName('dropdown-child');

	for (let i = 0; i < dropdown.length; i++) {
		dropdown[i].onclick = function() {
			_this_ = this.childNodes[1];

			this.childNodes[1].style.display = 'block';
		}
	}

	window.onclick = event => { 
		if (event.target.className != 'dropdown-child') _this_.style.display = 'none'; 
	}
}

let showdetails = document.getElementsByClassName('showDetails');
let boolDetails = true;

for (let i = 0; i < showdetails.length; i++) {
	showdetails[i].onclick = function() {
		if (boolDetails) {
			this.style.transform = 'rotate(-180deg) translateX(-50%)';
			this.parentElement.childNodes[3].style.transform = 'none';

			boolDetails = false;
		} else {
			this.parentElement.childNodes[3].style.transform = 'translateY(100%)';
			showdetails[i].style.transform = 'translateX(-50%)';

			boolDetails = true;			
		}
	}
		
}

document.querySelector('#about-mobile-link').onclick = () => hideMobileMenu();

for (let i = 1; i <= 3; i++) {
	document.querySelector(`#album div:nth-child(${i})`).onclick = () => {
		document.getElementById('lightbox').style.display = 'block';

		setTimeout(() => document.getElementById('lightbox').style.opacity = 1, 100);

		if (i == 1) {
			document.getElementById('running').style.display = 'block';
			document.getElementById('skateboarding').style.display = 'none';
			document.getElementById('training').style.display = 'none';
		}
		else if (i == 2) {
			document.getElementById('running').style.display = 'none';
			document.getElementById('skateboarding').style.display = 'block';
			document.getElementById('training').style.display = 'none';
		} else {
			document.getElementById('running').style.display = 'none';
			document.getElementById('skateboarding').style.display = 'none';
			document.getElementById('training').style.display = 'block';
		}

		$('.lightbox-child').slick('setPosition');
	}
}

document.querySelector('.exit-lightbox').onclick = () => {
	document.getElementById('lightbox').style.opacity = 0;

	setTimeout(() => document.getElementById('lightbox').style.display = 'none', 100);
}

function sendEmail(uname, uphone, checkbox, event) {
	event.preventDefault();

	let name = document.querySelector(uname).value != '';
	let phone = document.querySelector(uphone).value != '';
	let checked = document.querySelector(checkbox).checked == true;

	let actions = (event, elem) => {
		document.querySelector(elem).style.border = '1px solid red';

		setTimeout(() => {
			document.querySelector(elem).style.border = '1px solid #fff'; 
		}, 150);
	}

	if (name && phone && checked) {
		document.querySelector('#success-contact').innerText = 'Thank you, your application has been sent! We will contact you and answer all your questions!';

		document.querySelector('.contacts-email form').reset();
	} else {
		if (!name) {
			actions(event, uname);
		}
		if (!phone) {
			actions(event, uphone);
		}
		if (!checked) {
			event.preventDefault();

			document.querySelector('#checkbox-block').style.border = '1px solid red';

			setTimeout(() => {
				document.querySelector('#checkbox-block').style.border = 'none';
			}, 150);
		} 
	}
}

document.querySelector('#form-block button').onclick = event => {
	event.preventDefault();

	let condition = document.querySelector('#form-block input').value != '' && document.querySelector('#form-block input').value.includes('@');

	if (condition) {
		document.querySelector('#success-contact-f').innerText = 'Thank you, your application has been sent! We will contact you and answer all your questions!';
	} else {
		document.querySelector('#form-block input').style.border = '1px solid red';

		setTimeout(() => {
			document.querySelector('#form-block input').style.border = '1px solid #fff'; 
		}, 150);		
	}
}

document.querySelector('.contacts-email button').onclick = event => {
	sendEmail('.contacts-email input[name=name]', '.contacts-email input[name=phone]', '.contacts-email input[name=agreement]', event);
}

function displayContacts() {
	document.querySelector('#contacts').style.display = 'block';

	setTimeout(() => document.querySelector('#contacts').style.opacity = 1, 100);
}

for (let i = 0; i < 2; i++) {
	document.getElementsByClassName('contacts-show')[i].onclick = () => displayContacts();
}

document.querySelector('.contacts-exit i').onclick = () => {
	document.querySelector('#contacts').style.opacity = 0;

	setTimeout(() => document.querySelector('#contacts').style.display = 'none', 100);
}

document.querySelector('#mobile-contacts').onclick = () => {
	hideMobileMenu();
	setTimeout(() => displayContacts(), 500);
}

window.onload = () => {
	if (document.querySelector('#product')) {
		location.hash = 'product';
	}
}