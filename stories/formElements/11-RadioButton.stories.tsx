import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.RadioButton,
} as ComponentMeta<typeof SuraComponent.RadioButton>;

const Template: ComponentStory<typeof SuraComponent.RadioButton> = (args) => <SuraComponent.RadioButton {...args} />;
export const RadioButton = Template.bind({});

RadioButton.args = {
	id: 'idRadio',
	name: 'nombreRadio',
	items: [
		{ id: 'a', text: 'Historial', value: '100' },
		{ id: 'b', text: 'Detalle solicitud', value: '101', checked: true },
		{ id: 'c', text: 'Detalle gestión', value: '102' }
	]
};
