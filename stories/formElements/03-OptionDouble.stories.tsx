import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets/OptionDouble',
	component: SuraComponent.OptionDouble,
} as ComponentMeta<typeof SuraComponent.OptionDouble>;

const Template: ComponentStory<typeof SuraComponent.OptionDouble> = (args) => <SuraComponent.OptionDouble {...args} />;
export const OptionDouble = Template.bind({});

OptionDouble.args = {
	label: 'Seleccione su sexo',
	labelAyuda: 'Seleccionar el sexo al que pertenece',
	name: 'sexo',
	disabled: false,
	required: true,
	optionsDouble: [
		{ value: 'M', label: 'Masculino' },
		{ value: 'F', label: 'Femenino' },
	],
	onChange: (e: any) => console.log(`${e.target.name} ${e.target.value}`),
	classListInput: [],
	errors: {
		Requerido: {
			mensaje: 'Campo requerido',
			tipoRegla: '*',
			regla: '*',
		},
	},
};

const TemplateDefaultOption: ComponentStory<typeof SuraComponent.OptionDouble> = (args) => (
	<SuraComponent.OptionDouble {...args} />
);
export const OptionDoubleDefaultOption = TemplateDefaultOption.bind({});

OptionDoubleDefaultOption.args = {
	label: 'Seleccione su sexo',
	name: 'sexo',
	disabled: false,
	required: true,
	defaultSelected: { value: 'M', label: 'Masculino' },
	optionsDouble: [
		{ value: 'M', label: 'Masculino' },
		{ value: 'F', label: 'Femenino' },
	],
	onChange: (e: any) => console.log('Sexo: ', e.target.value),
};

const TemplateDisabled: ComponentStory<typeof SuraComponent.OptionDouble> = (args) => (
	<SuraComponent.OptionDouble {...args} />
);
export const OptionDoubleDisabled = TemplateDisabled.bind({});

OptionDoubleDisabled.args = {
	label: 'Es fumador',
	name: 'isSmoker',
	disabled: true,
	optionsDouble: [
		{ value: 'S', label: 'Sí' },
		{ value: 'N', label: 'No' },
	],
	onChange: (e: any) => console.log('Es fumador: ', e.target.value),
};

const TemplateDisabledDefaultOption: ComponentStory<typeof SuraComponent.OptionDouble> = (args) => (
	<SuraComponent.OptionDouble {...args} />
);
export const OptionDoubleDisabledDefaultOption = TemplateDisabledDefaultOption.bind({});

OptionDoubleDisabledDefaultOption.args = {
	label: 'Es fumador',
	name: 'isSmoker',
	disabled: true,
	defaultSelected: { value: 'S', label: 'Sí' },
	optionsDouble: [
		{ value: 'S', label: 'Sí' },
		{ value: 'N', label: 'No' },
	],
	onChange: (e: any) => console.log('Es fumador: ', e.target.value),
};
