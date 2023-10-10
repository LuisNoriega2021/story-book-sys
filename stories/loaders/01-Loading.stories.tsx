import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Loading } from '../../src';

export default {
	title: 'Components/Loaders/Loading',
	component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const BasicLoading = Template.bind({});

BasicLoading.args = {
	heightImg: '10',
	widthImg: '1o',
};
