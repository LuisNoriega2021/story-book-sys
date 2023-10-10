import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/formularioPEPS/VinculoComercial',
	component: SuraComponent.VinculoComercial,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.VinculoComercial>;

const Template: ComponentStory<typeof SuraComponent.VinculoComercial> = (args) => <SuraComponent.VinculoComercial {...args} />;

export const VinculoComercial = Template.bind({});
VinculoComercial.args = {
    datos: {
        nombre: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        participacion: {
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
    },
    actionDeleteHandle: () => console.log('Test'),
    actionAddHandle: () => console.log('Test add'),
    updateVinculoComercial: (datos: any) => console.log('updateB', datos),
    indexVinculoComercial: 1
};


