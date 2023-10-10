/**
 * @author                 Juan Morales <jmorales@personalsoft.com.co>
 * @version                               1.0
 *
 * History
 * v1.0 – Se crea el componente
 * ----
 * La primera versión de GridStyled fue escrita por Juan Morales
 */

import React, { CSSProperties, ReactNode } from 'react';
import GridStyled from '../../styled/grid/GridStyle';

export type SizeGrid =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24;

export interface IGridStyledProp {
	/**
	 * Dimensión para mobiles
	 */
	colSM?: SizeGrid;
	/**
	 * Dimensión para tablets
	 */
	colMD?: SizeGrid;
	/**
	 * Dimensión para Pantallas PC Pequeña
	 */
	colLG?: SizeGrid;
	/**
	 * Dimensión para Pantallas PC Grande
	 */
	colXL?: SizeGrid;
	/**
	 * Tipo de contenedor
	 */
	type?: 'row' | 'col' | 'container' | 'container-fluid';
	/**
	 * Color de fondo
	 */
	bgColor?: string;
	/**
	 * Contenido del campo
	 */
	children?: ReactNode;
	/**
	 * Color de fondo
	 */
	maxSizeCont?: number | string;
	style?: CSSProperties;
	className?: string;
}

const Grid: React.FC<IGridStyledProp> = ({
	type,
	colSM,
	colMD,
	colLG,
	colXL,
	bgColor,
	children,
	maxSizeCont,
	style = {},
	className = '',
}: IGridStyledProp): JSX.Element => {
	String(type).trim() == '' || String(type).trim() == 'undefined' || String(type).trim() == 'null'
		? (type = 'col')
		: null;
	String(colSM).trim() == '' || colSM == undefined || colSM == null || colSM < 1 || colSM > 24 ? (colSM = 24) : null;
	String(colMD).trim() == '' || colMD == undefined || colMD == null || colMD < 1 || colMD > 24 ? (colMD = 24) : null;
	String(colLG).trim() == '' || colLG == undefined || colLG == null || colLG < 1 || colLG > 24 ? (colLG = 24) : null;
	String(colXL).trim() == '' || colXL == undefined || colXL == null || colXL < 1 || colXL > 24 ? (colXL = 24) : null;
	String(bgColor).trim() == '' || String(bgColor).trim() == 'undefined' || String(bgColor).trim() == 'null'
		? (bgColor = 'transparent')
		: null;
	String(maxSizeCont).trim() == '' ||
	maxSizeCont == undefined ||
	maxSizeCont == null ||
	maxSizeCont < 1 ||
	maxSizeCont > 1200
		? (maxSizeCont = '100%')
		: null;

	return (
		<GridStyled
			type={type}
			colSM={colSM}
			colMD={colMD}
			colLG={colLG}
			colXL={colXL}
			bgColor={bgColor}
			maxSizeCont={maxSizeCont}
			style={{ ...style }}
			className={className}
		>
			{children}
		</GridStyled>
	);
};

export default Grid;
