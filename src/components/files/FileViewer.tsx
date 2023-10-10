import React, { useState } from 'react';
import isAfter from 'date-fns/isAfter';
import parse from 'date-fns/parse';
import isBefore from 'date-fns/isBefore';
import styled from 'styled-components';

import Button from '../buttons/Button';
import FileViewingArticle from './FileViewingArticle';
import Grid from '../grid/Grid';

import IFileViewer from '../../interfaces/files/IFileViewer';
import IPreview from '../../interfaces/files/IPreview';
import IItemListImg from '../../interfaces/files/IItemListImg';

import { Icon } from '../../constants/assetsFiles';

const FileViewer = (props: IFileViewer) => {
	let mode: string = 'preview';
	let label: string = 'Iconos';
	let orden: string = '';
	let field: string = '';
	const FORMAT_DATE = 'dd/MM/yyyy HH:mm:ss';

	if (!props.showPreview) mode = 'icon';
	if (props.mode) {
		mode = props.mode;
		label = mode === 'preview' ? 'Iconos' : 'Vista previa';
	}
	if (props.orden) orden = props.orden;
	else orden = 'desc';
	if (props.field) field = props.field;

	const [btnPreviewProps, setBtnPreviewProps] = useState<IPreview>({ mode, label, orden, field });

	/**
	 * Evento click del botón vista previa
	 * @param e Mouse Evente Click
	 */
	const modeClick = (e: React.MouseEvent): void => {
		let mode: string = btnPreviewProps.mode === 'preview' ? 'icon' : 'preview';
		let label: string = mode === 'preview' ? 'Iconos' : 'Vista previa';
		let { orden, field } = btnPreviewProps;
		setBtnPreviewProps({ mode, label, orden, field });
	};

	/**
	 * Evento click para ordenar por nombre
	 * @param e Mouse Evente Click
	 */
	const ordenNameClick = (e: React.MouseEvent): void => {
		let field: string = 'name';
		let orden: string = btnPreviewProps.orden === 'asc' ? 'desc' : 'asc';
		let { mode, label } = btnPreviewProps;
		setBtnPreviewProps({ field, orden, mode, label });
	};

	/**
	 * Evento click para ordenar por fecha
	 * @param e Mouse Evente Click
	 */
	const ordenDateClick = (e: React.MouseEvent): void => {
		let field: string = 'datetime';
		let orden: string = btnPreviewProps.orden === 'asc' ? 'desc' : 'asc';
		let { mode, label } = btnPreviewProps;
		setBtnPreviewProps({ field, orden, mode, label });
	};

	/**
	 *
	 * @param array Array de Imagenes con estructura IListImg
	 * @param orden Indica si el orden sera acendente o desendente Indica el orden si será ascendente o descendente
	 * @param field Indica el nombre de la propiedad por la que será ordenado
	 * @example
	 * arrayOrd(array,'asc','name');
	 * arrayOrd(array,'desc','datetime');
	 */
	const arrayOrd = (array: IItemListImg[], orden: string, field: string): IItemListImg[] => {
		let _ord = (a: IItemListImg, b: IItemListImg): number => {
			if (field === 'name') {
				if (a.name > b.name) return orden === 'asc' ? 1 : -1;
				else if (a.name < b.name) return orden === 'asc' ? -1 : 1;
				else return 0;
			} else if (field === 'datetime') {
				if (isAfter(parse(a.datetime, FORMAT_DATE, new Date()), parse(b.datetime, FORMAT_DATE, new Date())))
					return orden === 'asc' ? 1 : -1;
				else if (isBefore(parse(a.datetime, FORMAT_DATE, new Date()), parse(b.datetime, FORMAT_DATE, new Date())))
					return orden === 'asc' ? -1 : 1;
				else return 0;
			}
			return 0;
		};

		return array.sort(_ord);
	};

	/**
	 * Evento para eliminar item
	 * @param i indice
	 */
	const rm = (i: number): void => props?.rm(i);

	/**
	 * Este evento se ejecuta cada vez que se hace clic en el botón de vista previa
	 * @param id Id de base de datos
	 * @param uri Ruta del archivo
	 */
	const onView = (id: string | number, uri: string, indice: number) => props?.onView(id, uri, indice);

	/**
	 * Este evento se ejecuta cada vez que se hace clic en el botón de descarga
	 * @param id Id de base de datos
	 * @param uri Ruta del archivo
	 */
	const onDownload = (id: string | number, uri: string, indice: number) => props?.onDownload(id, uri, indice);

	let _images = btnPreviewProps.field
		? arrayOrd(props.images, btnPreviewProps.orden, btnPreviewProps.field)
		: props.images;
	let _empty = props.empty ? props.empty : 'Lista de documentos vacía.';

	return (
		<StyledFileViewer>
			{props.images.length > 0 && (
				<Grid type='row' style={{ marginBottom: 5 }}>
					<Grid>
						{props.showPreview && (
							<div className='containerButtons'>
								<Button
									typeStyle='info'
									label={btnPreviewProps.label}
									width={90}
									height={35}
									buttonClick={modeClick}
									textUppercase={false}
									className='btn-mg-5'
								/>
							</div>
						)}
						{props.showOrd && (
							<div className={'containerButtons containerButtonsLeft' + (!props.showPreview ? ' all-container' : '')}>
								<Button
									typeStyle='info'
									label='↕ Nombre'
									width={90}
									height={35}
									buttonClick={ordenNameClick}
									textUppercase={false}
									className='btn-mg-5'
								/>
								<Button
									typeStyle='info'
									label='↕ Fecha'
									width={90}
									height={35}
									buttonClick={ordenDateClick}
									textUppercase={false}
								/>
							</div>
						)}
					</Grid>
				</Grid>
			)}
			{props.images.length === 0 && (
				<Grid type='row'>
					<Grid style={{ textAlign: 'center' }}>
						<p>
							<span>{_empty}</span>
						</p>
					</Grid>
				</Grid>
			)}
			<Grid type='row'>
				<Grid>
					{_images.map((item: IItemListImg, indice: number) => {
						let type: string = item.type;
						let icon: string = '';
						switch (type) {
							case 'application/pdf':
								type = 'pdf';
								icon = Icon.pdf;
								break;
							case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
							case 'application/vnd.ms-excel':
								type = 'excel';
								icon = Icon.excel;
								break;
							case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
							case 'application/msword':
								type = 'word';
								icon = Icon.word;
								break;
							case 'application/vnd.ms-powerpoint':
							case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
								type = 'power point';
								icon = Icon.powerpint;
								break;
							case 'text/plain':
								type = 'txt';
								icon = Icon.txt;
								break;
							case 'msg':
							case 'application/octet-stream':
								type = 'Correo';
								icon = Icon.outlook;
								break;
							case 'image/png':
								type = 'png';
								break;
							case 'image/jpeg':
							case 'image/jpg':
								type = 'jpg';
								break;
							case 'image/bmp':
								type = 'bmp';
								break;
							default:
								type = 'archivo';
								icon = Icon.default;
								break;
						}
						if (!item.uri) {
							switch (type) {
								case 'png':
									icon = Icon.png;
									break;
								case 'jpg':
									icon = Icon.jpg;
									break;
								case 'bmp':
									icon = Icon.bmp;
									break;
							}
						} else {
							if (btnPreviewProps.mode === 'icon') {
								switch (type) {
									case 'png':
										icon = Icon.png;
										break;
									case 'jpg':
										icon = Icon.jpg;
										break;
									case 'bmp':
										icon = Icon.bmp;
										break;
								}
							}
						}
						return (
							<FileViewingArticle
								onDownload={onDownload}
								onView={onView}
								name={item.name}
								datetime={item.datetime}
								description={item.description}
								user={item.user}
								type={type}
								MIMEtype={item.type}
								uri={item.uri}
								icon={icon}
								index={indice}
								rm={rm}
								id={item.id}
								category={item.category}
								origin={item.origin}
								key={indice}
								canShowDeleteWhenIdDB={props.canShowDeleteWhenIdDB}
							/>
						);
					})}
				</Grid>
			</Grid>
			{props.children && (
				<Grid type='row'>
					<Grid>{props.children}</Grid>
				</Grid>
			)}
		</StyledFileViewer>
	);
};

const StyledFileViewer = styled.div`
	.containerButtons {
		display: inline-flex;
		flex: 1;
		width: 50%;
	}

	.containerButtonsLeft {
		justify-content: flex-end;
	}

	.btn-mg-5 {
		margin: 0 5px 0 0;
	}

	.all-container {
		width: 100%;
	}
`;

export default FileViewer;
