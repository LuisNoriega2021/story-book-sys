import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/formularioPEPS/MiembroFamiliar',
	component: SuraComponent.MiembroFamiliar,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.MiembroFamiliar>;

const Template: ComponentStory<typeof SuraComponent.MiembroFamiliar> = (args) => <SuraComponent.MiembroFamiliar {...args} />;

export const MiembroFamiliar = Template.bind({});
MiembroFamiliar.args = {
    datos: {
        nombreFamiliar: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        cargo: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
        parentesco: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
    },
    actionDeleteHandle: () => console.log('Test'),
    actionAddHandle: () => console.log('Test add'),
    updateMiembroFamiliar: (datos: any) => console.log('updateB', datos),
    indexMiembroFamiliar: 1
};


