/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de SmallSolutionCard fue escrita por Luis Noriega
 */

import React from 'react';
import SmallSolutionCardStyled from '../../styled/cards/SmallSolutionCardStyled';

export interface ISmallSolutionCardProp {
	/**
	 * Titulo de la solución
	 */
	title?: string;
	/**
	 * Descripción de la solución
	 */
	description?: string;
	/**
	 * Icono de la solución
	 */
	icon?: string | JSX.Element;
	/**
	 * Texto del enlace
	 */
	labelLink?: string | JSX.Element;
	/**
	 * Enlace para mas detalle
	 */
	link?: string;
	/**
	 * Altura de la tarjeta
	 */
	height?: number | string;
	/**
	 * Ancho de la tarjeta
	 */
	width?: number | string;
	/**
	 * ClassName adicional
	 */
	className?: string;
}

const SmallSolutionCard: React.FC<ISmallSolutionCardProp> = ({
	title = 'Solución',
	description = 'Detalle de la solución...',
	icon,
	labelLink = 'Saber más',
	link = '#',
	height = '244px',
	width = '274px',
	className = '',
}: ISmallSolutionCardProp): JSX.Element => {
	return (
		<SmallSolutionCardStyled className={className} height={height} width={width}>
			<div>
				<p>{title}</p>
				<p>{description}</p>
			</div>
			<div>
				{typeof labelLink === 'string' ? <a href={link}>{labelLink + ' >'}</a> : labelLink}
				{typeof icon === 'string' ? <img src={icon} alt={title} /> : icon}
			</div>
		</SmallSolutionCardStyled>
	);
};

export default SmallSolutionCard;
