import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SmallSolutionCard } from '../src';
import IconCard from './assets/svg/iconCar.svg';
// import IconCard from './assets/svg/iconCar.svg';

export default {
	title: 'Components/Cards/SmallSolutionCard',
	component: SmallSolutionCard,
} as ComponentMeta<typeof SmallSolutionCard>;

const Template: ComponentStory<typeof SmallSolutionCard> = (args) => <SmallSolutionCard {...args} />;

export const VidaMultiple = Template.bind({});
VidaMultiple.args = {
  title: 'Vida Múltiple',
  description: 'Asegúrate de disfrutar cada kilometro que recorres porque nosotros te protegemos.',
  icon: IconCard,
};

// export const Informacion = Template.bind({});
// Informacion.args = {
// 	label: 'Informarme',
// 	typeStyle: 'info'
// };

// export const Precausion = Template.bind({});
// Precausion.args = {
// 	label: 'Editar',
// 	typeStyle: 'warning'
// };

