import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.DropDownListAutocomplete,
} as ComponentMeta<typeof SuraComponent.DropDownListAutocomplete>;

const TemplateDropDownListAutocomplete: ComponentStory<typeof SuraComponent.DropDownListAutocomplete> = (args) => {
	return (
		<div>
			<SuraComponent.DropDownListAutocomplete {...args} />
			<SuraComponent.Input
				id='idText'
				name='inputText'
				label='Text'
				showlabel
				placeholder='Ingresar texto'
				type='text'
				help='Ingresa el texto que se te pide'
			/>
			<div>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi eos ipsa cupiditate iste saepe quos vel id
				voluptatem. Dolores odio voluptatum dicta architecto ratione et praesentium quas temporibus suscipit quasi.
			</div>
		</div>
	);
};

export const DropDownListAutocomplete = TemplateDropDownListAutocomplete.bind({});

DropDownListAutocomplete.args = {
	inputId: 'cesionarios',
	name: 'cesionarios',
	// menuIsOpen: true,
	defaultOptions: [],
	placeholder: 'Buscar cesionario',
	defaultValue: {},
	searchApiUrl: 'http://localhost:5000/api/cesionario/',
	actionOnSelectedOption: (value: object) => console.log('actionOnSelectedOption', value),
	mapOptionsToValues: (options: Array<object>) =>
		options.map((option: object) => ({
			value: option['id'],
			label: option['value'],
		})),
	noOptionsMessage: (obj: { inputValue: string }) => <p style={{ margin: 0 }}>No hay opciones disponibles</p>,
	loadingMessage: (obj: { inputValue: string }) => <p style={{ margin: 0 }}>Buscando cesionarios...</p>,
	isClearable: false,
	disabled: false,
	label: 'Banco',
	required: true,
	labelAyuda: 'Debes buscar el banco que desea añadir como cesionario y seleccionarlo de los resultados de la búsqueda',
	classListInput: [],
};
