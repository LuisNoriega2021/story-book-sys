export const telRegex = /^[7|6|2]{1}[0-9]{7}$/;
export const regexDecimal = /^[0-9]*(\.\d{0,2})?$/;
export const regexNumbers = /^[0-9]*$/;
export const textUpRegex = /^[A-Za-z]+$/;
export const regexLettersSpacesTildes = /^[A-Za-z áéíóúñÁÉÍÓÚÑ]+$/;
export const regexNIT = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;
export const regexDUI = /^[0-9]{8}-[0-9]{1}$/;
export const regexEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexFirstLetterUpperCase = /\b[a-z]/g;
export const regexCelNacional = /^\+503[7|6|2]{1}[0-9]{7}$/;

export const first_letter_uppercase_word = (str: string): string => {
	return str.toLowerCase().replace(regexFirstLetterUpperCase, (c) => c.toUpperCase());
};

export const validateQuotes = (value: string) => {
	try {
		if (value.includes('"') || value.includes("'")) {
			return Promise.reject(new Error('Ingresó un caracter no permitido'));
		}
		return Promise.resolve();
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const validateTel = (value: string) => {
	try {
		if (telRegex.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('El teléfono debe iniciar con 7, 6 o 2 y contener 8 dígitos'));
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

// This only works for decimals greater than 0.01
export const validateDecimal = (value: string) => {
	try {
		if (regexDecimal.test(value)) {
			if (Number(value) <= 0) {
				return Promise.reject(new Error(`La cantidad debe ser mayor a 0`));
			}
			return Promise.resolve();
		}
		return Promise.reject(new Error(`Se permiten 2 decimales`));
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const validateNumbers = (value: string) => {
	try {
		if (regexNumbers.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Sólo se permiten números'));
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const validateCharImage = (value: string) => {
	try {
		if (value.includes('.')) {
			return Promise.reject(new Error('El nombre de la imagen no puede contener puntos'));
		}
		return Promise.resolve();
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const validateUpperCaseLetters = (value: string) => {
	try {
		if (textUpRegex.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Sólo letras mayúsculas permitidas'));
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const validateLetters = (value: string) => {
	try {
		if (regexLettersSpacesTildes.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Sólo letras, espacios y tildes permitidas'));
	} catch (error: any) {
		return Promise.reject(new Error(`Se permiten 2 decimales`));
	}
};

export const validateEmailPromise = (value: string) => {
	try {
		const text = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
		if (text.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('No es un correo permitido'));
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const charactersPermited = (value: string) => {
	// valida que solo hayan caractres alphanumericos permitidos
	const permits = 'abcdefghijklmnñopqrstuvwxyzáéíóú 0123456789!#$%&+,.:=@^_|';
	try {
		if (value) {
			for (let i = 0; i < value.length; i += 1) {
				if (permits.toLowerCase().indexOf(value.toLowerCase().charAt(i), 0) === -1) {
					return Promise.reject(new Error('Ingresó un carácter no permitido'));
				}
			}
		}
		return Promise.resolve();
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const whitespace = (value: string) => {
	// valida que solo hayan caracteres alfanuméricos permitidos
	const permits = ' ';
	try {
		if (value) {
			for (let i = 0; i < value.length; i += 1) {
				if (permits.toLowerCase().indexOf(value.toLowerCase().charAt(i), 0) !== -1) {
					return Promise.reject(new Error('No se admiten espacios'));
				}
			}
		}
		return Promise.resolve();
	} catch (error: any) {
		return Promise.reject(new Error(error.message));
	}
};

export const alphanumeric = (value: string) => {
	if (value) {
		const numeros = '0123456789';
		const letras = 'abcdefghyjklmnñopqrstuvwxyz';
		const specialChart = '!#$%&+,.:=@^_|"';
		let containNumber = false;
		let containLowerCase = false;
		let containUpperCase = false;
		let containSpecial = false;
		let message;

		// valida que hayan números
		for (let i = 0; i < value.length; i += 1) {
			if (numeros.indexOf(value.charAt(i), 0) !== -1) {
				containNumber = true;
			}
		}

		// valida que hayan minúsculas
		for (let i = 0; i < value.length; i += 1) {
			if (letras.toLowerCase().indexOf(value.charAt(i), 0) !== -1) {
				containLowerCase = true;
			}
		}

		// valida que hayan minúsculas
		for (let i = 0; i < value.length; i += 1) {
			if (letras.toUpperCase().indexOf(value.charAt(i), 0) !== -1) {
				containUpperCase = true;
			}
		}

		// valida que hayan caracteres especiales
		for (let i = 0; i < value.length; i += 1) {
			if (specialChart.indexOf(value.charAt(i), 0) !== -1) {
				containSpecial = true;
			}
		}

		if (!containNumber || !containLowerCase || !containUpperCase || !containSpecial) {
			message = 'La contraseña debe contener ';

			if (!containNumber) message = `${message} números`;

			if (!containLowerCase) {
				if (containUpperCase && containSpecial && !containNumber) message = `${message} y`;
				else if (!containNumber) message = `${message},`;

				message = `${message} minúsculas`;
			}

			if (!containUpperCase) {
				if (containSpecial && (!containNumber || !containLowerCase)) {
					message = `${message} y`;
				} else {
					if (!containLowerCase || !containNumber) message = `${message},`;
					message = `${message} mayúsculas`;
				}
			}

			if (!containSpecial) {
				if (!containNumber || !containLowerCase || !containUpperCase) message = `${message} y`;
				message = `${message} caracteres especiales`;
			}

			return Promise.reject(new Error(message));
		}
		return Promise.resolve();
	}
	return Promise.resolve();
};

/**
 * función para para validar NIT
 * @name validarNIT
 * @param {string} numero NIT
 */
export const validarNIT = (numero: string): boolean => {
	let Valido = false;

	if (!numero) return Valido;
	if (regexNIT.exec(numero) === null) return Valido;
	if (numero === '0000-000000-000-0') return Valido;

	Valido = true;
	const x = numero;
	let part;
	let factor = 0;
	let cal = 0;
	let i;
	let n;
	part = x.substring(12, 15);
	part = parseInt(part);

	if (part <= 100) {
		n = 1;
		for (i = 0; i <= 14; i++) {
			if (!(i === 4 || i === 11)) {
				cal += parseInt(x.charAt(i)) * (15 - n);
				n++;
			}
		}
		cal %= 11;
		if (cal == 10) cal = 0;
	} else {
		n = 1;
		for (i = 0; i <= 14; i++) {
			if (!(i === 4 || i === 11)) {
				factor = 3 + 6 * Math.floor(Math.abs((n + 4) / 6)) - n;
				cal += parseInt(x.charAt(i)) * factor;
				n++;
			}
		}
		cal %= 11;

		if (cal > 1) cal = 11 - cal;
		else cal = 0;
	}

	const a = parseInt(x.charAt(16));
	if (a != cal) Valido = false;

	return Valido;
};

/**
 * función para validar el correo electrónico
 * @name validateEmail
 * @param {string} email Correo electrónico
 */
export const validateEmail = (email: string) => regexEmail.test(email);

/**
 * función para validar el DUI
 * @name verificationDUI
 * @param {string} DUI Numero de documento
 */
export const verificationDUI = (DUI: string) => {
	if (!DUI) return false;
	if (regexDUI.exec(DUI) === null) return false;
	if (DUI === '00000000-0') return false;

	if (DUI) {
		const regex = /(^\d{8})-(\d$)/;
		const splitDUI = DUI.match(regex);

		if (splitDUI !== null) {
			const objDUI = {
				digits: splitDUI[1],
				check_digit: parseInt(splitDUI[2]),
			};

			let sum = 0;

			for (let i = 0; i < objDUI.digits.length; i++) {
				const curatedDigits = parseInt(objDUI.digits[i], 10);
				sum += (9 - i) * curatedDigits;
			}

			const division = sum % 10;
			const subtraction = 10 - division;

			if (objDUI.check_digit === subtraction % 10) {
				return true;
			}
			return false;
		}
		return false;
	}

	return false;
};

/**
 * función para formatear un numero de teléfono
 * @name formatoTel
 * @param {string} tel Numero de teléfono
 */
export const setFormatPhone = (tel: string = '') => {
	const newFormat = tel;

	if (newFormat) {
		if (newFormat.indexOf('-') <= -1 && newFormat.length === 8) {
			return `${newFormat.substring(0, 4)}-${newFormat.substring(4, 8)}`;
		}
	}

	return newFormat;
};

/**
 * función para formatear un numero de DUI
 * @name formatoDUI
 * @param {string} dui Numero de DUI
 */
export const setFormatDUI = (dui: string) => {
	const newFormat = dui;

	if (newFormat) {
		if (newFormat.indexOf('-') <= -1 && newFormat.length === 9) {
			return `${newFormat.substring(0, 8)}-${newFormat.substring(8, 9)}`;
		}
	}

	return newFormat;
};

/**
 * funcion para formatear un numero de NIT
 * @name formatoNIT
 * @param {string} nit Numero de NIT
 */
export const setFormatNIT = (nit: string) => {
	let _nit: string | string[] = nit;
	let _rnit = '';

	if (_nit) {
		if (_nit.indexOf('-') <= -1 && _nit.length === 14) {
			_nit = _nit.split('');
			_nit.forEach((v: string, i: number) => {
				if (i === 4 || i === 10 || i === 13) _rnit = `${_rnit}-${v}`;
				else _rnit += v;
			});
		}
	}

	return _rnit || _nit;
};

export const validFirstLetterUpperToWord = (text: string): boolean => {
	return text
		.trim()
		.split(' ')
		.map((word) => {
			const copyFirstLetter = word.charAt(0);

			return copyFirstLetter === word.charAt(0).toUpperCase();
		})
		.every((valid) => valid === true);
};

/**
 * función para validar un numero de celular Nacional
 * @name celNacional
 * @param {string} cel Numero de celular
 * @return {boolean}
 */
export const celNacional = (cel: string): boolean => {
	cel = cel.replace(/\s+/g, '').replace(/-+/g, '');

	return regexCelNacional.test(cel);
};

export const formatoNumero = (valor: number) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valor);
};

/**
 * funcion para homologar dui
 * @name homologarDui
 * @param {string} dui Numero de DUI
 * @return {string}
 */
export const homologarDui = (dui: string): string => {
	const _dui = `00000${dui.replace('-', '')}`;
	return _dui;
};

export const regex = {
	telRegex,
	regexDecimal,
	regexNumbers,
	textUpRegex,
	regexLettersSpacesTildes,
	regexNIT,
	regexDUI,
	regexEmail,
	regexFirstLetterUpperCase,
	regexCelNacional,
};

export const validator = {
	validateQuotes,
	validateTel,
	validateDecimal,
	validateNumbers,
	validateCharImage,
	validateUpperCaseLetters,
	validateLetters,
	validateEmailPromise,
	charactersPermited,
	whitespace,
	alphanumeric,
	validarNIT,
	validateEmail,
	verificationDUI,
	setFormatPhone,
	setFormatDUI,
	setFormatNIT,
	validFirstLetterUpperToWord,
	first_letter_uppercase_word,
	celNacional,
	formatoNumero,
	homologarDui,
};
