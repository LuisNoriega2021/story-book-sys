import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/Intermediarios/Intermediario',
	component: SuraComponent.Intermediario,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.Intermediario>;

const Template: ComponentStory<typeof SuraComponent.Intermediario> = (args) => <SuraComponent.Intermediario {...args} />;

export const Intermediario = Template.bind({});
Intermediario.args = {
    datos: {
        codigoAsesor: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        nombreCompleto: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
        celular: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
        participacionComision: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }
    },
    actionDeleteHandle: () => console.log('Test'),
    actionAddHandle: () => console.log('Test add'),
    updateIntermediario: (datos: any) => console.log('updateB', datos),
    participacionComisionDisponible: 55.55,
    indexIntermediario: 1,
    mostrarAgregar: false
};


