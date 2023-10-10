/**
 * @author                 Luis Fuentes <lefuentes@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de ExportExcelButton fue escrita por Luis Fuentes
 */

import React from 'react';
import Button, { IButtonProp } from './Button';

export interface IColumn {
	accessor: string;
	label?: string;
}

interface IDownloadFile {
	data: any;
	fileName: string;
	fileType: string;
}

export interface IExportExcelButtonProp extends IButtonProp {
	/**
	 * Identificador de la columna y nombre a mostrar
	 */
	columns: {
		accessor: string;
		label?: string;
	}[];
	/**
	 * Arreglo de objetos
	 */
	data: Object[];
	/**
	 * nombre del archivo
	 */
	title?: string;
	/**
	 * Arreglo de formatos mso-number-format, si no se envia todas los columnas tienen formato texto
	 */
	format?: { [key: string]: string };
	[key: string]: any;
}

const downloadFile = ({ data, fileName, fileType }: IDownloadFile) => {
	const blob = new Blob([data], { type: fileType });

	const a = document.createElement('a');
	a.download = fileName;
	a.href = window.URL.createObjectURL(blob);
	const clickEvt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
	});
	a.dispatchEvent(clickEvt);
	a.remove();
};

const exportToCsv =
	(
		columns: { label?: string; accessor: string }[],
		items: Array<{ [key: string]: any }>,
		title = 'listado',
		format: { [key: string]: string } = {},
	) =>
	(e: React.MouseEvent) => {
		e.preventDefault();

		let headers = columns.reduce(
			(acc, { label, accessor }) => acc.concat(`<th>${label ? label : accessor}</th>`, ''),
			'',
		);

		let head = `\uFEFF<table cellspacing="0" rules="all" border="1" id="Export" style="height:52px;width:24px;border-collapse:separate;">
	<thead><tr>${headers}</tr></thead><tbody>`;

		let csv = items.reduce((acc: string[], data) => {
			const row = columns.reduce((acc, { accessor }) => {
				const formatString = format[accessor] ?? '\\@';
				const tData = `<td style='mso-number-format:${formatString}'>${
					data[accessor] ? data[accessor].toString() : ''
				}</td>`;
				return acc.concat(tData.replace(/[\n\r]/g, ''));
			}, '');
			acc.push(`<tr>${row}</tr>`);
			return acc;
		}, []);

		downloadFile({
			data: [head, ...csv, '</tbody></table>'].join('\n'),
			fileName: `${title}.xls`,
			fileType: 'application/vnd.ms-excel',
		});
	};

const ExportExcelButton: React.FC<IExportExcelButtonProp> = ({
	label = 'Excel',
	columns,
	data,
	title = 'listado',
	format,
	...props
}: IExportExcelButtonProp): JSX.Element => {
	return (
		<>
			<Button label={label} buttonClick={exportToCsv(columns, data, title, format)} {...props} />
		</>
	);
};

export default ExportExcelButton;
