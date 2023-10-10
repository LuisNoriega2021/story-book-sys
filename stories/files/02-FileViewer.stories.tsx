import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileViewer } from '../../src';

let list = [
	{
		name: 'Documento F1',
		type: 'image/png',
		datetime: '03/11/2013 01:50:33',
		uri: '',
		id: 1,
	},
	{
		name: 'Documento F2',
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
		name: 'Carta rechazo',
		type: 'application/pdf',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo pdf',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'Planificación mensual CCM',
		type: 'application/vnd.ms-excel',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo de excel',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'Memorandum',
		type: 'application/msword',
		datetime: '03/11/2020 01:50:33',
		description: 'Archivo de word',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'Nuevos Objetivos 2023',
		type: 'application/vnd.ms-powerpoint',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo de PowerPoint',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'Credenciales MQ',
		type: 'text/plain',
		datetime: '03/11/2013 01:50:33',
		description: 'Archivo de texto plano',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
	{
		name: 'Certificación gastos 2023',
		type: 'msg',
		datetime: '03/10/2020 01:50:33',
		description: 'Archivo de correo',
		uri: 'https://riptutorial.com/Download/gnu-linux.pdf',
		id: 1,
	},
];

export default {
	title: 'Components/Files/FileViewer',
	component: FileViewer,
} as ComponentMeta<typeof FileViewer>;

const Template: ComponentStory<typeof FileViewer> = (args) => <FileViewer {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	onView: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	onDownload: (id: string | number, uri: string, indice: number) => console.log(id, uri, indice),
	images: list,
	showPreview: true,
	showOrd: true,
};
