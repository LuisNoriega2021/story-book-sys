import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Grid } from '../src';

export default {
	title: 'Grid/Grid/GridStyled',
	component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const SuraGrid = Template.bind({});
SuraGrid.args = {
	type: 'row',
	colSM: 12,
	colMD: 12,
	colLG: 12,
	colXL: 12,
};
