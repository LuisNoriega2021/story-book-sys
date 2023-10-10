import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer as FooterSura } from '../../src';

const logo = 'https://www.asesuisa.com/img/logo_1.svg';

export default {
	title: 'Components/Structural',
	component: FooterSura,
	args: {},
} as ComponentMeta<typeof FooterSura>;

const Template: ComponentStory<typeof FooterSura> = (args) => <FooterSura {...args} />;

export const Footer = Template.bind({});
Footer.args = {};
