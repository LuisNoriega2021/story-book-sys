import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets/InputWithMask',
	component: SuraComponent.InputWithMask,
} as ComponentMeta<typeof SuraComponent.InputWithMask>;

const Template: ComponentStory<typeof SuraComponent.InputWithMask> = (args) => (
	<SuraComponent.InputWithMask {...args} />
);

export const InputWithMask = Template.bind({});
export const InputWithMaskBasic = Template.bind({});
export const InputWithMaskComplete = Template.bind({});

InputWithMask.args = {
	id: 'nit',
	name: 'nit',
	showlabel: true,
	label: 'NIT',
	type: 'text',
	placeholder: '0000-000000-000-0',
	placeholderChar: '#',
	errors: {
		// maxLenght: {
		//   mensaje: 'Maximo de caracteres 17',
		//   tipoRegla: 'maxLenght',
		//   regla: 17,
		// }
	},
	touched: false,
	required: false,
	disabled: false,
	mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/],
	className: 'sura-form-control',
	onChange: (event: React.ChangeEvent<HTMLElement>) => console.log('change', event.target),
	classListInput: [],
};

InputWithMaskBasic.args = {
	id: 'telefono',
	name: 'telefono',
	showlabel: true,
	label: 'Telefono',
	type: 'text',
	placeholder: '+503 0000-0000',
	placeholderChar: '_',
	errors: {},
	touched: false,
	required: false,
	disabled: false,
	mask: ['+', /\d/, /\d/, /\d/, ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
	className: 'sura-form-control',
};

InputWithMaskComplete.args = {
	id: 'dui',
	name: 'dui',
	showlabel: true,
	label: 'DUI',
	type: 'text',
	placeholder: '000000-0',
	placeholderChar: '_',
	errors: {
		maxLenght: {
			mensaje: 'Maximo de caracteres 8',
			tipoRegla: 'maxLenght',
			regla: 8,
		},
	},
	touched: false,
	help: 'Digita tu DUI en el formato que se te pide',
	required: true,
	disabled: false,
	mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/], // Array<string | RegExp> | false
	className: 'sura-form-control',
	onChange: (event: React.ChangeEvent<HTMLElement>) => console.log('change', event.target),
	onBlur: (event: React.ChangeEvent<HTMLElement>) => console.log('blur', event.target),
};
