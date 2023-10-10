/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               2.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Loading fue escrita por Daniel Elías
 */

import React from 'react';

import { Spinner } from '../../styled/loaders/LoadingStyled';

import theme from '../../config/theme';
import ILoading from '../../interfaces/loarders/ILoading';

/**
 * Indica la espera o carga de una acción
 * @param LoadingProps - Propiedades del componente
 * @returns JSX.Element
 */
const Loading: React.FC<ILoading> = ({
	color = theme.CELESTE.CLARO,
	image = '',
	heightImg = '',
	widthImg = '',
	loading = false,
	height = '100%',
	width = '100%',
	zIndex = -1,
}: ILoading): JSX.Element => {
	return loading ? (
		<Spinner color={color} height={height} width={width} zIndex={zIndex}>
			{image && (
				<img className='sura-component_img-loading' src={image} height={heightImg} width={widthImg} alt='Loading' />
			)}
			{!image && <div className='spinner' />}
		</Spinner>
	) : (
		<></>
	);
};

export default Loading;
