/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de DropDownList fue escrita por Luis Noriega
 */

import React, { useState } from 'react';

import RenderErrors from '../../components/RenderErrors';
import {
	CustomDropDownList,
	WrapperCustomDropDownList,
	WrapperSelect,
} from '../../styled/formElements/DropDownListStyled';
import { LabelInput } from '../../styled/formElements/Input';
import Tooltip from '../modals/Tooltip';

import IDropDownListProps, { IOptionDropDownList } from '../../interfaces/formElements/IDropDownListProps';

import IconoAyuda from '../../assets/img/svg/iconAlerta.svg';

const DropDownList: React.FC<IDropDownListProps> = ({
	id = 'cmb',
	name,
	noGenerarOpcion = false,
	opcionDefault = undefined,
	opciones = [],
	disabled = false,
	onChange,
	onBlur,
	errors,
	value,
	...props
}) => {
	const [focus, setFocus] = useState(false);

	const onFocus = (element: any) => {
		setFocus(true);
	};

	const handleBlur = (element: any) => {
		setFocus(false);

		if (onBlur) onBlur(element);
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		document.getElementById(id).blur();
		setFocus(false);
		if (onChange) onChange(e);
	};

	const hasValueChange = () => {
		const element = document.getElementById(id) as HTMLSelectElement;

		return element?.options[element.selectedIndex]?.value.length > 0;
	};

	return (
		<WrapperCustomDropDownList disabled={disabled}>
			{props.label && (
				<LabelInput
					focus={focus}
					hasValue={hasValueChange() || props?.placeholder?.length > 0}
					htmlFor={id}
					canPress={props.labelAyuda && props.labelAyuda.length > 0}
				>
					{props.required && <span style={{ color: 'red' }}>*</span>} {props.label}
					{props.labelAyuda && (
						<Tooltip message={props.labelAyuda} overlayStyle={{ width: 250 }} overlayInnerStyle={{}}>
							{<img width={14} style={{ marginLeft: 5 }} src={IconoAyuda} alt='iconoDeAyuda' />}
						</Tooltip>
					)}
				</LabelInput>
			)}
			<WrapperSelect focus={focus}>
				<CustomDropDownList
					hasError={errors && Object.keys(errors).length > 0}
					focus={focus}
					id={id}
					name={name}
					disabled={disabled}
					value={opcionDefault ? opcionDefault.id : value ? String(value.id) : ''}
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={handleBlur}
					className={`sura-form-control ${props?.classListInput?.join(' ') || ''}`}
					{...props}
				>
					{!noGenerarOpcion && !opcionDefault && props?.placeholder && (
						<option value='' disabled hidden>
							{props.placeholder}
						</option>
					)}
					{!noGenerarOpcion &&
						opciones.map(({ id: idOption, value: labelOption }: IOptionDropDownList, i: number) => (
							<option
								key={i}
								value={idOption}
								defaultChecked={opcionDefault ? idOption === opcionDefault?.id : value ? idOption === value.id : false}
							>
								{labelOption}
							</option>
						))}
				</CustomDropDownList>
			</WrapperSelect>
			{errors && <RenderErrors errors={errors} />}
		</WrapperCustomDropDownList>
	);
};

export default DropDownList;
