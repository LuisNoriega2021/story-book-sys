import moment from 'moment';
import { addMonths, addDays, differenceInYears, isBefore, isAfter } from 'date-fns/fp';

/**
 * Librería de funciones para fechas
 * @module Time
 */
export default {
	/**
	 * @name edadActuarial
	 * @description calcula edad Actuarial
	 * @param {string} fechaNac Fecha de Nacimiento dd/MM/yyyy
	 */
	edadActuarial(fechaNac: string): number {
		const [month = 0, day = 1, year = 1900] = fechaNac.split('/');
		const fecha = new Date(Number(year), Number(month) - 1, Number(day));
		const fechaCumple = new Date(new Date().getFullYear(), Number(month) - 1, Number(day));
		const fechaActual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

		if (isAfter(fechaActual, fechaCumple)) {
			if (isBefore(addDays(1, addMonths(6, fechaActual)), fechaCumple)) {
				return differenceInYears(fecha, fechaActual) + 1;
			}
		}
		return differenceInYears(fecha, fechaActual);
	},
	edadActual(fechaNac: string): number {
		const [day = 1, month = 0, year = 1900] = fechaNac.split('/');
		const fecha = new Date(Number(year), Number(month) - 1, Number(day));

		return differenceInYears(fecha, new Date());
	},
	/**
	 * @name calculateElapsedTime
	 * @description calcula el tiempo transcurrido entre 2 fechas y lo devuelve en formato 1s, 1m, 1h, 1d
	 * @param {[Date=new Date()]} startDate fecha inicio para calcular diferencia
	 * @param {[Date=new Date()]} endDate fecha fin
	 * @param {[boolean=true]} shortTimeRepresentation indicador para visualizar el tiempo de forma corta
	 * @returns
	 */
	calculateElapsedTime(startDate = new Date(), endDate = new Date(), shortTimeRepresentation = true) {
		const _startDate = moment(startDate);
		const _endDate = moment(endDate);
		let time = _endDate.diff(_startDate, 'days');
		let displayTime = `${time}${shortTimeRepresentation ? 'd' : ' days'}`;

		if (time < 1) {
			time = _endDate.diff(_startDate, 'hours');
			displayTime = `${time}${shortTimeRepresentation ? 'h' : ' hours'}`;
		}

		if (time < 1) {
			time = _endDate.diff(_startDate, 'minutes');
			displayTime = `${time}${shortTimeRepresentation ? 'm' : ' minutes'}`;
		}

		if (time < 1) {
			time = _endDate.diff(_startDate, 'seconds');
			displayTime = `${time}${shortTimeRepresentation ? 's' : ' seconds'}`;
		}

		return displayTime;
	},
};
