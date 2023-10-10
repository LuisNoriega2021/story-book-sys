/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Calendar fue escrita por Luis Noriega
 */

import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import * as DateFns from 'date-fns';
import es from 'date-fns/locale/es';

import 'react-datepicker/dist/react-datepicker.css';

import RenderErrors from '../../components/RenderErrors';

import { Help, LabelInput, WrapperContentInput, WrapperIconAfter, WrapperInput } from '../../styled/formElements/Input';
import { WrapperHeader, WrapperMonths, WrapperYears } from '../../styled/formElements/CalendarStyled';

import ICalendarProps, { FormatedToString } from '../../interfaces/formElements/ICalendarProps';

import IconCalendar from '../../assets/img/svg/iconCalendar.svg';

registerLocale('es', es);

const Calendar: React.FC<ICalendarProps> = ({
	id = Math.random().toString(),
	name = 'fieldDate' + Math.random().toString(),
	label = '',
	defaultValue,
	maxDate,
	minDate,
	onChange = (name: string, date: Date, event: React.SyntheticEvent<any>) => console.log(),
	onBlur = (name: string, event: React.FocusEvent<HTMLInputElement>) => console.log(),
	iconAfter = <img width={15} alt='iconoDeCalendario' src={IconCalendar} />,
	disabled = false,
	required = false,
	help,
	errors,
	showlabel = false,
	...props
}) => {
	const formatDate = 'dd/MM/yyyy';
	const [date, setDate] = useState<Date>(null);
	const [focus, setFocus] = useState(false);

	const handleChange = (value: Date, event: React.SyntheticEvent<any>) => {
		if (DateFns.isValid(value)) {
			if (onChange) onChange(name, value, event);
			setDate(value);
		}
	};

	const range = (inicio: number, fin: number, intervalo: number) => {
		fin = maxDate === undefined ? fin : DateFns.isValid(maxDate) ? new Date(maxDate).getFullYear() : fin;
		inicio = minDate === undefined ? inicio : DateFns.isValid(minDate) ? new Date(minDate).getFullYear() : inicio;
		const rango: number[] = [];

		for (let i = inicio; i <= fin; i++) rango.push(i);

		return rango;
	};

	const years = range(1900, new Date().getFullYear(), 1);
	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];

	const onFocus = (event: React.FocusEvent<HTMLInputElement>) => setFocus(true);
	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setFocus(false);
		if (onBlur) onBlur(name, event);
	};

	const formatedDateBasic = (
		dateOfString: FormatedToString,
		whatReturn: 'string' | 'date' = 'string',
	): FormatedToString => {
		let valueReturn: FormatedToString;

		if (typeof dateOfString === 'string') {
			const dateSplit = dateOfString.split('/');

			if (dateSplit.length > 0) {
				const transform = new Date(
					Number(dateSplit[2] || 1900),
					Number(dateSplit[1] || 0) - 1,
					Number(dateSplit[0] || 1),
				);

				valueReturn = transform;
			}
		}

		return whatReturn === 'string' ? valueReturn.toString() : valueReturn;
	};

	useEffect(() => {
		if (defaultValue) {
			if (typeof defaultValue === 'string' && defaultValue !== '')
				setDate(formatedDateBasic(defaultValue, 'date') as Date);
			else setDate(new Date(defaultValue.toString()));
		}
	}, [defaultValue]);

	return (
		<WrapperInput hasError={errors && Object.keys(errors).length > 0} hasLabel={showlabel} disabled={disabled}>
			{showlabel && (
				<LabelInput htmlFor={id} focus={focus} hasValue={date !== null && date !== undefined}>
					{required && <span style={{ color: 'red' }}>*</span>} {label}
				</LabelInput>
			)}
			<WrapperContentInput>
				<DatePicker
					id={id}
					name={name}
					locale='es'
					className={`sura-form-control ${props?.classListInput?.join(' ') || ''}`}
					popperClassName='customPopperClassName'
					selected={props.value ? (formatedDateBasic(props.value, 'date') as Date) : date !== null ? date : undefined}
					dateFormat={formatDate}
					maxDate={maxDate}
					minDate={minDate}
					disabled={disabled}
					required={required}
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={handleBlur}
					placeholderText={props['placeholder']}
					renderCustomHeader={({
						date,
						changeYear,
						changeMonth,
						decreaseMonth,
						increaseMonth,
						prevMonthButtonDisabled,
						nextMonthButtonDisabled,
					}) => (
						<WrapperHeader>
							<WrapperMonths>
								<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
									{'◄'}
								</button>

								<select
									value={months[date.getMonth()]}
									onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
								>
									{months.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>

								<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
									{'►'}
								</button>
							</WrapperMonths>

							<WrapperYears>
								<select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(Number(value))}>
									{years.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</WrapperYears>
						</WrapperHeader>
					)}
				/>
				{iconAfter && <WrapperIconAfter>{iconAfter}</WrapperIconAfter>}
			</WrapperContentInput>
			{help && <Help focus={focus}>{help}</Help>}
			{errors && <RenderErrors errors={errors} />}
		</WrapperInput>
	);
};

export default Calendar;
