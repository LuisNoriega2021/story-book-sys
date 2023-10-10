import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoadingFileUpload } from '../../src';
import { ListFiles1, ListFiles2 } from '../dataTest';
import { TResponseFileUp } from '../../src/interfaces';

const cookie = 'cookie';

export default {
	title: 'Components/Loaders/LoadingFileUpload',
	component: LoadingFileUpload,
} as ComponentMeta<typeof LoadingFileUpload>;

const Template: ComponentStory<typeof LoadingFileUpload> = (args) => <LoadingFileUpload {...args} />;

export const OnlyOneFile = Template.bind({});
OnlyOneFile.args = {
	lista: ListFiles1,
	targetApiToken: cookie,
	messageFinish: 'Archivo cargado correctamente',
	onFinish(result: TResponseFileUp) {
		console.log('Ejecutar cualquier cosa al finalizar', result);
	},
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
	lista: [...ListFiles1, ...ListFiles2],
	targetApiToken: cookie,
	messageFinish: 'Archivos cargados correctamente',
};
