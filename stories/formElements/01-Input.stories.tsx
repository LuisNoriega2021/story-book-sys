import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets/Input',
	component: SuraComponent.Input,
} as ComponentMeta<typeof SuraComponent.Input>;

const Template: ComponentStory<typeof SuraComponent.Input> = (args) => <SuraComponent.Input {...args} />;

export const Input = Template.bind({});
export const InputDefault = Template.bind({});
export const InputText = Template.bind({});
export const InputColor = Template.bind({});
export const InputEmail = Template.bind({});
export const InputHidden = Template.bind({});
export const InputNumber = Template.bind({});
export const InputPassword = Template.bind({});
export const InputReset = Template.bind({});
export const InputSearch = Template.bind({});
export const InputTel = Template.bind({});
export const InputUrl = Template.bind({});

Input.args = {
	id: 'nombre',
	name: 'nombre',
	showlabel: true,
	label: 'Nombre',
	placeholder: 'Ingresar',
	value: '',
	onChange: (e: any) => console.log(e.target.value),
	type: 'text',
	help: 'Ingresa tu nombre completo',
	required: true,
	disabled: false,
	labelAyuda: 'Hola',
	hasSelectedContentOnClick: true,
	classListInput: [],
};

InputDefault.args = {
	id: 'idDefault',
	name: 'default',
};

InputText.args = {
	id: 'idText',
	name: 'inputText',
	placeholder: 'Ingresar texto',
	type: 'text',
	help: 'Ingresa el texto que se te pide',
	onChange: (e: any) => console.log(e.target.name),
};

InputColor.args = {
	id: 'idColor',
	name: 'inputColor',
	placeholder: 'Seleccionar color',
	type: 'color',
	help: 'Ingresa un color para el fondo',
	onChange: (e: any) => console.log(e.target.name),
};

InputEmail.args = {
	id: 'idEmail',
	name: 'inputEmail',
	showlabel: true,
	label: 'Correo electrónico',
	type: 'email',
	help: 'Ingresa el correo electrónico de contacto',
	onChange: (e: any) => console.log(e.target.name),
};

InputHidden.args = {
	id: 'idHidden',
	name: 'inpuHidden',
	value: 'valor que el usuario no ve',
	type: 'hidden',
};

InputNumber.args = {
	id: 'idNumber',
	name: 'inpuNumber',
	showlabel: true,
	label: 'Edad',
	defaultValue: 18,
	min: 18,
	max: 120,
	type: 'number',
	help: 'Ingresa tu edad según documento de identificación',
};

InputPassword.args = {
	id: 'idPassword',
	name: 'inpuPassword',
	showlabel: true,
	label: 'Contraseña',
	type: 'password',
};

InputReset.args = {
	id: 'idReset',
	name: 'inpuReset',
	value: 'Restablecer',
	type: 'reset',
};

InputSearch.args = {
	id: 'idSearch',
	name: 'inpuSearch',
	placeholder: 'Buscar municipio',
	type: 'search',
	onPressIcon: () => console.log('You are pressing icon search!'),
};

InputTel.args = {
	id: 'idTel',
	name: 'inpuTel',
	showlabel: true,
	label: 'Teléfono',
	help: 'Formato: +000 1234-5678',
	pattern: '+[0-9]{3} [0-9]{4}-[0-9]{4}',
	required: true,
	type: 'tel',
};

InputUrl.args = {
	id: 'idUrl',
	name: 'inpuUrl',
	showlabel: true,
	label: 'Sitio web',
	help: 'Ingresa la dirección web del sitio',
	required: true,
	type: 'url',
};
