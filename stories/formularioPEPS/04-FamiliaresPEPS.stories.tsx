import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/formularioPEPS/FamiliaresPEPS',
	component: SuraComponent.FamiliaresPEPS,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.FamiliaresPEPS>;

const Template: ComponentStory<typeof SuraComponent.FamiliaresPEPS> = (args) => <SuraComponent.FamiliaresPEPS {...args} />;

export const FamiliaresPEPS = Template.bind({});
FamiliaresPEPS.args = {
    datos: {
        nombrePCompleto: {
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
        nombreOtroParentesco: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        otrosParentesco: false
    },
    parentescos: [
        {id: '1', value: 'Madre'},
        {id: '2', value: 'Padre'},
        
    ],
    actionDeleteHandle: () => console.log('Test'),
    actionAddHandle: () => console.log('Test add'),
    updateFamiliaresPEPS: (datos: any) => console.log('updateB', datos),
    indexFamiliaresPEPS: 1
};


