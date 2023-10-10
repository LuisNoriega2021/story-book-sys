import React from 'react';
import { ComponentStory, ComponentMeta, storiesOf } from '@storybook/react';
import SuraComponent from '../../src';
import * as DateFns from 'date-fns';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.DateRangePicker,
} as ComponentMeta<typeof SuraComponent.DateRangePicker>;

const Template: ComponentStory<typeof SuraComponent.DateRangePicker> = (args) => <SuraComponent.DateRangePicker {...args} />;
export const DateRangePicker = Template.bind({});

const data = [
	{
	  year: 2021,
	  month: 1,
	  startDate:new Date( 2021,1,15 ),
	  endDate: new Date(2021,1,20),
	  key: "mes",
	  startFormatDate: "20210224",
	  endFormatDate: "20210228",
	  description: "Cierre mes de Febrero"
	}, 
	{
	  year: 2021,
	  month: 2,
	  startDate:new Date( 2021,2,24 ),
	  endDate: new Date(2021,2,28) ,
	  startFormatDate: "20210224",
	  endFormatDate: "20210228",
	  key: "mes",
	  description: "Cierre mes de Febrero"
	},
	{
	  year: 2021,
	  month: 3,
	  startDate:new Date( 2021,3,10 ),
	  endDate: new Date(2021,3,15), 
	  startFormatDate: "20210310",
	  endFormatDate: "20210315",
	  key: "mes",
	  description: "Cierre mes de Marzo"
	},
	{
	  year: 2021,
	  month: 4,
	  startDate:new Date( 2021,4,10 ),
	  endDate: new Date(2021,4,12) ,
	  startFormatDate: "20210410",
	  endFormatDate: "20210415",
	  key: "mes",
	  description: "Cierre mes de Abril"
	},
	{
	  year: 2021,
	  month: 5,
	  startDate:new Date( 2021,5,10), 
	  endDate: new Date(2021,5,12) ,
	  startFormatDate: "20210501",
	  endFormatDate: "20210510",
	  key: "mes",
	  description: "Cierre mes de Mayo"
	},
	{
	  year: 2020,
	  month: 6,
	  startDate:new Date( 2020,6,27 ),
	  endDate: new Date(2020,6,30) ,
	  startFormatDate: "20200627",
	  endFormatDate: "20200630",
	  key: "mes",
	  description: "Cierre mes de Junio"
	},
	{
	  year: 2020,
	  month: 7,
	  startDate:new Date( 2020,7,30 ),
	  endDate: new Date(2020,7,31) ,
	  startFormatDate: "20200730",
	  endFormatDate: "20200731",
	  key: "mes",
	  description: "Cierre mes de Julio"
	},
	{
	  year: 2020,
	  month: 8,
	  startDate:new Date( 2020,8,28 ),
	  endDate: new Date(2020,8,31) ,
	  startFormatDate: "20200828",
	  endFormatDate: "20200831",
	  key: "mes",
	  description: "Cierre mes de Agosto"
	},
	{
	  year: 2020,
	  month: 9,
	  startDate:new Date( 2020,9,29 ),
	  endDate: new Date(2020,9,30) ,
	  startFormatDate: "20200929",
	  endFormatDate: "20200930",
	  key: "mes",
	  description: "Cierre mes de Septiembre"
	},
	{
	  year: 2020,
	  month: 10,
	  startDate:new Date( 2020,10,20 ),
	  endDate: new Date(2020,10,25) ,
	  startFormatDate: "20201029",
	  endFormatDate: "20201025",
	  key: "mes",
	  description: "Cierre mes de Octubre"
	},
	{
	  year: 2020,
	  month: 11,
	  startDate:new Date( 2020,11,27 ),
	  endDate: new Date(2020,11,30) ,
	  startFormatDate: "20201127",
	  endFormatDate: "20201130",
	  key: "mes",
	  description: "Cierre mes de Noviembre"
	},
	{
	  year: 2020,
	  month: 12,
	  startDate:new Date( 2020,12,29), 
	  endDate: new Date(2020,12,30) ,
	  startFormatDate: "20201229",
	  endFormatDate: "20201230",
	  key: "mes",
	  description: "Cierre mes de Diciembre"
	}
  ]

DateRangePicker.args = { };
// storiesOf('DateRangePicker', module)
// //   .addDecorator(withKnobs)
//   .add('DateRangePicker', () => <DateRangePicker Datos={data} />)