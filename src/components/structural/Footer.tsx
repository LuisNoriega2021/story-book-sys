/**
 * @author                 Luis Fuentes <lefuentes@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Footer fue escrita por Luis Fuentes
 */

import React from 'react';

import { CustomFooter } from '../../styled/structural/FooterStyled';

export interface IFooterProp {
	/**
	 * Año a mostrar en el footer
	 */
	year?: string;
}

const Footer: React.FC<IFooterProp> = ({ year = '2023' }: IFooterProp): JSX.Element => {
	return (
		<CustomFooter>
			<span>ASEGURADORA SUIZA SALVADOREÑA®</span>
			<span>TODOS LOS DERECHOS RESERVADOS © {year}</span>
		</CustomFooter>
	);
};

export default Footer;
