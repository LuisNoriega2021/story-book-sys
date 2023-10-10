import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/busquedas',
	component: SuraComponent.FormularioBusquedaFechas,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.FormularioBusquedaFechas>;

const Template: ComponentStory<typeof SuraComponent.FormularioBusquedaFechas> = (args) => <SuraComponent.FormularioBusquedaFechas {...args} />;


export const FormularioBusquedaFechas = Template.bind({});

FormularioBusquedaFechas.args = {
	actionSaveHandle: () => console.log('Test'),
}


