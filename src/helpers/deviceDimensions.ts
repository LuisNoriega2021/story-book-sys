export const mobileSmall = (css: string) => {
	return `
		@media all and (min-width: 10px) and (max-width: 320px){
			${css}
		}
  `;
};

export const mobileMedium = (css: string) => {
	return `
		@media all and (min-width: 321px) and (max-width: 375px){
			${css}
		}
  `;
};

export const mobile = (css: string) => {
	return `
		@media all and (min-width: 376px) and (max-width: 425px){
			${css}
		}
  `;
};

export const allMobile = (css: string) => {
	return `
		@media all and (max-width: 450px){
			${css}
		}
  `;
};

export const tablet = (css: string) => {
	return `
		@media all and (min-width: 451px) and (max-width: 768px){
			${css}
		}
  `;
};

export const portatil = (css: string) => {
	return `
		@media all and (min-width: 769px) and (max-width: 1024px){
			${css}
		}
  `;
};

export const portatilLarge = (css: string) => {
	return `
		@media all and (min-width: 1025px) {
			${css}
		}
  `;
};

export const matchMediaScreen = (media: string) => {
	if (window) {
		return window.matchMedia(media).matches;
	}
	return false;
};

export const isMobile = () => {
	return matchMediaScreen(`(max-width: 767px)`);
};

export const isTablet = () => {
	return matchMediaScreen(`(max-width: 768px)`);
};

export const isPortatilSm = () => {
	return matchMediaScreen(`(max-width: 1024px)`);
};

export const isPortatilMd = () => {
	return matchMediaScreen(`(max-width: 1280px)`);
};

export const isPortatilLg = () => {
	return matchMediaScreen(`(max-width: 1440px)`);
};
