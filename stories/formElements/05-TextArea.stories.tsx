import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.TextArea,
} as ComponentMeta<typeof SuraComponent.TextArea>;

const Template: ComponentStory<typeof SuraComponent.TextArea> = (args) => <SuraComponent.TextArea {...args} />;

export const TextArea = Template.bind({});

TextArea.args = {
	showlabel: true,
	label: 'Nombre',
	id: 'nombre',
	name: 'nombre',
	placeholder: 'Ingresar',
	onChange: (e: any) => console.log(e.target.name),
	help: 'Ingresa tu nombre completo',
	required: true,
	disabled: false,
	errors: {
		mensajeError: {
			mensaje: 'Error de prueba',
			campoAnidado: '',
			regla: '',
			tipoRegla: '',
		},
	},
	classListInput: [],
};
