import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.DropDownList,
} as ComponentMeta<typeof SuraComponent.DropDownList>;

const TemplateDropDownList: ComponentStory<typeof SuraComponent.DropDownList> = (args) => (
	<SuraComponent.DropDownList {...args} />
);

export const DropDownList = TemplateDropDownList.bind({});

DropDownList.args = {
	disabled: false,
	id: 'departamentos',
	opciones: [
		{ id: 1, value: 'La Libertad' },
		{ id: 2, value: 'Sonsonate' },
		{ id: 3, value: 'Santa Ana' },
		{ id: 4, value: 'Auachapan' },
	],
	opcionDefault: { id: 1, value: 'La Libertad' },
	placeholder: 'Selecciona donde vives',
	onChange: (e: any) => console.log([e.target.name, e.target.value]),
	required: true,
	label: 'Departamento',
	labelAyuda: 'Ayuda',
	handleBlur: (e: React.FocusEvent<HTMLInputElement>) => console.log([e.target.name, e.target.value]),
	handleFocus: (e: React.FocusEvent<HTMLInputElement>) => console.log([e.target.name, e.target.value]),
	classListInput: [],
};
