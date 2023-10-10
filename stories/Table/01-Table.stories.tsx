import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table, Button } from '../../src';

export default {
	title: 'Components/Table',
	component: Table,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof Table>;

let columns = [
	{ accessor: 'id', label: 'CORRELATIVO' },
	{ accessor: 'documento', label: 'DOC' },
	{ accessor: 'nombre', label: 'NOMBRE' },
	{ accessor: 'campo', label: 'CAMPO LARGO' },
	{ accessor: 'apellido1', label: 'PRIMER APELLIDO' },
	{ accessor: 'apellido2', label: 'SEGUNDO APELLIDO' },
];

let data = [
	{
		id: 1,
		documento: 1234567890,
		nombre: 'Francisco',
		apellido1: 'Martínez',
		apellido2: 'García',
		campo: 'pruebapruebapruebapruebapruebapruebapruebapruebapruebaprueba',
	},
	{ id: 2, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{
		id: 3,
		documento: 12345678901234,
		nombre: 'Jose',
		apellido1: 'López',
		apellido2: 'Vázquez',
		campo: 'pruebapruebapruebapruebapruebapruebapruebapruebapruebaprueba',
	},
	{ id: 4, documento: '', nombre: 'Juan', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 5, documento: '', nombre: 'Juan', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 7, documento: '', nombre: 'Juan', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 6, documento: '', nombre: 'Juan', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 8, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 9, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 10, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 11, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 12, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 13, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 14, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 15, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 17, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 16, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 18, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 19, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 20, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 21, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 22, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 23, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 24, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 25, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 27, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 26, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 28, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 29, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 30, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 41, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 42, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 43, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 44, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 45, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 47, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 46, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 48, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 49, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 50, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 61, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 62, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 63, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 64, documento: 1234567890134, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 65, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 67, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 66, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 68, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 69, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
	{ id: 70, documento: 12345678901234, nombre: 'Jose', apellido1: 'López', apellido2: 'Vázquez' },
];

let title = 'Personas';

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const table = Template.bind({});
table.args = {
	columns,
	data,
	title,
	idColumn: 'id',
	action: () => {},
	minColumnWidth: '50px',
	buttons: <Button label='extra' />,
};
