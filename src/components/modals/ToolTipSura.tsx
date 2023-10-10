/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de TooltipSura fue escrita por Luis Noriega
 */

import React from 'react';
import { WrapperTooltip } from '../../styled/modals/TooltipSuraStyled';

export interface ITooltipProps {
	message: string;
	position?: 'top' | 'left' | 'right' | 'bottom';
	children?: JSX.Element;
}

const TooltipSura = ({ message, position = 'top', children }: ITooltipProps) => {
	return (
		<WrapperTooltip>
			<div className={`tooltip ${position}`}>
				{children}
				<span lang='es' className='tooltiptext'>
					{message}
				</span>
			</div>
		</WrapperTooltip>
	);
};

export default TooltipSura;
