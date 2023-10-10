/**
 * @fileoverview Textos, funciones para formatear textos
 *
 * @version                               1.0
 *
 * @author                 Daniel Elías <lnoriega@asesuisa.com>
 * @copyright           asesuisa.com
 *
 * History
 * v1.0 – Se añadieron las funciones removeAccents, eliminarDiacriticosEs, dateFormatDDMMYY, replaceCharacters
 * ----
 * La primera versión de Textos fue escrita por Daniel Elías
 */

import * as DateFns from 'date-fns';

/**
 * @function removeAccents
 * Elimina los acentos diacriticos en las palabras
 *
 * @param {string} texto - texto a formatear
 * @return {string} Texto formateado sin acentos diacriticos
 */
export const removeAccents = (texto: string): string => {
	// \u0300 = acento grave
	// \u036f = letra ñ
	return texto.normalize('NFD').replace(/[\u0300]/g, '');
};

/**
 * @function eliminarDiacriticosEs
 * Elimina todos los acentos diacriticos, excepto el de la letra ñ
 *
 * @param {string} texto - texto a formatear
 * @return {string} - Texto formateado sin acentos diacriticos excepto la letra ñ
 */
export const eliminarDiacriticosEs = (texto: string): string => {
	//return texto
	//	 .normalize('NFD')
	// .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
	// .normalize();
	return texto;
};

/**
 * @function dateFormatDDMMYY
 * Función para dar formato al texto de fecha
 * @param {string} date - Cadena de texto que pasaremos a formato de fecha dd/MM/yyyy | dd/MM/yy
 * @returns {string}
 */
export const dateFormatDDMMYY = (date: string) => {
	const [day = 1, month = 0, year = 1900] = date.split('/');

	date = DateFns.format(
		new Date(
			Number(year) > 1900 && Number(year) <= new Date().getFullYear() ? Number(year) : 1900,
			Number(month) - 1 > 11 ? 0 : Number(month) - 1,
			Number(day) < 32 ? Number(day) : 1,
		),
		'dd/MM/yyyy',
	);
	let dateFormated: string | string[] = date.replace(/[^0-9]/g, '');
	let resultDateFormated = '';

	if (dateFormated.length > 8) dateFormated = dateFormated.substring(0, 8);

	if (dateFormated && dateFormated.length <= 8) {
		dateFormated = dateFormated.split('');

		dateFormated.forEach((chart: string, indiceChart: number) => {
			if (indiceChart === 2 || indiceChart === 4) resultDateFormated = `${resultDateFormated}/${chart}`;
			else resultDateFormated += chart;
		});
	}

	return resultDateFormated || dateFormated;
};

/**
 * Recibe una cadena de texto y la formatea, retornando el numero de caracteres especificados mas caracteres al final
 * de la cadena
 * @function replaceCharacters
 * @param {string} text Texto al que se dara formato
 * @param {[number=35]} numberCharacters Numero de caracteres permitidos
 * @param {[string='...']} chartsEnd Caracteres que se agregaran al final del texto formateado
 * @returns {string} Texto formateado con los caracteres seleccionados
 */
// Solo te muestra el texto asta donde tu le especificas y al final muestra el caracter que tu le envies
export const replaceCharacters = (text: string, numberCharacters = 35, chartsEnd = '...'): string => {
	let characters = '';
	if (text.length > numberCharacters) characters = `${text.substring(0, numberCharacters)}${chartsEnd}`;
	else characters = text;
	return characters;
};

/**
 * Recibe un nombre y retorna un objeto con ese nombre dividido en 4
 * @param {string} srtNombre Nombre completo que se quiere desestructurar
 * @returns {object} Nombre dividido
 */
export const splitNombre = (srtNombre: string): object => {
	const [primerNombre = '', segundoNombre = '', primerApellido = '', segundoApellido = ''] = srtNombre.split(' ');
	return {
		primerNombre,
		segundoNombre,
		primerApellido,
		segundoApellido,
	};
};

export const capitalizeWord = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalizeWords = (parrafo: string): string => {
	const arr = parrafo.split(' ');

	for (let i = 0; i < arr.length; i++) {
		if (arr[i].length > 2) arr[i] = capitalizeWord(arr[i]);
	}

	return arr.join(' ');
};
