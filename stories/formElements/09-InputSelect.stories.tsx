import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuraComponent from '../../src';
import { IItemOptionDouble } from '../../src/interfaces';

export default {
	title: 'Components/FormElemenets',
	component: SuraComponent.InputSelect,
} as ComponentMeta<typeof SuraComponent.InputSelect>;

const TemplateInputSelect: ComponentStory<typeof SuraComponent.InputSelect> = (args) => {
	const [data, setData] = useState<Array<IItemOptionDouble> | IItemOptionDouble>();

	const opciones = [
		{ value: 'de1', label: 'Toreo' },
		{ value: 'de2', label: 'Automovilismo' },
		{ value: 'de3', label: 'Motociclismo' },
		{ value: 'de4', label: 'Vuelo en cometa' },
	];

	return (
		<div>
			<SuraComponent.InputSelect
				inputId='deportesExtremos'
				name='deportesExtremos'
				menuIsOpen={undefined}
				disabled={false}
				required={false}
				clearable={false}
				searchable={false}
				loading={false}
				isMulti={false}
				value={data}
				options={opciones}
				actionOnSelectedOption={(dataOptions: Array<IItemOptionDouble> | IItemOptionDouble) => setData(dataOptions)}
				placeholder={'Buscar deporte'}
				defaultValue={[]}
				label={'Deportes'}
				labelAyuda={'Selecciona los deportes extremos que practicas'}
				errors={{}}
				noOptionsMessage={(obj: { inputValue: string }) => <p style={{ margin: 0 }}>No hay opciones disponibles</p>}
				loadingMessage={(obj: { inputValue: string }) => <p style={{ margin: 0 }}>Buscando deportes...</p>}
				handleFocus={(event: React.FocusEvent<HTMLInputElement>) => console.log('focus', event.target.id)}
				handleBlur={(event: React.FocusEvent<HTMLInputElement>) => console.log('blur', event.target.id)}
				{...args}
			/>
		</div>
	);
};

export const InputSelect = TemplateInputSelect.bind({});

InputSelect.args = {
	classListInput: [],
};
