import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DiagnosticoCIE10 } from '../src';

export default {
	title: 'Components/DiagnosticoCIE10',
	component: DiagnosticoCIE10,
} as ComponentMeta<typeof DiagnosticoCIE10>;

const Template: ComponentStory<typeof DiagnosticoCIE10> = (args) => <DiagnosticoCIE10 {...args} />;

export const DiagnosticoCIE10Sura = Template.bind({});




const clasificacionValues = ['Agudos', 'Cronicos'];
const col = [
	{ data: '_id', text: '', type: 'checkbox', visible: true },
	{ data: 'id', text: '', visible: false },
	{ data: 'codigoCIE10', text: 'Codigo', visible: true },
	{ data: 'nombreCIE10', text: 'Nombre', visible: true },
	{ data: 'nombreGenerico', text: 'Nombre generico', visible: true },
	{ data: 'clasificacion', text: 'Clasificacion', visible: true },
	{ data: 'clasificacionId', text: '', visible: false },
];
const datosTable = [
	{
		_id: '4566',
		id: '4566',
		codigoCIE10: 'COD239CH',
		nombreCIE10: 'Grita prosaica',
		nombreGenerico: 'Catarro',
		clasificacion: 'Agudos',
		clasificacionId: '1',
	},
	{
		_id: '455465',
		id: '455465',
		codigoCIE10: 'COD23DP',
		nombreCIE10: 'Espumi militica',
		nombreGenerico: 'Dolor de cabeza',
		clasificacion: 'Cronico',
		clasificacionId: '2',
	},
];
const dataTable = {
	dataTableJs: false,
	filtroIndividual: false,
	datos: datosTable,
	id: 'tableDiagnosticoCIE10',
	columnas: col,
	ClaseCheck: 'NotasCheck',
	Filas: 10,
};

DiagnosticoCIE10Sura.args = {
	titulo: 'Diagnósticos',
	codCIE10Label: 'Codigo CIE10',
};

// storiesOf('DiagnosticoCIE10', module)
// 	.addDecorator(withKnobs)
// 	.add('DiagnosticoCIE10', () => (
// 		<DiagnosticoCIE10
// 			titulo={text('titulo', 'Diagnósticos')}
// 			codCIE10Label={text('label codigo', 'Codigo CIE10')}
// 			codCIE10Value={text('value codigo', '')}
// 			nombreLabel={text('label nombre', 'Nombre')}
// 			nombreValue={text('value nombre', '')}
// 			aliasLabel={text('alias label', 'Nombre genérico')}
// 			aliasValue={text('value label', '')}
// 			clasificacion={boolean('habilitar clasificacion', true)}
// 			clasificacionDefaultValue={select(
// 				'valor por defecto clasificacion',
// 				clasificacionValues,
// 				clasificacionValues[0]
// 			)}
// 			clasificacionValues={clasificacionValues}
// 			buscarDiagnostico={(val) => console.log('buscar', val)}
// 			guardarDiagnostico={(val) => console.log('guardar', val)}
// 			actualizarDiagnostico={(val) => console.log('actualizar', val)}
// 			dataTable={prueba}
// 			getCurrentItem={(item) => console.log('current', item)}
// 		/>
// 	));