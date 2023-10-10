import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../src';

export default {
	title: 'Components/Buttons/ButtonSura',
	component: Button,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	label: 'Enviar',
};

export const Informacion = Template.bind({});
Informacion.args = {
	label: 'Informarme',
	typeStyle: 'info'
};

export const Precausion = Template.bind({});
Precausion.args = {
	label: 'Editar',
	typeStyle: 'warning'
};

