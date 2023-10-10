import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as DateFns from 'date-fns';

import SuraComponent from '../../src';
import { regexDUI } from '../../src/helpers/validator';
import { IDataStateInputs } from '../../src/interfaces';
import { useEffect } from '@storybook/addons';

export default {
	title: 'Components/Forms/Form',
	component: SuraComponent.Form,
} as ComponentMeta<typeof SuraComponent.Form>;

const Template: ComponentStory<typeof SuraComponent.Form> = (args) => <SuraComponent.Form {...args} />;
const TemplateState: ComponentStory<typeof SuraComponent.Form> = (args) => {
	const [state, setState] = useState<IDataStateInputs>({
		idNombreFrm: '',
		idApellidoFrm: '',
		idEdadFrm: 0,
	});
	const [count, setCount] = useState<number>(0);

	console.log('TemplateState');

	useEffect(() => {
		console.log('count', count);

		setCount(count + 1);
	}, [state]);

	return (
		<>
			<p>Count: {count}</p>
			<div
				style={{
					padding: 10,
				}}
			>
				<input
					name='idNombre'
					value={state.idNombreFrm}
					onChange={(e: any) =>
						setState({
							...state,
							[e.target.name + 'Frm']: e.target.value,
						})
					}
					placeholder='Nombre'
				/>
				<input
					name='idApellido'
					value={state.idApellidoFrm}
					onChange={(e: any) =>
						setState({
							...state,
							[e.target.name + 'Frm']: e.target.value,
						})
					}
					placeholder='Apellido'
				/>
				<input
					name='idEdad'
					value={state.idEdadFrm}
					type='number'
					onChange={(e: any) =>
						setState({
							...state,
							[e.target.name + 'Frm']: e.target.value,
						})
					}
				/>
			</div>

			<SuraComponent.Form
				id='idFormToValues'
				name='Formulario Basico'
				tipo={{
					id: 'idFormularioDatosGenerales',
					tipo: 'onlyForm',
					activo: true,
				}}
				propiedades={{
					id: 0,
					name: 'idFormToValues',
					descripcion: 's',
					campos: [
						{
							id: 'idNombreFrm',
							tipoCampo: {
								tipo: 'text',
								propiedades: {
									name: 'idNombreFrm',
									type: 'text',
								},
							},
							reglas: [],
						},
						{
							id: 'idApellidoFrm',
							tipoCampo: {
								tipo: 'text',
								propiedades: {
									name: 'idApellidoFrm',
									showlabel: true,
									label: 'Apellido',
									help: 'Ingrese su apellido',
									required: true,
								},
							},
							reglas: [
								{
									mensaje: 'El campo es requerido',
									tipoRegla: 'required',
									regla: '*',
								},
								{
									mensaje: 'Mínimo 3 caracteres',
									tipoRegla: 'minLength',
									regla: 3,
								},
							],
						},
						{
							id: 'idEdadFrm',
							tipoCampo: {
								tipo: 'number',
								propiedades: {
									name: 'idEdadFrm',
								},
							},
							reglas: [],
						},
					],
				}}
				submit
				onChange={(data: object) => {
					console.log('change => ', data);
					setState(data as IDataStateInputs);
				}}
				onSubmit={(data: object) => console.log('submit => ', data)}
				onFinish={(data: object) => console.log('finish => ', data)}
				values={state as IDataStateInputs}
				{...args}
			/>
		</>
	);
};

export const Form = Template.bind({});
export const FormFunctionValidAndFinish = Template.bind({});
export const FormDatosGeneralesButtonSubmit = Template.bind({});
export const FormDatosGeneralesCustomButtonSubmit = Template.bind({});
export const FormDatosGeneralesDefaultValues = Template.bind({});

export const FormDatosGeneralesWithValues = TemplateState.bind({});

const camposFormularioGeneral = [
	{
		id: 'tipoIdentificacion',
		tipoCampo: {
			tipo: 'dropDownList',
			propiedades: {
				id: 'tipoIdentificacion',
				name: 'tipoIdentificacion',
				label: 'Tipo de documento',
				disabled: false,
				opciones: [
					{ id: 1, value: 'DUI' },
					{ id: 2, value: 'Pasaporte' },
					{ id: 3, value: 'Carnet de residente' },
				],
				placeholder: 'Seleccionar',
				required: true,
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
		],
	},
	{
		id: 'numeroDocumento',
		tipoCampo: {
			tipo: 'maskInput',
			propiedades: {
				id: 'numeroDocumento',
				name: 'numeroDocumento',
				showlabel: true,
				label: 'Número de documento',
				type: 'text',
				placeholder: '000000-0',
				placeholderChar: '_',
				touched: true,
				required: true,
				disabled: false,
				mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/], // Array<string | RegExp> | false
				className: 'sura-form-control',
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
		],
		reglasAnidadas: [
			{
				mensaje: 'Selecciona el tipo de documento',
				tipoRegla: 'condicion',
				regla: '*',
				campoAnidado: 'tipoIdentificacion',
				validacion: 'required',
			},
			{
				mensaje: 'Formato de DUI invalido',
				tipoRegla: 'condicion',
				regla: regexDUI,
				campoAnidado: 'tipoIdentificacion',
				validacion: '=|1',
			},
		],
	},
	{
		id: 'nombres',
		tipoCampo: {
			tipo: 'text',
			propiedades: {
				id: 'nombres',
				name: 'nombres',
				showlabel: true,
				label: 'Nombres',
				required: true,
				type: 'text',
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
			{
				mensaje: 'Solo se permiten letras',
				tipoRegla: 'onlyletters',
				regla: '*',
			},
			{
				mensaje: 'Máximo 75 letras',
				tipoRegla: 'maxLength',
				regla: 75,
			},
			{
				mensaje: 'La primer letra de cada palabra debe de ser mayúscula',
				tipoRegla: 'firstLetterOfUppercaseWord',
				regla: '*',
			},
		],
	},
	{
		id: 'apellidos',
		tipoCampo: {
			tipo: 'text',
			propiedades: {
				id: 'apellidos',
				name: 'apellidos',
				showlabel: true,
				label: 'Apellidos',
				required: true,
				type: 'text',
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
			{
				mensaje: 'Solo se permiten letras',
				tipoRegla: 'onlyletters',
				regla: '*',
			},
			{
				mensaje: 'Máximo 75 letras',
				tipoRegla: 'maxLength',
				regla: 75,
			},
			{
				mensaje: 'La primer letra de cada palabra debe de ser mayúscula',
				tipoRegla: 'firstLetterOfUppercaseWord',
				regla: '*',
			},
		],
	},
	{
		id: 'fechaNacimiento',
		tipoCampo: {
			tipo: 'calendar',
			propiedades: {
				id: 'fechaNacimiento',
				name: 'fechaNacimiento',
				showlabel: true,
				label: 'Fecha de nacimiento',
				required: true,
				disabled: false,
				type: 'calendar',
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
			{
				mensaje: 'Fecha maxima ' + DateFns.format(new Date(), 'dd/MM/yyyy'),
				tipoRegla: 'dateMax',
				regla: new Date(),
			},
			{
				mensaje: 'Fecha minima ' + DateFns.format(new Date(1920, 0, 1), 'dd/MM/yyyy'),
				tipoRegla: 'dateMin',
				regla: new Date(1920, 0, 1),
			},
		],
	},
	{
		id: 'personaPoliticaExpuesta',
		tipoCampo: {
			tipo: 'optionDouble',
			propiedades: {
				id: 'personaPoliticaExpuesta',
				label: '¿Eres una persona políticamente expuesta?',
				labelAyuda:
					'De conformidad al Art. 9-B de la ley contra el lavado de dinero y activos, ocupa o ha ocupado usted o algún familiar o accionista un puesto público de conformidad a la ley contra el lavado de dinero',
				name: 'personaPoliticaExpuesta',
				disabled: false,
				required: true,
				optionsDouble: [
					{ value: 'S', label: 'Sí' },
					{ value: 'N', label: 'No' },
				],
				type: 'optionDouble',
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
		],
	},
	{
		id: 'mismoPagador',
		tipoCampo: {
			tipo: 'optionDouble',
			propiedades: {
				id: 'mismoPagador',
				label: '¿Eres el mismo pagador?',
				labelAyuda: 'Es importante que el contratante y asegurado de la póliza sea el mismo, de ser así, marca Sí',
				name: 'mismoPagador',
				disabled: false,
				required: true,
				optionsDouble: [
					{ value: 'S', label: 'Sí' },
					{ value: 'N', label: 'No' },
				],
				type: 'optionDouble',
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
		],
	},
];

const camposFormularioGeneralExtras = [
	// {
	// 	id: 'cesionarios',
	// 	tipoCampo: {
	// 		tipo: 'dropDownListAutocomplete',
	// 		propiedades: {
	// 			id: 'cesionarios',
	// 			name: 'cesionarios',
	// 			defaultOptions: [],
	// 			placeholder: 'Buscar cesionario',
	// 			defaultValue: {},
	// 			searchApiUrl: 'http://localhost:5000/api/cesionario/',
	// 			isClearable: false,
	// 			disabled: false,
	// 			label: 'Banco',
	// 			required: true,
	// 			labelAyuda:
	// 				'Debes buscar el banco que desea añadir como cesionario y seleccionarlo de los resultados de la búsqueda',
	// 			classListInput: [],
	// 			// actionOnSelectedOption: (value: object) => console.log('actionOnSelectedOption', value),
	// 			mapOptionsToValues: (options: Array<object>) =>
	// 				options.map((option: object) => ({
	// 					value: option['id'],
	// 					label: option['value'],
	// 				})),
	// 			noOptionsMessage: (obj: { inputValue: string }) => <p style={{ margin: 0 }}>No hay opciones disponibles</p>,
	// 			loadingMessage: (obj: { inputValue: string }) => <p style={{ margin: 0 }}>Buscando cesionarios...</p>,
	// 		},
	// 	},
	// 	reglas: [
	// 		{
	// 			mensaje: 'El campo es requerido',
	// 			tipoRegla: 'required',
	// 			regla: '*',
	// 		},
	// 	],
	// },
];

const camposFormularioBasico = [
	{
		id: 'idNombre',
		tipoCampo: {
			tipo: 'text',
			propiedades: {
				name: 'idNombre',
				showlabel: true,
				label: 'Nombre',
				help: 'Ingrese su nombre',
				required: true,
				type: 'text',
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
			{
				mensaje: 'Mínimo 3 caracteres',
				tipoRegla: 'minLength',
				regla: 3,
			},
		],
	},
	{
		id: 'idApellido',
		tipoCampo: {
			tipo: 'text',
			propiedades: {
				name: 'idApellido',
				showlabel: true,
				label: 'Apellido',
				help: 'Ingrese su apellido',
				required: true,
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
			{
				mensaje: 'Mínimo 3 caracteres',
				tipoRegla: 'minLength',
				regla: 3,
			},
		],
	},
	{
		id: 'idEdad',
		tipoCampo: {
			tipo: 'number',
			propiedades: {
				name: 'idEdad',
				showlabel: true,
				label: 'Edad',
				help: 'Ingrese su edad',
				min: 18,
				max: 120,
				value: 18,
				required: true,
			},
		},
		reglas: [
			{
				mensaje: 'El campo es requerido',
				tipoRegla: 'required',
				regla: '*',
			},
			{
				mensaje: 'Mínimo 18 años',
				tipoRegla: 'min',
				regla: 18,
			},
			{
				mensaje: 'Máximo 120 años',
				tipoRegla: 'max',
				regla: 120,
			},
		],
	},
];

Form.args = {
	id: 'idFormBasic',
	name: 'Formulario Basico',
	tipo: {
		id: 'idFormularioDatosGenerales',
		tipo: 'onlyForm',
		activo: true,
	},
	propiedades: {
		id: 'idDetalleFormularioBasico',
		name: 'DetalleFormularioBasico',
		descripcion: 'Recoleccion de datos basicos',
		campos: camposFormularioBasico,
	},
	submit: true,
	onSubmit: (data: object) => console.log('submit => ', data),
	onFinish: (data: object) => console.log('finish => ', data),
};

FormFunctionValidAndFinish.args = {
	id: 'idFormBasic',
	name: 'Formulario Basico',
	tipo: {
		id: 'idFormularioDatosGenerales',
		tipo: 'onlyForm',
		activo: true,
	},
	propiedades: {
		id: 'idDetalleFormularioBasico',
		name: 'DetalleFormularioBasico',
		descripcion: 'Recoleccion de datos basicos',
		campos: camposFormularioBasico,
	},
	submit: false,
	onValid: (valid: boolean) => console.log('formvalid => ', valid ? 'SI' : 'NO'),
	onFinish: (data: object) => console.log('finish => ', data),
};

FormDatosGeneralesButtonSubmit.args = {
	id: 'formDatosGenerales',
	name: 'datosGenerales',
	tipo: {
		id: 'idFormularioDatosGenerales',
		tipo: 'onlyForm',
		activo: true,
	},
	propiedades: {
		id: 'idDetalleFormularioDatosGenerales',
		name: 'DetalleFormularioDatosGenerales',
		descripcion: 'Recolección de los datos generales para la suscripción SUSI',
		campos: camposFormularioGeneral,
	},
	submit: true,
	onSubmit: (data: object) => console.log('submit with default button and function onSubmit => ', data),
};

FormDatosGeneralesCustomButtonSubmit.args = {
	id: 'formDatosGenerales',
	name: 'datosGenerales',
	tipo: {
		id: 'idFormularioDatosGenerales',
		tipo: 'onlyForm',
		activo: true,
	},
	propiedades: {
		id: 'idDetalleFormularioDatosGenerales',
		name: 'DetalleFormularioDatosGenerales',
		descripcion: 'Recolección de los datos generales para la suscripción SUSI',
		campos: [...camposFormularioGeneral, ...camposFormularioGeneralExtras],
	},
	submit: <SuraComponent.Button type='submit' typeStyle='primary-submit' label='Enviar' height={30} width={80} />,
	onSubmit: (data: object) => console.log('submit with custom button and function onSubmit => ', data),
};

FormDatosGeneralesDefaultValues.args = {
	id: 'formDatosGenerales',
	name: 'datosGenerales',
	tipo: {
		id: 'idFormularioDatosGenerales',
		tipo: 'onlyForm',
		activo: true,
	},
	propiedades: {
		id: 'idDetalleFormularioDatosGenerales',
		name: 'DetalleFormularioDatosGenerales',
		descripcion: 'Recolección de los datos generales para la suscripción SUSI',
		campos: camposFormularioGeneral,
	},
	defaultData: {
		tipoIdentificacion: '2',
		numeroDocumento: '45589-5549-6-445',
		nombres: 'Daniel Alexander',
		apellidos: 'Elías Ardón',
		fechaNacimiento: '13/11/1999',
		personaPoliticaExpuesta: 'N',
		mismoPagador: 'S',
	},
	submit: true,
	onSubmit: (data: object) => console.log('submit with default button and default values onSubmit => ', data),
};
