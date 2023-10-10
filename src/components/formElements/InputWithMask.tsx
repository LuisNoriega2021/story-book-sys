/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de InputWithMask fue escrita por Luis Noriega
 */

import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';

import IInputWithMaskProps from '../../interfaces/formElements/IInputWithMask';

import { Help, LabelInput, WrapperContentInput, WrapperInput } from '../../styled/formElements/Input';
import RenderErrors from '../RenderErrors';

/**
 * @component InputWithMask
 * Componente de inputs con mascaras para el ingreso de datos
 *
 * @param {string} name - Nombre del input
 * @param {string} label - Texto formato de la mascara [example: (000) 0000-0000]
 * @param {string} type - Tipo de input [example: text, number, email]
 * @param {string} placeholder - Texto a mostrara en el input cuando este no tenga valor
 * @param {string} error - Mensaje de error
 * @param {string} touched - Indica si el input a sido tocado
 * @param {Event} onChange - Evento que se ejecuta cuando hay un cambio
 * @param {Event} onBlur - Evento que se ejecuta cuando se desenfoca el input
 * @param {Array<string> | (rawValue:any) => Array<string>} mask - Mascara (cadena o expresion regular)
 * @param {any} field - Input
 * @return JSX.Element
 */
const InputWithMask: React.FC<IInputWithMaskProps> = ({
	id,
	name,
	label,
	type = 'text',
	placeholder,
	placeholderChar,
	errors,
	touched = false,
	mask,
	field,
	help,
	showlabel = false,
	className = '',
	onBlur,
	onChange,
	classListInput,
	...props
}) => {
	const [focus, setFocus] = useState(false);
	const [hasValue, setHasValue] = useState(false);

	const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
		setFocus(true);
	};

	const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
		setFocus(false);
		onBlur?.(event);
	};

	const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
		onChange?.(event);
	};

	useEffect(() => {
		setHasValue((document.getElementById(id) as HTMLInputElement)?.value.length > 0);
	}, [focus]);

	useEffect(() => {
		if (props?.defaultValue?.length > 0 || props?.value?.length > 0) {
			setHasValue(true);
		}
	}, []);

	return (
		<WrapperInput
			hasError={errors && Object.keys(errors).length > 0 && touched}
			hasLabel={showlabel && placeholder?.length === 0}
		>
			{showlabel && (
				<LabelInput focus={focus} hasValue={hasValue || placeholder?.length > 0} htmlFor={id}>
					{props.required && <span style={{ color: 'red' }}>*</span>} {label}
				</LabelInput>
			)}
			<WrapperContentInput>
				<MaskedInput
					id={id}
					name={name}
					type={type}
					className={`${className} ${classListInput?.join(' ') || ''}`}
					placeholder={placeholder}
					placeholderChar={placeholderChar}
					mask={mask}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
					{...field}
					{...props}
				/>
			</WrapperContentInput>
			{help && <Help focus={focus}>{help}</Help>}
			{errors && Object.keys(errors).length > 0 && touched && <RenderErrors errors={errors} />}
		</WrapperInput>
	);
};

export default InputWithMask;
