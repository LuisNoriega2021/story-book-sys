import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/Stepper/BasicStepper',
	component:  SuraComponent.BasicStepper,
} as ComponentMeta<typeof SuraComponent.BasicStepper>;

const Template: ComponentStory<typeof SuraComponent.BasicStepper> = (args) => <SuraComponent.BasicStepper {...args} />;

export const BasicStepper = Template.bind({});

const steps = [
  {
    label: 'Registro de información',
    id: 1,
    component: <p>Registro de información</p>,
    completed:  false,
  },
  {
    label: 'Completar solicitud',
    id: 2,
    component: <p>Completar solicitud</p>,
    completed:  false,
  },
  {
    label: 'Suscripción',
    id: 3,
    component: <p>Suscripción</p>,
    completed:  false,
  },
  {
    label: 'Resolución',
    id: 4,
    component: <p>Resolución</p>,
    completed:  false,
  },
];

const validateSteps = (selected: number) => {
  steps.forEach((step) => {
    if (selected === step.id) {
      step.completed = true;
    }
  });
};

BasicStepper.args = {
  steps,
  defaultStep: 1,
  onChange: validateSteps,
  onCompleteStepper: () => console.log('Pasos finalizados!'),
};
