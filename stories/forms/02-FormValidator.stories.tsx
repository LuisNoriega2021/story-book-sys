import React, { useState, FormEvent, ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SuraComponent from '../../src';
import { IItemListImg, IItemOptionDouble } from '../../src/interfaces';

export default {
	title: 'Components/Forms/FormValidator',
	component: SuraComponent.FormValidator,
} as ComponentMeta<typeof SuraComponent.FormValidator>;

const optionsTiposDocumentos: IItemOptionDouble[] = [
	{ value: '1', label: 'DUI' },
	{ value: '2', label: 'Pasaporte' },
	{ value: '3', label: 'Carné de residente' },
];

const Template: ComponentStory<typeof SuraComponent.FormValidator> = ({ children, handleSubmit, ...args }) => {
	const [state, setState] = useState<{ [key: string]: any }>({});

	const handleChange = ({
		currentTarget: { name, value, type },
	}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setState({ ...state, [name]: type === 'radio' ? { ...JSON.parse(value), value: value } : value });
	};

	const customHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
		console.log('Data state', state);
		handleSubmit?.(event);
	};

	return (
		<SuraComponent.FormValidator handleSubmit={customHandleSubmit} {...args}>
			<SuraComponent.Input
				id='name'
				name='name'
				value={state.name || ''}
				required
				label='Nombre'
				showlabel
				onChange={handleChange}
			/>
			<SuraComponent.Input
				type='number'
				id='age'
				name='age'
				value={state.age || ''}
				required
				label='Edad'
				showlabel
				onChange={handleChange}
			/>

			<SuraComponent.OptionDouble
				id='nacionalidad'
				name='nacionalidad'
				label='Nacionalidad'
				required
				value={state.nacionalidad}
				onChange={handleChange}
				optionsDouble={[
					{ label: 'Salvadoreña', value: JSON.stringify({ label: 'Salvadoreña', value: 'S' }) },
					{ label: 'Extranjera', value: JSON.stringify({ label: 'Extranjera', value: 'E' }) },
				]}
			/>

			<SuraComponent.InputSelect
				inputId='tipoIdentificacion'
				name='tipoIdentificacion'
				label='Tipo de documento'
				showlabel
				required
				isMulti
				placeholder='Seleccionar'
				value={state.tipoIdentificacion}
				actionOnSelectedOption={(data: Array<IItemOptionDouble> | IItemOptionDouble) => {
					handleChange({ currentTarget: { name: 'tipoIdentificacion', value: data, type: 'multiSelect' } });
				}}
				options={optionsTiposDocumentos}
			/>

			<SuraComponent.InputWithMask
				id='numeroDocumento'
				name='numeroDocumento'
				showlabel
				label='Número de documento'
				required
				placeholder='000000-0'
				placeholderChar='_'
				mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
				value={state.numeroDocumento}
				onChange={(event: ChangeEvent<HTMLElement>) => handleChange(event as ChangeEvent<HTMLInputElement>)}
			/>

			<SuraComponent.Calendar
				id='fechaNacimiento'
				name='fechaNacimiento'
				showlabel
				required
				label='Fecha de nacimiento'
				onChange={(name: string, date: Date, event: any) => {
					handleChange({ currentTarget: { name, value: date, type: 'calendar' } });
				}}
				maxDate={new Date()}
				minDate={new Date(1900, 0, 1)}
			/>

			<SuraComponent.DropDownListAutocomplete
				id='ocupacion'
				name='ocupacion'
				label='Ocupación'
				placeholder='Buscar'
				inputId='ocupacion'
				searchApiUrl={`http://localhost:500/api/ActividadOcupacion/searchOcupaciones/`}
				defaultValue={state.ocupacion}
				actionOnSelectedOption={(item: object) =>
					handleChange({ currentTarget: { name: 'ocupacion', value: item, type: 'dropDownListAutocomplete' } })
				}
				noOptionsMessage={(obj: { inputValue: string }): React.ReactNode => <p>No se encontraron coincidencias</p>}
				loadingMessage={(obj: { inputValue: string }): React.ReactNode => <p>Cargando resultados...</p>}
				isClearable={false}
			/>

			<SuraComponent.ToggleSwitch
				id='isCelNacional'
				name='isCelNacional'
				label='¿Su número celular es nacional?'
				checked={state.isCelNacional}
				onChange={handleChange}
				labelAyuda='¡Desactiva esta opción para teléfonos extranjeros!'
				required
			/>

			<SuraComponent.Input
				id='email'
				name='email'
				type='email'
				required
				showlabel
				label='Correo electrónico'
				value={state.email}
				onChange={handleChange}
			/>

			<SuraComponent.TextArea
				id='direccion'
				name='direccion'
				label='Dirección'
				required
				showlabel
				rows={5}
				value={state.direccion}
				onChange={handleChange}
			/>

			<SuraComponent.FileUploader
				idInputFile='files'
				propsButon={{
					label: '+ Agregar documento',
					typeStyle: 'warning',
					buttonClick: (event: React.MouseEvent) => {
						console.log('Función extra que se ejecuta luego de hacer click');
					},
					textUppercase: false,
				}}
				showExtraButton
				extentions={['pdf', 'png', 'jpg']}
				empty='¡No hay documentos cargados!'
				note='Debes agregar en este apartado la imagen de tu documento de identidad o el pdf, que contenga toda tu información, (Salvadoreño únicamente DUI (revés y derecho) y Personas extranjeras: carnet de residente, pasaporte y en caso que aplique NIT).'
				images={state.files}
				imageMaxSize={2000000}
				fileMaxSize={5000000}
				onChange={(list: IItemListImg[]) => {
					handleChange({ currentTarget: { name: 'files', value: list, type: 'dropDownListAutocomplete' } });
				}}
				multiple
				canShowDeleteWhenIdDB
				required
			/>

			<SuraComponent.Button label='Enviar' type='submit' typeStyle='secondary-submit' />
		</SuraComponent.FormValidator>
	);
};

export const FormValidator = Template.bind({});
FormValidator.args = {
	id: 'frmValidator',
	handleSubmit: (event: FormEvent<HTMLFormElement>) => {
		console.log('Función de evento de envió desde props: ', [event.currentTarget, event.target]);
	},
};
