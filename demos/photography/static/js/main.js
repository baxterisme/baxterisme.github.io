let show = (elem, time = 500) => {
	setTimeout(() => {
		if (elem == 'footer' || elem == '#menu-block')
			document.querySelector(elem).style.display = 'flex';
		else
			document.querySelector(elem).style.display = 'block';
		
		setTimeout(() => document.querySelector(elem).style.opacity = 1, 100);
	}, time);
}

let hide = (elem, time = 500) => {
	document.querySelector(elem).style.opacity = 0;

	setTimeout(() => {
		document.querySelector(elem).style.display = 'none';
	}, time);
}

function changeMenuColor(href) {
	document.querySelectorAll('#menu-content a').forEach(item => {
		if (item.getAttribute('href') == href)
			item.style.color = '#666A6D';
		else
			item.style.color = '#EDEAE0';
	});
}

function onHashChange() {
	// header background depends on section 
	if (location.hash == '#home' || location.hash == '')
		document.querySelector('header').style.background = 'transparent';
	else if (location.hash == '#about' || location.hash == '#portfolio' || location.hash == '#contact')
		setTimeout(() => document.querySelector('header').style.background = '#0C090A', 500);

	// hide menu
	if (document.querySelector('#menu-block').style.display != 'none') hide('#menu-block');

	setTimeout(() => {
		if ((location.hash == '#home' || location.hash == '') && document.querySelector('#introduction').style.display == 'none') {
			// hide other sections
			hide('#about');
			hide('#portfolio');
			hide('footer');

			// display this section
			show('#introduction');

			changeMenuColor('#home');
		} 
		else if (location.hash == '#about' && document.querySelector('#about').style.display == 'none') {
			// hide other sections
			hide('#introduction');
			hide('#portfolio');
			hide('footer');

			// display this section
			show('#about');

			changeMenuColor('#about');
		} 
		else if (location.hash == '#portfolio' && document.querySelector('#portfolio').style.display == 'none') {
			// hide other sections
			hide('#introduction');
			hide('#about');
			hide('footer');

			// display this section
			show('#portfolio');

			changeMenuColor('#portfolio');
		}
		else if (location.hash == '#contact' && document.querySelector('footer').style.display == 'none') {
			// hide other sections
			hide('#introduction');
			hide('#about');
			hide('#portfolio');

			// display this section
			show('footer');

			changeMenuColor('#contact');
		}
	}, 400);
}

onHashChange();

window.onhashchange = () => onHashChange();

let prev = () => {
	let about = document.querySelector('#about');
	let portfolio = document.querySelector('#portfolio');
	let footer = document.querySelector('footer');

	if (location.hash == '#about' && about.scrollTop <= 0 && about.style.opacity == 1) {
		location.hash = 'home';

		// hide about section
		hide('#about');

		// display introduction
		show('#introduction');
	}
	else if (location.hash == '#portfolio' && portfolio.scrollTop <= 0 && portfolio.style.opacity == 1) {
		location.hash = 'about';

		// hide portfolio section
		hide('#portfolio');

		// transition to about section
		show('#about');
	}
	else if (location.hash == '#contact' && footer.scrollTop <= 0 && footer.style.opacity == 1) {
		location.hash = 'portfolio';

		// hide footer
		hide('footer');

		// transition to portfolio
		show('#portfolio');
	}
}

let next = () => {
	let about = document.querySelector('#about');
	let portfolio = document.querySelector('#portfolio');

	if (location.hash == '#home' || location.hash == '') {
		location.hash = 'about';

		// hide introduction
		intro.style.opacity = 0;

		setTimeout(() => {
			intro.style.display = 'none';
		}, 500);

		// transition to about section
		show('#about');
	}
	else if (location.hash == '#about' && about.style.opacity == 1) {
		if (about.scrollTop >= about.scrollHeight - about.offsetHeight - 2) {
			location.hash = 'portfolio';

			// hide about section
			hide('#about');

			// transition to portfolio
			show('#portfolio');
		}
	}
	else if (location.hash == '#portfolio' && portfolio.style.opacity == 1) {
		if (portfolio.scrollTop >= portfolio.scrollHeight - portfolio.offsetHeight - 2) {
			location.hash = 'contact';

			// hide portfolio
			hide('#portfolio');

			// transition to end
			show('footer');
		}
	}
}

// smooth animation when scrolling the window
let page = document.querySelector('#page');
let intro = document.querySelector('#introduction');

if(/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// finger swipes	
	let [touchstartY, touchendY] = [0, 0];

	page.addEventListener('touchstart', function(event) {
	    touchstartY = event.changedTouches[0].screenY;
	}, false);

	page.addEventListener('touchend', function(event) {
	    touchendY = event.changedTouches[0].screenY;

	    handleGesture();
	}, false); 

	function handleGesture() {
	    if (touchendY < touchstartY)
	    	next();

	    if (touchendY > touchstartY) 
			prev();
	}
} else {
	page.onwheel = event => {
		if (event.deltaY < 0)
			prev();

		else if (event.deltaY > 0)
			next();
	}
}


document.querySelector('.scroll-downbtn').onclick = () => next();

// animation with menu
document.querySelector('#menu > span').onclick = () => show('#menu-block', 400);
document.querySelector('#exitmenubtn').onclick = () => hide('#menu-block', 400);

// choose specific photos in portfolio section
let switches = document.querySelectorAll('#portfolio-header li');

function hidePhoto(type) {
	let photos = document.querySelectorAll('#portfolio-body img');

	photos.forEach(item => {
		item.style.opacity = 0;

		setTimeout(() => item.style.display = 'none', 500);
	});

	setTimeout(() => {
		photos.forEach(item => {
			if (item.getAttribute('type') == type || type == '') {
				item.style.display = 'block';

				setTimeout(() => item.style.opacity = 1, 500);	
			}
		});
	}, 500);
}

switches.forEach(item => {
	item.onclick = () => {
		switches.forEach(elem => elem.style.color = '#EDEAE0');

		item.style.color = '#666A6D';

		switch (item.type) {
			case 'portraits':
				hidePhoto(item.type);
				break;

			case 'events':
				hidePhoto(item.type);
				break;

			case 'families':
				hidePhoto(item.type);
				break;

			default:
				hidePhoto(item.type);
		}
	}
});

