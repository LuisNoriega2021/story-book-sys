import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/formularioPEPS/InformacionAdicionalCierreOperaciones',
	component: SuraComponent.InformacionAdicionalCierreOperaciones,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof SuraComponent.InformacionAdicionalCierreOperaciones>;

const Template: ComponentStory<typeof SuraComponent.InformacionAdicionalCierreOperaciones> = (args) => <SuraComponent.InformacionAdicionalCierreOperaciones {...args} />;

export const InformacionAdicionalCierreOperaciones = Template.bind({});
InformacionAdicionalCierreOperaciones.args = {
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
        }
    },
    updateInformacionAdicionalCierreOperaciones: (datos: any) => console.log('updateB', datos)
};


