/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * v1.0.1 – Se agrego la propiedad hidden para permitir control sobre si se debe de mostrar o no en pantalla, el elemento aun permanece en el DOM
 * ----
 * La primera versión de Button fue escrita por Luis Noriega
 * v1.0.1 - Luis Noriega
 */

import React, { MouseEvent } from 'react';

import ButtonStyled from '../../styled/buttons/ButtonStyled';

import { TypeButton, TypeButtonStyle } from '../../constants/types';

export interface IButtonProp {
	/**
	 * Identificador del elemento
	 */
	id?: string;
	/**
	 * Determina si el botón se mostrara deshabilitado
	 */
	disabled?: boolean;
	/**
	 * Label del botón
	 */
	label?: string;
	/**
	 * Icono del botón
	 */
	icon?: string | React.ReactNode | JSX.Element;
	/**
	 * Tipo del botón
	 */
	type?: TypeButton;
	/**
	 * Tipo del estilo del botón
	 */
	typeStyle?: TypeButtonStyle;
	/**
	 * Función callback que retorna el evento
	 */
	buttonClick?: (e: React.MouseEvent) => void;
	/**
	 * Altura del botón
	 */
	height?: number;
	/**
	 * Ancho del botón
	 */
	width?: number;
	/**
	 * ClassName adicional
	 */
	className?: string;
	/**
	 * Indicar para ocultar el boton
	 */
	hidden?: boolean;
	/**
	 * Indicador para transformar el texto a mayúscula
	 */
	textUppercase?: boolean;
	/**
	 * Comodin para pasar mas propiedades
	 */
	[key: string]: any;
}

const Button: React.FC<IButtonProp> = ({
	id = '',
	type = 'button',
	typeStyle = 'primary',
	disabled = false,
	label,
	icon,
	className,
	height,
	width,
	hidden = false,
	textUppercase = true,
	...props
}: IButtonProp): JSX.Element => {
	/**
	 * Valida si la funcion callback onClick es pasada por props y la llama
	 */
	const onClick = (e: MouseEvent<HTMLButtonElement>) => props?.buttonClick?.(e);

	return (
		<ButtonStyled
			id={id}
			type={type}
			disabled={disabled}
			className={className}
			onClick={onClick}
			height={height}
			width={width}
			typeStyle={typeStyle}
			style={{ visibility: hidden ? 'hidden' : 'visible' }}
			textUppercase={textUppercase}
			{...props}
		>
			{icon && (typeof icon === 'string' ? <i className={icon} /> : icon)}
			{label}
		</ButtonStyled>
	);
};

export default Button;
