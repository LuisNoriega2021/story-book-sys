import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/formularioPEPS/InformacionAdicionalMiembroDirectiva',
	component: SuraComponent.InformacionAdicionalMiembroDirectiva,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.InformacionAdicionalMiembroDirectiva>;

const Template: ComponentStory<typeof SuraComponent.InformacionAdicionalMiembroDirectiva> = (args) => <SuraComponent.InformacionAdicionalMiembroDirectiva {...args} />;

export const InformacionAdicionalMiembroDirectiva = Template.bind({});
InformacionAdicionalMiembroDirectiva.args = {
    datos: {
        nombreSociedad: {
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
        participacion: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        esClienteAsesuisa: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }
    },
    actionDeleteHandle: () => console.log('Test'),
    actionAddHandle: () => console.log('Test add'),
    updateInformacionAdicionalMiembroDirectiva: (datos: any) => console.log('updateB', datos),
    indexInformacionAdicionalMiembroDirectiva: 1
};


