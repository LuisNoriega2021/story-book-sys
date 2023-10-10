import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from '../src';

export default {
	title: 'Components/Modal',
	component: Modal,
	argTypes: {
		backgroundColorHF: { control: 'color' },
	},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

const Hijo = () => (
	<div>
		<p>Parrafo para el cuerpo del modal</p>
		<span>{':)'}</span>
	</div>
);

const Footer = () => (
	<div>
		<span>{new Date().getFullYear()}</span>
	</div>
);

export const ModalContent = Template.bind({});
ModalContent.args = {
	isOpen: false,
	children: <Hijo />,
	footer: true,
	contentFooter: <Footer />,
};
