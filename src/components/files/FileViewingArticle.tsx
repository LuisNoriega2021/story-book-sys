import React, { useRef } from 'react';

import IItemListImg from '../../interfaces/files/IItemListImg';

import File from '../../helpers/Files';
import styled from 'styled-components';
import Theme from '../../config';
import Grid from '../grid/Grid';
// import IconDowload from '../icons/Dowload';

const FileViewingArticle = (props: IItemListImg & { canShowDeleteWhenIdDB?: boolean }) => {
	// const imgDivRef: React.RefObject<HTMLDivElement> = useRef();
	const imgDivParentRef: React.RefObject<HTMLDivElement> = useRef();

	/**
	 * Evento para eliminar item
	 * @param i indice
	 */
	const rm = (i: number): void => props?.rm(i);

	/**
	 * Este evento se ejecuta cada vez que se hace clic en el botón de vista previa
	 * @param id Id de base de datos
	 * @param name Nombre de la imagen
	 * @param MIMEtype Timpo MIME
	 * @param uri Ruta del archivo
	 */
	const onView = (id: string | number, name: string, MIMEtype: string, uri: string) => {
		if (uri) File.open(name, MIMEtype, uri);
		props?.onView(id, uri, props.index);
	};

	/**
	 * Este evento se ejecuta cada vez que se hace clic en el botón de descarga
	 * @param id Id de base de datos
	 * @param name Nombre de la imagen
	 * @param MIMEtype Timpo MIME
	 * @param uri Ruta del archivo
	 */
	const onDownload = (id: string | number, name: string, MIMEtype: string, uri: string) => {
		if (uri) File.download(props.name, props.MIMEtype, props.uri.toString());
		props?.onDownload(id, uri, props.index);
	};

	const drafDetail = (label: string, description: string) => (
		<p>
			<strong>{label}:</strong> {description}
		</p>
	);

	let _style = { margin: '2px' };
	//Indica si esta en modo icono
	let _mi = props.icon ? true : false;
	let _icon: string = _mi ? props.icon : props.uri.toString();
	//Estilo de imagen
	let _simg = _mi
		? { width: '50px', maxHeight: '100%', verticalAlign: 'middle', margin: 'auto' }
		: { width: '150px', maxWidth: '100%', maxHeight: '100%', verticalAlign: 'middle', margin: 'auto' };

	return (
		<StyledFileViewingArticle ref={imgDivParentRef}>
			<Grid colSM={24} colMD={6} colLG={6} colXL={6}>
				<img src={_icon} alt={props.name} style={_simg} />
			</Grid>
			<Grid colSM={24} colMD={14} colLG={14} colXL={14}>
				<h4 style={{ wordBreak: 'break-all' }}>{props.name}</h4>
				{props.description && drafDetail('Descripción', props.description)}
				{props.category && drafDetail('Categoría', props.category)}
				{props.origin && drafDetail('Origen', props.origin)}
				{props.user && drafDetail('Subido por', props.user)}
				<p>
					<span className='badge badge-primary ' style={_style}>
						{props.type}{' '}
					</span>
					<span className='badge badge-warning' style={_style}>
						{props.datetime}{' '}
					</span>
					<a
						href='#'
						onClick={(e: React.MouseEvent): void => {
							e.preventDefault();
							onView(props.id, props.name, props.MIMEtype, props.uri.toString());
						}}
						style={_style}
						title='Ver'
					>
						ver
					</a>
					<a
						href='#'
						onClick={(e: React.MouseEvent): void => {
							e.preventDefault();
							onDownload(props.id, props.name, props.MIMEtype, props.uri.toString());
						}}
						style={_style}
						title='Descarga'
					>
						descargar
						{/* <IconDowload /> */}
					</a>
					{(props.canShowDeleteWhenIdDB || !props.id) && (
						<a
							href='#'
							onClick={(e: React.MouseEvent): void => {
								e.preventDefault();
								rm(props.index);
							}}
							style={_style}
							title='Eliminar'
						>
							eliminar
						</a>
					)}
				</p>
			</Grid>
		</StyledFileViewingArticle>
	);
};

const StyledFileViewingArticle = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	margin: 0 0 5px;
	border: dotted 1px ${Theme.CELESTE.OSCURO};
	box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
	background-color: ${Theme.OTROS.BLANCO};
	border-radius: 4px;
	${Theme.Desktop.Body}

	.badge {
		display: inline-block;
		min-width: 10px;
		padding: 3px 7px;
		font-size: 12px;
		font-weight: bold;
		line-height: 1;
		color: #fff;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		background-color: #777777;
		border-radius: 10px;
	}

	.fa,
	.fas {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		display: inline-block;
		font-style: normal;
		font-variant: normal;
		text-rendering: auto;
		line-height: 1;
	}

	.fa-eye:before {
		content: '\f06e';
	}

	.fa-download:before {
		content: '\f019';
	}
`;

export default FileViewingArticle;
