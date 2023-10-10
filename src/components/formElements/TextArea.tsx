/**
 * @author                 Ronald Gutierrez <rvillanueva@asesuisa.com>
 * @version                               1.1
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Textarea fue escrita por Ronald Gutierrez
 * ********
 *  v1.1 – Se mantiene la posicion del cursor cuando se transforma el texto
 * ----
 * Luis Fuentes
 */

import React, { FC, FocusEventHandler, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import {
	CustomTextArea,
	Help,
	LabelTextArea,
	WrapperContentTextArea,
	WrapperIconAfter,
	WrapperIconBefore,
	WrapperTextArea,
} from '../../styled/formElements/TextArea';

import RenderErrors from '../RenderErrors';

import ITextAreaProps from '../../interfaces/formElements/ITextAreaProps';

/**
 * TextArea HTML con formato SURA, icono al lado izquierdo y label
 */
const TextArea: FC<ITextAreaProps> = forwardRef(
	(
		{
			id,
			name,
			cols = 50,
			rows = 4,
			label,
			iconBefore,
			iconAfter,
			showlabel = false,
			help,
			errors,
			value,
			onChange,
			...props
		}: ITextAreaProps,
		ref?: React.Ref<HTMLTextAreaElement>,
	) => {
		const [focus, setFocus] = useState(false);
		const [hasValue, setHasValue] = useState(false);
		const selection = useRef({ start: 0, end: 0 });
		const innerRef = useRef<HTMLTextAreaElement>();
		useImperativeHandle(ref, () => innerRef.current);

		const handleFocus = (element: FocusEventHandler<HTMLTextAreaElement>) => {
			props.onFocus?.(element);
			setFocus(true);
		};

		const handleBlur = (element: FocusEventHandler<HTMLTextAreaElement>) => {
			props.onBlur?.(element);
			setFocus(false);
		};

		useEffect(() => {
			if (props?.defaultValue) {
				setHasValue(true);
			}
		}, []);

		useEffect(() => {
			if (innerRef.current && selection.current) {
				innerRef.current.setSelectionRange(selection.current.start, selection.current.end);
			}
			if (value) {
				setHasValue(true);
			}
		}, [value]);

		return (
			<>
				<WrapperTextArea
					disabled={props.disabled}
					hasError={errors && Object.keys(errors).length > 0}
					hasLabel={showlabel}
				>
					{showlabel && (
						<LabelTextArea
							focus={focus}
							hasValue={hasValue || (document.getElementById(id) as HTMLInputElement)?.value.length > 0}
							htmlFor={id}
						>
							{props.required && <span style={{ color: 'red' }}>*</span>} {label}
						</LabelTextArea>
					)}
					<WrapperContentTextArea>
						{iconBefore && <WrapperIconBefore>{iconBefore}</WrapperIconBefore>}
						<CustomTextArea
							id={id}
							name={name}
							cols={cols}
							rows={rows}
							ref={innerRef}
							value={value}
							onFocus={handleFocus}
							onBlurCapture={handleBlur}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
								selection.current.start = e.target.selectionStart;
								selection.current.end = e.target.selectionEnd;
								onChange(e);
							}}
							className={props?.classListInput?.join(' ') || ''}
							{...props}
						/>
						{iconAfter && (
							<WrapperIconAfter canPress={typeof props.canPress === 'function'} onClick={props?.onPressIcon}>
								{iconAfter}
							</WrapperIconAfter>
						)}
					</WrapperContentTextArea>
					{help && <Help focus={focus}>{help}</Help>}
					{errors && <RenderErrors errors={errors} />}
				</WrapperTextArea>
			</>
		);
	},
);

export default TextArea;
