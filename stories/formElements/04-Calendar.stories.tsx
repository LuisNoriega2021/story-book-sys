import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';
import * as DateFns from 'date-fns';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.Calendar,
} as ComponentMeta<typeof SuraComponent.Calendar>;

const Template: ComponentStory<typeof SuraComponent.Calendar> = (args) => <SuraComponent.Calendar {...args} />;
export const Calendar = Template.bind({});

Calendar.args = {
	id: 'idfechaNacimiento',
	name: 'fechaNacimiento',
	showlabel: true,
	label: 'Fecha de nacimiento',
	disabled: false,
	required: false,
	placeholder: 'Ingresar fecha',
	onChange: (name: string, date: Date) => console.log(name, [DateFns.format(date, 'dd/MM/yyyy'), date]),
	classListInput: [],
};
