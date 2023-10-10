import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.ToggleSwitch,
} as ComponentMeta<typeof SuraComponent.ToggleSwitch>;

const Template: ComponentStory<typeof SuraComponent.ToggleSwitch> = (args) => <SuraComponent.ToggleSwitch {...args} />;

export const ToggleSwitch = Template.bind({});

ToggleSwitch.args = {
	showlabel: true,
	label: 'Nombre',
	id: 'nombre',
	name: 'nombre',
	placeholder: 'Ingresar',
	onChange: (e: any) => console.log(e.target.name),
	help: '',
	required: true,
	disabled: false,
	checked: false,
	classListInput: [],
};
