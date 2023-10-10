import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/Stepper/StepperActions',
	component: SuraComponent.StepperActions,
} as ComponentMeta<typeof SuraComponent.StepperActions>;

const Template: ComponentStory<typeof SuraComponent.StepperActions> = (args) => (
	<SuraComponent.StepperActions {...args} />
);

export const StepperActions = Template.bind({});

const steps = [
	{
		label: 'Paso 1',
		id: 1,
		component: <p>Paso 1</p>,
		completed: false,
	},
	{
		label: 'Paso 2',
		id: 2,
		component: <p>Paso 2</p>,
		completed: false,
	},
	{
		label: 'Paso 3',
		id: 3,
		component: <p>Paso 3</p>,
		completed: false,
	},
	{
		label: 'Paso 4',
		id: 4,
		component: <p>Paso 4</p>,
		completed: false,
	},
];

const onPrevious = (step: number) => {
	console.log('Previous', step);
	if (step > -1) {
		return true;
	}
	return false;
};

const onNext = (step: number) => {
	console.log('Next', step);
	if (step + 1 <= steps.length) {
		return true;
	}
	return false;
};

const StepIndicator = (props) => {
	console.log('Props StepIndicator', props);

	return <p>{`${1}/${12}`}</p>;
};

StepperActions.args = {
	steps,
	labelPrevious: '< Anterior',
	labelNext: 'Siguiente >',
	onPrevious,
	onNext,
	IndicatorSteps: StepIndicator,
};
