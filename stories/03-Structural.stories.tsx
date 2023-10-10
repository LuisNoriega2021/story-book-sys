import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header as HeaderSura } from '../src';

const logo = 'https://www.asesuisa.com/img/logo_1.svg';

export default {
	title: 'Components/Structural',
	component: HeaderSura,
	args: {
		logo,
	},
} as ComponentMeta<typeof HeaderSura>;

const Template: ComponentStory<typeof HeaderSura> = (args) => <HeaderSura {...args} />;

export const Header = Template.bind({});
Header.args = {
	text: 'Bienvenido: Juan Arteaga',
	links: [
		{
			label: 'Contacto',
			path: 'contacto',
			isPather: false,
		},
		{
			label: 'Linea ética',
			path: 'linea-etica',
			isPather: false,
		},
		{
			label: 'Más de SURA',
			path: 'mas-sura',
			isPather: true,
			links: [
				{
					label: 'Aniversarios',
					path: 'aniversarios',
					isPather: false,
				},
				{
					label: 'Que es SURA',
					path: 'que-es-sura',
					isPather: true,
					links: [
						{
							label: 'SURA 1',
							path: 'aniversarios',
							isPather: false,
						},
						{
							label: 'SURA 2',
							path: 'aniversarios',
							isPather: false,
						},
						{
							label: 'SURA 3',
							path: 'aniversarios',
							isPather: false,
						},
					],
				},
			],
		},
	],
};
