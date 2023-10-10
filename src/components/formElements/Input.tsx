/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.1
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Input fue escrita por Luis Noriega
 * ********
 * v1.1 – Se mantiene la posicion del cursor cuando se transforma el texto
 * ----
 * Luis Fuentes
 */

import React, { FocusEventHandler, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import IInputProps from '../../interfaces/formElements/IInputProps';

import RenderErrors from '../RenderErrors';
import {
	CustomInput,
	Help,
	LabelInput,
	WrapperContentInput,
	WrapperIconAfter,
	WrapperIconBefore,
	WrapperInput,
} from '../../styled/formElements/Input';

import { IconMagnifyingGlass } from '../../constants/icons';

import IconoAyuda from '../../assets/img/svg/iconAlerta.svg';
import TooltipSura from '../modals/ToolTipSura';

/**
 * Input HTML con formato SURA, icono al lado izquierdo y label
 */
const Input: React.FC<IInputProps> = forwardRef(
	(
		{
			id,
			name,
			label,
			iconBefore,
			iconAfter,
			type = 'text',
			showlabel = false,
			labelAyuda,
			help,
			errors,
			value,
			hasSelectedContentOnClick = false,
			onChange,
			...props
		}: IInputProps,
		ref?: React.Ref<HTMLInputElement>,
	) => {
		const [focus, setFocus] = useState(false);
		const [hasValue, setHasValue] = useState(false);
		const selection = useRef({ start: 0, end: 0 });
		const innerRef = useRef<HTMLInputElement>();
		useImperativeHandle(ref, () => innerRef.current);

		const contentOfTheSelectedInput = () => {
			hasSelectedContentOnClick && id && (document.getElementById(id) as HTMLInputElement).select();
		};

		const handleFocus = (element: FocusEventHandler<HTMLInputElement>) => {
			contentOfTheSelectedInput();
			props.onFocus?.(element);
			setFocus(true);
		};

		const handleBlur = (element: FocusEventHandler<HTMLInputElement>) => {
			props.onBlur?.(element);
			setFocus(false);
		};

		useEffect(() => {
			if (type === 'number' && props?.defaultValue) {
				setHasValue(true);
			}
		}, []);

		useEffect(() => {
			if (innerRef.current && selection.current && (innerRef.current.type === 'text' || innerRef.current.type === '')) {
				innerRef.current.setSelectionRange(selection.current.start, selection.current.end);
			}
			if (value) {
				setHasValue(true);
			}
		}, [value]);

		return (
			<WrapperInput hasError={errors && Object.keys(errors).length > 0} hasLabel={showlabel} disabled={props.disabled}>
				{showlabel && (
					<LabelInput
						focus={focus}
						hasValue={hasValue || (document.getElementById(id) as HTMLInputElement)?.value.length > 0}
						htmlFor={id}
						canPress={labelAyuda && labelAyuda.length > 0}
					>
						{props.required && <span style={{ color: 'red' }}>*</span>} {label}
						{labelAyuda && (
							<TooltipSura message={labelAyuda}>
								{<img width={14} style={{ marginLeft: 5 }} src={IconoAyuda} alt='iconoDeAyuda' />}
							</TooltipSura>
						)}
					</LabelInput>
				)}
				<WrapperContentInput>
					{iconBefore && <WrapperIconBefore>{iconBefore}</WrapperIconBefore>}
					<CustomInput
						id={id}
						name={name}
						ref={innerRef}
						type={type}
						value={value}
						onFocus={handleFocus}
						onBlurCapture={handleBlur}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							selection.current.start = e.target.selectionStart;
							selection.current.end = e.target.selectionEnd;
							onChange(e);
						}}
						onClick={contentOfTheSelectedInput}
						className={props?.classListInput?.join(' ') || ''}
						{...props}
					/>
					{iconAfter && type !== 'search' && (
						<WrapperIconAfter canPress={typeof props.canPress === 'function'} onClick={props?.onPressIcon}>
							{iconAfter}
						</WrapperIconAfter>
					)}
					{type === 'search' && (
						<WrapperIconAfter canPress onClick={props?.onPressIcon}>
							<img width={24} src={IconMagnifyingGlass} alt='' />
						</WrapperIconAfter>
					)}
				</WrapperContentInput>
				{help && <Help focus={focus}>{help}</Help>}
				{errors && <RenderErrors errors={errors} />}
			</WrapperInput>
		);
	},
);

export default Input;
