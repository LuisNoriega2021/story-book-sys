import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import styled from 'styled-components';

import { ILoadingFileUpload, ILFUConfig, TResponseFileUp } from '../../interfaces';

import Theme from '../../config';
import { allMobile } from '../../helpers/deviceDimensions';

const LoadingFileUpload = ({
	lista,
	targetApiToken,
	messageFinish = 'Finalizado exitosamente',
	onFinish,
}: ILoadingFileUpload) => {
	const [config] = useState<ILFUConfig>({
		cssClass: 'progress-bar',
		role: 'progressbar',
		min: 0,
		max: 100,
	});
	const [progress, setProgress] = useState<number>(0);
	const [title, setTitle] = useState<string>('');
	const [listFileUp, setListFileUp] = useState<TResponseFileUp[]>([]);

	const generateResult = async () => {
		try {
			if (listFileUp.length === lista.length) {
				let icon: SweetAlertIcon = 'success';
				let title = 'Éxito!';
				let message = messageFinish;

				const isAnError = listFileUp
					.map((item: TResponseFileUp) => item.status.includes(' - error'))
					.some((res: boolean) => res === true);

				if (isAnError) {
					icon = 'info';
					title = 'Resumen';
					message = '<div>';
					for await (const iterator of listFileUp) message += `<span>${iterator.status}</span><br />`;
					message += '</div>';
				}

				Swal.fire({
					icon: icon,
					title: title,
					html: message,
					customClass: { container: 'customSweerAlertContainer' },
					confirmButtonColor: Theme.CELESTE.CLARO,
					confirmButtonText: 'Confirmar',
					allowOutsideClick: false,
				}).then((value: SweetAlertResult) => {
					console.log('🚀 ~ file: LoadingFileUpload.tsx ~ line 55 ~ generateResult ~ value', value);
					onFinish?.(listFileUp);
				});
			}
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	useEffect(() => {
		const resolve = async () => {
			let responses: TResponseFileUp[] = [];
			let headers: any = {};

			if (targetApiToken) headers.Authorization = targetApiToken;

			for (let i = 0, f = lista.length; i < f; i++) {
				let item = lista[i];

				try {
					let resp = await axios.post(item.url, item.data, {
						headers,
						/**
						 * Función de axios para saber el progreso del la solicitud (en este caso del el envio de la data)
						 * @param progressEvent Parametro de la función utilizada para acceder a la cantidad de carga obtenida y carga todal a enviar
						 */
						onUploadProgress: (progressEvent) => {
							let por = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100).toString());
							setProgress(por);
							setTitle(item?.data?.nombre);
						},
					});

					responses.push({ status: `${item?.data?.nombre} - éxito`, response: resp.data });
				} catch (ex: any) {
					responses.push({ status: `${item?.data?.nombre} - error`, response: ex.message });
					console.error('🚀 ~ file: LoadingFileUpload.tsx ~ line 42 ~ resolve ~ ex', ex);
				}
			}

			return responses;
		};

		resolve().then((data: Array<TResponseFileUp>) => setListFileUp(data));
	}, []);

	useEffect(() => {
		generateResult();
	}, [listFileUp.length]);

	return (
		<StyledLoadingFileUpload>
			<strong style={{ wordBreak: 'break-all' }}>Archivo: {title}</strong>
			<div className='row'>
				<div className='col-md-12'></div>
				<div className='col-md-12'>
					<div className='progress'>
						<div
							className={config.cssClass}
							role={config.role}
							aria-valuenow={progress}
							aria-valuemin={config.min}
							aria-valuemax={config.max}
							style={{ width: progress + '%' }}
						>
							{progress + '%'}
						</div>
					</div>
				</div>
				<div className='col-md-4'></div>
			</div>
		</StyledLoadingFileUpload>
	);
};

const StyledLoadingFileUpload = styled.div`
	${allMobile(`
    ${Theme.Mobile.Textos}
  `)}

	${Theme.Desktop.Textos}

	.progress {
		background-image: linear-gradient(to bottom, #ebebeb 0%, #f5f5f5 100%);
		background-repeat: repeat-x;
		height: 20px;
		margin-bottom: 20px;
		overflow: hidden;
		background-color: #f5f5f5;
		border-radius: 4px;
		box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
	}

	.progress-bar {
		float: left;
		width: 0%;
		background-image: linear-gradient(to bottom, ${Theme.AZUL.SECUNDARIO_CLARO} 0%, ${Theme.AZUL.SECUNDARIO} 100%);
		background-repeat: repeat-x;
		height: 100%;
		font-size: 12px;
		line-height: 20px;
		color: ${Theme.OTROS.BLANCO};
		text-align: center;
		background-color: ${Theme.AZUL.SECUNDARIO_CLARO};
		box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);
		transition: width 0.6s ease;
	}
`;

export default LoadingFileUpload;
