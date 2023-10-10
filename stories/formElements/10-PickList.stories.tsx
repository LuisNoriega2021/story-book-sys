import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets',
	component:  SuraComponent.PickList,
} as ComponentMeta<typeof SuraComponent.PickList>;

const Template: ComponentStory<typeof SuraComponent.PickList> = (args) => <SuraComponent.PickList {...args} />;

export const PickList = Template.bind({});

PickList.args = {
  showlabel: true,
  label: 'Lista Enfermedades',
  id: 'lista',
  name: 'lista',
  placeholder: 'Ingresar',
  onChange: (e:any) => console.log(e),
  help: '',
  required: true,
  disabled: false,
  elementsPick: [
      {
          id: '1',
          value: 'Cancer',
          checked: false
      },
      {
          id: '2',
          value: 'Gripe',
          checked: false
      },
      {
          id: '3',
          value: 'Covid',
          checked: true
      },
  ]
};


