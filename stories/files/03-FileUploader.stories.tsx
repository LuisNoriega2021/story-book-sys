import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileUploader } from '../../src';
import { IItemListImg } from '../../src/interfaces';

let list = [
	{
		name: 'd test',
		type: 'image/png',
		datetime: '03/11/2013 01:50:33',
		uri: '',
		id: 1,
	},
	{
		name: 'c test',
		type: 'image/png',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo de imagen png',
		user: 'gortiz',
		uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Gnulinux.svg/1200px-Gnulinux.svg.png',
		category: 'generic',
		origin: 'manual',
		id: 1,
	},
	{
		name: 'h test',
		type: 'application/pdf',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo pdf',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'f test',
		type: 'application/vnd.ms-excel',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo de excel',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'e test',
		type: 'application/msword',
		datetime: '03/11/2020 01:50:33',
		description: 'Archivo de word',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'g test',
		type: 'application/vnd.ms-powerpoint',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo de PowerPoint',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'a test',
		type: 'text/plain',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo de texto plano',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'b test',
		type: 'msg',
		datetime: '03/10/2020 01:50:33',
		description: 'Archivo de correo',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
];

export default {
	title: 'Components/Files/FileUploader',
	component: FileUploader,
} as ComponentMeta<typeof FileUploader>;

const Template: ComponentStory<typeof FileUploader> = (args) => <FileUploader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	onView: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	onDownload: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	extentions: ['pdf', 'pptx', 'txt', 'csv'],
	empty: '',
	note: '',
	valid: true,
	imageMaxSize: 2000000,
	fileMaxSize: 1000000,
	onChange: (list: IItemListImg[]) => console.log(list),
	multiple: true,
	label: '',
};

export const FileUploader2 = Template.bind({});
FileUploader2.args = {
	onView: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	onDownload: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	extentions: ['pdf', 'pptx', 'txt', 'csv'],
	images: list,
	multiple: true,
	label: '',
};

export const FileUploader3 = Template.bind({});
FileUploader3.args = {
	onView: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	onDownload: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	extentions: ['pdf', 'png', 'jpg', 'jpeg'],
	empty: '',
	note: 'Debes agregar en este apartado la imagen de tu documento de identidad o el pdf, que contenga toda tu información, (Salvadoreño únicamente DUI (revés y derecho) y Personas extranjeras: carnet de residente, pasaporte y en caso que aplique NIT).',
	valid: true,
	imageMaxSize: 2000000,
	fileMaxSize: 30000000,
	onChange: (list: IItemListImg[]) => console.log(list),
	multiple: false,
	label: '',
	showExtraButton: false,
	propsButon: {
		label: '+ Agregar documento',
		typeStyle: 'warning',
		buttonClick: () => {
			const inputFile = document.querySelector('#filesSol') as HTMLInputElement;
			inputFile.click();
		},
		textUppercase: false,
	},
	idInputFile: 'filesSol',
};
