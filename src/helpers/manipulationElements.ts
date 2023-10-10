export const addClassElem = (classAdd: string, elem: HTMLElement | string) => {
	let _elem: HTMLElement;

	if (typeof elem === 'string') _elem = document.getElementById('elem');
	else _elem = elem;

	if (!_elem.classList.contains(classAdd)) _elem.classList.add(classAdd);
};

export const removeClassElem = (classRemove: string, elem: HTMLElement | string) => {
	let _elem: HTMLElement;

	if (typeof elem === 'string') _elem = document.getElementById('elem');
	else _elem = elem;

	if (!_elem.classList.contains(classRemove)) _elem.classList.remove(classRemove);
};

export const addClassElements = (classAdd: string, idsElemts: Array<string>): void => {
	idsElemts.forEach((elementId: string) => {
		addClassElem(classAdd, elementId);
	});
};

export const removeClassElements = (classRemove: string, idsElemts: Array<string>): void => {
	idsElemts.forEach((elementId: string) => {
		removeClassElem(classRemove, elementId);
	});
};

export const focusElement = (elementId: string) => {
	const element = document.getElementById(elementId);
	element?.focus();
};

export function currentYPosition(elm?: HTMLElement): number {
	if (!window && !elm) {
		return -0;
	}
	if (elm) return elm.scrollTop;
	// Firefox, Chrome, Opera, Safari
	if (window.pageYOffset) return window.pageYOffset;
	// Internet Explorer 6 - standards mode
	if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
	// Internet Explorer 6, 7 and 8
	if (document.body.scrollTop) return document.body.scrollTop;

	return 0;
}

export function elmYPosition(elm: HTMLElement) {
	let y: number = elm.offsetTop;
	let node: any = elm;

	while (node.offsetParent && node.offsetParent !== document.body) {
		node = node.offsetParent;
		y += node.offsetTop;
	}

	return y;
}

export function scrollTo(scrollableElement: HTMLElement, elmID: string) {
	const elm = document.getElementById(elmID);

	if (elm) {
		const startY = currentYPosition(scrollableElement);
		const stopY = elmYPosition(elm);

		const distance: number = stopY > startY ? stopY - startY : startY - stopY;

		if (distance < 100) {
			// scrollTo(0, stopY);
		} else {
			let speed: number = Math.round(distance / 50);
			if (speed >= 20) speed = 20;

			const step: number = Math.round(distance / 25);
			let leapY: number = stopY > startY ? startY + step : startY - step;
			let timer = 0;

			if (stopY > startY) {
				for (let i = startY; i < stopY; i += step) {
					setTimeout(
						(function (leapY) {
							return () => {
								scrollableElement.scrollTo(0, leapY);
							};
						})(leapY),
						timer * speed,
					);

					leapY += step;
					if (leapY > stopY) leapY = stopY;
					timer++;
				}
			} else {
				for (let i = startY; i > stopY; i -= step) {
					setTimeout(
						(function (leapY) {
							return () => {
								scrollableElement.scrollTo(0, leapY);
							};
						})(leapY),
						timer * speed,
					);
					leapY -= step;
					if (leapY < stopY) leapY = stopY;
					timer++;
				}
			}
		}
	}
}
