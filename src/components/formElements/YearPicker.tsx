/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de YearPicker fue escrita por Luis Noriega
 */

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import * as DateFns from 'date-fns';
import es from 'date-fns/locale/es';

import 'react-datepicker/dist/react-datepicker.css';

import RenderErrors from '../../components/RenderErrors';

import { Help, LabelInput, WrapperContentInput, WrapperIconAfter, WrapperInput } from '../../styled/formElements/Input';

import IYearPickerProps from '../../interfaces/formElements/IYearPickerProps';

import IconCalendar from '../../assets/img/svg/iconCalendar.svg';

registerLocale('es', es);

const YearPicker: React.FC<IYearPickerProps> = ({
	id,
	name,
	label = '',
	maxYear = new Date().getFullYear(),
	minYear = 1900,
	onChange = (name: string, date: Date, event: React.SyntheticEvent<any>) => console.log(),
	onBlur = (name: string, event: React.FocusEvent<HTMLInputElement>) => console.log(),
	iconAfter = <img width={15} alt='iconoDeCalendario' src={IconCalendar} />,
	disabled = false,
	required = false,
	help,
	errors,
	showlabel = false,
	value,
	...props
}) => {
	const formatYear = 'yyyy';
	const [focus, setFocus] = useState(false);
	const [startDate, setStartDate] = useState(new Date());

	const handleChange = (date: Date, event: React.SyntheticEvent<any>) => {
		setStartDate(date);
		if (DateFns.isValid(date)) onChange?.(name, date, event);
	};

	const onFocus = (event: React.FocusEvent<HTMLInputElement>) => setFocus(true);
	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setFocus(false);
		if (onBlur) onBlur(name, event);
	};

	return (
		<WrapperInput disabled={disabled} hasError={errors && Object.keys(errors).length > 0} hasLabel={showlabel}>
			{showlabel && (
				<LabelInput htmlFor={id} focus={focus} hasValue={value !== null && value !== undefined && value > 0}>
					{required && <span style={{ color: 'red' }}>*</span>} {label}
				</LabelInput>
			)}
			<WrapperContentInput className={props?.classListInput?.join(' ') || ''}>
				<DatePicker
					id={id}
					name={name}
					locale='es'
					className='sura-form-control-year-picker'
					value={value?.toString()}
					selected={startDate}
					dateFormat={formatYear}
					maxDate={new Date(maxYear, 0, 1)}
					minDate={new Date(minYear, 0, 1)}
					disabled={disabled}
					required={required}
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={handleBlur}
					placeholderText={props['placeholder']}
					showYearPicker
					yearItemNumber={9}
				/>
				{iconAfter && <WrapperIconAfter>{iconAfter}</WrapperIconAfter>}
			</WrapperContentInput>
			{help && <Help focus={focus}>{help}</Help>}
			{errors && <RenderErrors errors={errors} />}
		</WrapperInput>
	);
};

export default YearPicker;
