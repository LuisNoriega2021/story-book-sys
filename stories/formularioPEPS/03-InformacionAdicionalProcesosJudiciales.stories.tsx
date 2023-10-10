import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/formularioPEPS/InformacionAdicionalProcesosJudiciales',
	component: SuraComponent.InformacionAdicionalProcesosJudiciales,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.InformacionAdicionalProcesosJudiciales>;

const Template: ComponentStory<typeof SuraComponent.InformacionAdicionalProcesosJudiciales> = (args) => <SuraComponent.InformacionAdicionalProcesosJudiciales {...args} />;

export const InformacionAdicionalProcesosJudiciales = Template.bind({});
InformacionAdicionalProcesosJudiciales.args = {
    datos: {
        institucionFinanciera: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        motivo: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        }, 
        recomendaciones: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
        nombreIntermediario: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
        fechaEntrevista: {
            error: false,
            completo: false,
            mensajeError: '',
            valor: ''
        },
    },
    updateInformacionAdicionalProcesosJudiciales: (datos: any) => console.log('updateB', datos)
};


