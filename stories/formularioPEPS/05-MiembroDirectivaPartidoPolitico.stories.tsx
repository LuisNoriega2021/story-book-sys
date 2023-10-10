import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/formularioPEPS/MiembroDirectivaPartidoPolitico',
	component: SuraComponent.MiembroDirectivaPartidoPolitico,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.MiembroDirectivaPartidoPolitico>;

const Template: ComponentStory<typeof SuraComponent.MiembroDirectivaPartidoPolitico> = (args) => <SuraComponent.MiembroDirectivaPartidoPolitico {...args} />;

export const MiembroDirectivaPartidoPolitico = Template.bind({});
MiembroDirectivaPartidoPolitico.args = {
    datos: {
        partidoPolitico: {
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
        fechaInicioGestion: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        fechaFinGestion: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }
    },
    actionDeleteHandle: () => console.log('Test'),
    actionAddHandle: () => console.log('Test add'),
    updateMiembroDirectivaPartidoPolitico: (datos: any) => console.log('updateB', datos),
    indexMiembroDirectivaPartidoPolitico: 1
};


