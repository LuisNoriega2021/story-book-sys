/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Tooltip fue escrita por Luis Noriega
 */

import React from 'react';
import TooltipReact from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import '../../assets/styles/Tooltip.css';

export interface ITooltipProps {
	message: string;
	position?: 'top' | 'left' | 'right' | 'bottom'; 
	children?: JSX.Element;
	[key: string]: any;
}

const Tooltip = ({ message, position = 'top', children, ...props }: ITooltipProps) => {
	return (
		<TooltipReact
			placement={position}
			overlay={<span>{message}</span>}
			trigger={['hover', 'click', 'focus']}
			animation='zoom'
			{...props}
		>
			{children}
		</TooltipReact>
	);
};

export default Tooltip;
