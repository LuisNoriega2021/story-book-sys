import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import _ from 'lodash';

import IFileUploader from '../../interfaces/files/IFileUploader';
import IItemListImg from '../../interfaces/files/IItemListImg';

import { ListOfMimeFormats } from '../../constants/assetsFiles';

import Files from '../../helpers/Files';
import FileViewer from './FileViewer';
import Grid from '../grid/Grid';
import Theme from '../../config';
import Button from '../buttons/Button';
import { allMobile } from '../../helpers/deviceDimensions';

const FileUploader = ({ images = [], fileMaxSize, extentions, required, ...props }: IFileUploader) => {
	const [files, setFiles] = useState<IItemListImg[]>(images);
	const refInputFile = useRef<HTMLInputElement>();

	/**
	 * Funcion que convierte bytes a megabytes
	 * @param bytes
	 */
	const bytesToMegaBytes = async (bytes: number) => {
		return bytes / (1024 * 1024);
	};

	/**
	 * Valida que los archivos cumplan con los criterios de archivos validos
	 * @param filesTotal lista de archivos a validar
	 * @param count numero de archivos en el array
	 * @returns Lista de archivos
	 */
	const valF = async (filesTotal: File[], count: number): Promise<IItemListImg[]> => {
		let _listFile: IItemListImg[] = [];
		if (!filesTotal) return _listFile;
		let _valSize: boolean = fileMaxSize ? true : false;
		let _sizeOk: boolean = true;
		let _iMaxSize: number = props.imageMaxSize ? props.imageMaxSize : 0;
		// valor predeterminado de 0.6
		let _iQ: number = props.imageQuality ? props.imageQuality : 0.6;
		let _max: number = props.max ? props.max : 0;
		_max = props.multiple ? _max : 1;
		let _c: number = count;

		for (const v in filesTotal) {
			if (_max > 0 && _c >= _max) break;
			if (ListOfMimeFormats.indexOf((filesTotal[v].type || '').toLocaleLowerCase()) > -1) {
				if (_valSize) _sizeOk = filesTotal[v].size <= fileMaxSize;
				if (_sizeOk) _listFile = _listFile.concat(await Files.proc(filesTotal[v], _iMaxSize, _iQ));
			}
			_c++;
		}

		return _listFile;
	};

	/**
	 * Evento que se dispara al cargar los archivos con el input=file
	 * @param e
	 */
	const fileUploadChange = async (e: any) => {
		let ctrl = e.target;
		let _files: File[] = ctrl.files;
		let _valSize: boolean = fileMaxSize ? true : false;
		let parseBytes: number = +fileMaxSize ? fileMaxSize : 0;
		let successExt: number = 0;
		let errFileSize: number = 0;

		for (let item: number = 0; item < _files.length; item++) {
			let arr = _files[item].name.split('.');
			let _sf: number = +_files[item].size;
			let longitud = arr.length - 1;

			for (let ext: number = 0; ext < extentions.length; ext++) {
				if (extentions[ext].toLowerCase() === arr[longitud].toLowerCase()) successExt++;
			}

			if (_sf > parseBytes) errFileSize++;
		}

		let parseExtErr = successExt === _files.length;

		if (errFileSize > 0 && _valSize) {
			Swal.fire({
				icon: 'info',
				title: '',
				text: `${_files.length > 1 ? 'Algunos archivos seleccionados' : 'El archivo seleccionado'} supera${
					_files.length > 1 ? 'n' : ''
				} el máximo de tamaño permitido. Debes subir ${
					_files.length > 1 ? 'los archivos' : 'el archivo'
				} con el tamaño permitido ${(await bytesToMegaBytes(parseBytes)).toFixed(0)} MB`,
				customClass: { container: 'customSweerAlertContainer' },
				confirmButtonColor: Theme.CELESTE.CLARO,
				confirmButtonText: 'Confirmar',
			});
		} else {
			if (!parseExtErr) {
				Swal.fire({
					icon: 'info',
					title: '',
					text: `${_files.length > 1 ? 'Algunos archivos seleccionados' : 'El archivo seleccionado'} no contiene${
						_files.length > 1 ? 'n' : ''
					} una extención permitida. Debes subir ${
						_files.length > 1 ? 'los archivos' : 'el archivo'
					} con un formato permitido ${extentions.join(', ')}`,
					customClass: { container: 'customSweerAlertContainer' },
					confirmButtonColor: Theme.CELESTE.CLARO,
					confirmButtonText: 'Confirmar',
				});
				return;
			}

			if (!props.multiple) setFiles([]);

			if (_files) {
				const filesTotal = [...files, ...(await valF(_files, files.length))];
				setFiles(filesTotal);
				props?.onChange(filesTotal);
			}
		}
	};

	/**
	 * Evento para eliminar item
	 * @param i indice
	 */
	const rm = (i: number): void => {
		const _copia = _.cloneDeep(files);
		_copia.splice(i, 1);
		setFiles([..._copia]);
		props?.onDelete?.(i);
		props?.onChange?.(_copia);
	};

	const getVisor = () => (
		<FileViewer
			onView={props.onView}
			onDownload={props.onDownload}
			mode='icon'
			images={files}
			empty={props.empty}
			rm={rm}
			showPreview={true}
			showOrd={props.multiple}
			canShowDeleteWhenIdDB={props.canShowDeleteWhenIdDB}
		/>
	);

	const handleClickButton = (event: React.MouseEvent) => {
		const inputFile = document.querySelector(`#${props.idInputFile}`) as HTMLInputElement;
		inputFile?.click();
		props.propsButon?.buttonClick(event);
	};

	let _note = props.note ? props.note : `Formatos validos ${extentions.join(', ')}`;

	useEffect(() => {
		if (files.length === 0) {
			refInputFile.current.value = '';
		} else if (files.length > 0) {
			refInputFile.current.required = false;
		}
	}, [files]);

	return (
		<StyledFileUploader>
			{props.showExtraButton && (
				<Grid type='row'>
					<Grid>
						<div className='container-extra-button'>
							<Button {...props.propsButon} buttonClick={handleClickButton} />
						</div>
					</Grid>
				</Grid>
			)}
			<div
				className={`container-files ${props.multiple ? 'container-multiple-file' : ''} ${
					!props.valid ? 'container-files-error' : ''
				}`}
			>
				{props.label && (
					<Grid type='row'>
						<Grid>
							<label>{props.label}</label>
						</Grid>
					</Grid>
				)}
				<Grid type='row'>
					<Grid style={{ height: props.showExtraButton ? 1 : 'auto', minHeight: props.showExtraButton ? 1 : 'auto' }}>
						<input
							ref={refInputFile}
							className={props.showExtraButton ? 'hiddenControl' : undefined}
							id={props.idInputFile}
							type='file'
							multiple={props.multiple}
							onChange={fileUploadChange}
							accept={extentions.map((ext: string) => `.${ext}`).join(', ')}
							required={required}
						/>
					</Grid>
					<Grid className='text-small'>
						<p>
							<strong>Nota: </strong>
							<span>{_note}</span>
						</p>
					</Grid>
					<Grid>{getVisor()}</Grid>
				</Grid>
			</div>
		</StyledFileUploader>
	);
};

const StyledFileUploader = styled.div`
	background-color: #fff;
	border: 1px solid transparent;
	border-radius: 4px;
	box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
	${Theme.Desktop.Textos}

	.container-extra-button {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		width: 100%;
	}

	.container-files {
		border: 1px dashed #0033a0;
		padding: 15px;
		overflow: auto;
		${allMobile(`padding: 5px;`)}
	}

	.container-files-error {
		border: 1px dashed red;
	}

	.container-multiple-file {
		max-height: 300px;
	}

	.text-small {
		font-size: 1rem;
		${allMobile(`
			font-size: 0.8rem;
		`)}
	}

	.hiddenControl {
		border: 0;
		color: transparent;
		background-color: transparent;
		top: 0;
		left: 0;
		opacity: 0;
		height: 1px;
	}
`;

export default FileUploader;
