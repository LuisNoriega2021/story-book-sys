import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/Modals',
	component:  SuraComponent.Tooltip,
} as ComponentMeta<typeof SuraComponent.Tooltip>;

const Template: ComponentStory<typeof SuraComponent.Tooltip> = (args) => <SuraComponent.Tooltip {...args} />;
export const Tooltip = Template.bind({});

Tooltip.args = {
	children: <p>Hover me!</p>,
	message: 'Mensaje con información adicional.',
	position: 'right',
};

const TemplateToolTipSura: ComponentStory<typeof SuraComponent.ToolTipSura> = (args) => <SuraComponent.ToolTipSura {...args} />;
export const ToolTipSura = TemplateToolTipSura.bind({});

ToolTipSura.args = {
	children: <p>Hover me!</p>,
	message: 'Mensaje con información adicional.',
	position: 'right',
};
