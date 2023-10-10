import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';
import * as DateFns from 'date-fns';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.YearPicker,
} as ComponentMeta<typeof SuraComponent.YearPicker>;

const Template: ComponentStory<typeof SuraComponent.YearPicker> = (args) => <SuraComponent.YearPicker {...args} />;
export const YearPicker = Template.bind({});

YearPicker.args = {
	id: 'idYearFirstConsul',
	name: 'idYearFirstConsul',
	showlabel: true,
	label: 'Año de ultima consulta',
	disabled: false,
	required: false,
	placeholder: 'Año',
	onChange: (name: string, date: Date) => console.log(name, [DateFns.format(date, 'dd/MM/yyyy'), date]),
	classListInput: [],
};
