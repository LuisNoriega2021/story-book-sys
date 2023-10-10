import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';
import * as DateFns from 'date-fns';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.MonthYearPicker,
} as ComponentMeta<typeof SuraComponent.YearPicker>;

const Template: ComponentStory<typeof SuraComponent.MonthYearPicker> = (args) => <SuraComponent.MonthYearPicker {...args} />;
export const MonthYearPicker = Template.bind({});

MonthYearPicker.args = {
	id: 'idMonthYearFirstConsul',
	name: 'idMonthYearFirstConsul',
	showlabel: true,
	label: 'Fecha de ultima consulta',
	disabled: false,
	required: false,
	placeholder: 'Fecha',
	onChange: (name: string, date: Date) => console.log(name, [DateFns.format(date, 'MMMM yyyy'), date]),
};
