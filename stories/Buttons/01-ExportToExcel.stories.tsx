import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExportExcelButton } from '../../src';

export default {
	title: 'Components/Buttons/ExportExcelButton',
	component: ExportExcelButton,
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as ComponentMeta<typeof ExportExcelButton>;

let columns = [
    {accessor: 'id', label: 'CORRELATIVO'},
    {accessor: 'nombre', label: 'NOMBRE'}
];

let data = [{id: 1, nombre: 'Francisco'},{id: 2, nombre: 'Jose'}];

let title = 'Documento';


const Template: ComponentStory<typeof ExportExcelButton> = (args) => <ExportExcelButton {...args} />;

export const Export = Template.bind({});
Export.args = {
	columns, data, title
};

