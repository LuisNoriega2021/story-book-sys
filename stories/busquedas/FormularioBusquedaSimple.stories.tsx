import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/busquedas',
	component: SuraComponent.FormularioBusquedaSimple,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.FormularioBusquedaSimple>;

const Template: ComponentStory<typeof SuraComponent.FormularioBusquedaSimple> = (args) => <SuraComponent.FormularioBusquedaSimple {...args} />;


export const FormularioBusquedaSimple = Template.bind({});

FormularioBusquedaSimple.args = {
	actionSaveHandle: () => console.log('Test'),
}

