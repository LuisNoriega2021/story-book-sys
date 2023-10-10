import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileViewingArticle } from '../../src';
import { ItemFileViewingArticleTest } from '../dataTest';

export default {
	title: 'Components/Files/FileViewingArticle',
	component: FileViewingArticle,
} as ComponentMeta<typeof FileViewingArticle>;

const Template: ComponentStory<typeof FileViewingArticle> = (args) => <FileViewingArticle {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	...ItemFileViewingArticleTest,
};
