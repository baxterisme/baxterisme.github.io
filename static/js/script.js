window.onload = () => {
	// portfolio demos
	let works = document.querySelectorAll('.work button');
	let lightbox = document.querySelector('#lightbox');	

	works.forEach(elem => {
		elem.onclick = () => {
			if (elem.getAttribute('link')) {
				window.open(elem.getAttribute('link'));
			} else {
				window.open('./demos/photography/index.html');
			}
		}
	});

	// animation with the arrow for scrolling down
	window.onscroll = () => {
		let elem = document.querySelector('#intro a');

		if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
			elem.style.transform = 'rotate(180deg)';

			elem.href = '#introduction';
		} else {
			elem.style.transform = 'rotate(0deg)';

			elem.href = '#about';
		}
	}
}
