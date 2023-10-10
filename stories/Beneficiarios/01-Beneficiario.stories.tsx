import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/Beneficiarios/Beneficiario',
	component: SuraComponent.Beneficiario,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.Beneficiario>;

const Template: ComponentStory<typeof SuraComponent.Beneficiario> = (args) => <SuraComponent.Beneficiario {...args} />;

export const Beneficiario = Template.bind({});
Beneficiario.args = {
    datos: {
        identificacion: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        nombres: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
        apellidos: {
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
        porcentaje: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }
    },
    parentescos: [
        {id: '1', value: 'Madre'},
        {id: '2', value: 'Padre'},
        
    ],
    actionDeleteHandle: () => console.log('Test'),
    actionAddHandle: () => console.log('Test add'),
    updateBeneficiario: (datos: any) => console.log('updateB', datos),
    porcentajeDisponible: 55.55,
    indexBeneficiario: 1
};


