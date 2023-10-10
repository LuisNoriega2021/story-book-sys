/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Form fue escrita por Luis Noriega
 */

import React, { useState, useEffect, forwardRef } from 'react';
import * as DateFns from 'date-fns';

import Button from '../buttons/Button';
import Input from '../formElements/Input';
import Calendar from '../../components/formElements/Calendar';
import DropDownList from '../../components/formElements/DropDownList';
import OptionDouble from '../../components/formElements/OptionDouble';
import InputWithMask from '../../components/formElements/InputWithMask';
import YearPicker from '../../components/formElements/YearPicker';
import TextArea from '../../components/formElements/TextArea';

import StyledForm, { WrapperButtonSubmit } from '../../styled/Form/Form';

import IFormProps, { ICampo, IDataStateInputs, IDetalleFormulario } from '../../interfaces/forms/IFormProps';
import { IDataFieldsState, IErrorsField, IErrorsFieldsState } from '../../interfaces/forms/IField';
import { InputType } from '../../constants/types';
import { regexLettersSpacesTildes, validFirstLetterUpperToWord } from '../../helpers/validator';
import { IItemOptionDouble } from '../../interfaces/formElements/IOptionDoubleProps';
import { IOptionDropDownList } from '../../interfaces/formElements/IDropDownListProps';

const Form: React.FC<IFormProps> = forwardRef(
	({ id, name, tipo, propiedades, ...props }: IFormProps, ref?: React.Ref<HTMLFormElement>) => {
		const [data, setData] = useState<IDataStateInputs>(props.defaultData || props.values || {});
		const [fields, setFields] = useState<IDataFieldsState>({});
		const [errors, setErrors] = useState<IErrorsFieldsState>({});
		const [visitedFields, setVisitedFields] = useState<{ [key: string]: boolean }>({});
		const { tipo: typeForm } = tipo;

		const fieldTestRules = (value: string, field: ICampo): [boolean, IErrorsField] => {
			const fieldErrors: IErrorsField = {};
			let isValid: boolean = false;

			const arrValidates = field.reglas.map(({ tipoRegla, regla, mensaje }) => {
				let isTestValid = false;

				switch (tipoRegla) {
					case 'required':
						isTestValid = value.length > 0;
						break;
					case 'minLength':
						isTestValid = value.length >= Number(regla);
						break;
					case 'maxLength':
						isTestValid = value.length <= Number(regla);
						break;
					case 'min':
						isTestValid = Number(value) >= Number(regla);
						break;
					case 'max':
						isTestValid = Number(value) <= Number(regla);
						break;
					case 'onlyletters':
						isTestValid = regexLettersSpacesTildes.test(value);
						break;
					case 'firstLetterOfUppercaseWord':
						isTestValid = validFirstLetterUpperToWord(String(value));
						break;
					case 'dateMax':
						const dateSplitMax = (value as string).split('/');

						if (dateSplitMax.length > 0) {
							const dateValidate = new Date(
								Number(dateSplitMax[2]),
								Number(dateSplitMax[1]) - 1,
								Number(dateSplitMax[0]),
							);

							isTestValid =
								DateFns.compareDesc(
									dateValidate,
									typeof regla === 'string' ? DateFns.parseISO(regla) : (regla as unknown as Date),
								) >= 0;
						} else {
							isTestValid = false;
						}
						break;
					case 'dateMin':
						const dateSplitMin = (value as string).split('/');

						if (dateSplitMin.length > 0) {
							const dateValidate = new Date(
								Number(dateSplitMin[2]),
								Number(dateSplitMin[1]) - 1,
								Number(dateSplitMin[0]),
							);

							isTestValid = DateFns.compareAsc(dateValidate, regla as unknown as Date) >= 0;
						} else {
							isTestValid = false;
						}
						break;
				}

				if (!isTestValid) fieldErrors[tipoRegla] = { tipoRegla, regla, mensaje };
				else if (isTestValid && fieldErrors[tipoRegla]) delete fieldErrors[tipoRegla];

				return isTestValid;
			});

			const arrValidatesAnid = (field.reglasAnidadas || []).map(
				({ tipoRegla, regla, mensaje, campoAnidado, validacion }) => {
					let isTestValid = false;

					switch (tipoRegla) {
						case 'condicion':
							if (validacion === 'required') {
								isTestValid = (data?.[campoAnidado] as string)?.length > 0;
							} else if (typeof validacion === 'string' && (validacion as string).includes('=')) {
								const [, valueValidador] = validacion.split('|');

								if (data?.[campoAnidado] === valueValidador) {
									isTestValid = (regla as RegExp).test(value);
								} else {
									isTestValid = true;
								}
							}
							break;
					}

					if (!isTestValid)
						fieldErrors[tipoRegla + validacion] = { tipoRegla, regla, mensaje, campoAnidado, validacion };
					else if (isTestValid && fieldErrors[tipoRegla + validacion]) delete fieldErrors[tipoRegla + validacion];

					return isTestValid;
				},
			);

			isValid = [...arrValidates, ...arrValidatesAnid].every((valid) => valid === true);

			return [isValid, fieldErrors];
		};

		const validateField = (idField: string, event: any): [boolean, IErrorsField] => {
			const field = fields[idField];

			if (field) {
				const value = event.target.value || '';
				return fieldTestRules(value, field);
			}

			return [false, {}];
		};

		const handleChange =
			(inputName: string, inputId?: string) =>
			(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
				let valueTransform = fields[inputId].tipoCampo.propiedades.applyTransformToValue
					? fields[inputId].tipoCampo.propiedades.applyTransformToValue(event.target.value)
					: event.target.value;

				setData({ ...data, [inputName]: valueTransform });
			};

		const handleBlur =
			(inputName: string, inputId?: string) =>
			(event: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
				if (!visitedFields[inputName]) setVisitedFields({ ...visitedFields, [inputName]: true });
				handleChange(inputName, inputId)(event as unknown as React.ChangeEvent<HTMLInputElement>);
			};

		const validateAllFields = (): boolean => {
			const fieldsValidates: boolean[] = [];
			const fieldsValidatesErros: IErrorsFieldsState = {};

			for (const key in fields) {
				if (Object.prototype.hasOwnProperty.call(fields, key)) {
					const {
						id,
						tipoCampo: { propiedades },
					} = fields[key];
					const [isValid, fieldErrors] = validateField(id, { target: { value: data?.[propiedades.name] } });

					fieldsValidates.push(isValid);
					fieldsValidatesErros[id] = fieldErrors;
				}
			}

			setErrors(fieldsValidatesErros);

			return fieldsValidates.every((valid) => valid === true) && fieldsValidates.length > 0;
		};

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();

			const allFieldsPastValidated = validateAllFields();
			allFieldsPastValidated && props.onSubmit?.(data);

			// TODO: validar si es necesario dejar el onFinish o solo en el efecto
			// if (props.onFinish && validateAllFields()) props.onFinish?.(data);
		};

		useEffect(() => {
			setData(props.values);
		}, [props.values]);

		useEffect(() => {
			props.onChange?.(data);
			const allFieldsPastValidated = validateAllFields();
			props.onValid?.(allFieldsPastValidated);

			if (allFieldsPastValidated) props.onFinish?.(data);
		}, [data]);

		useEffect(() => {
			if (typeForm === 'onlyForm') {
				const objectFromArray: IDataFieldsState = {};
				const onlyFields = (propiedades as IDetalleFormulario).campos;
				const allFields = onlyFields.reduce((acc: IDataFieldsState, { id, ...restProps }: ICampo) => {
					return { ...acc, [id]: { ...restProps, id } };
				}, objectFromArray);

				if (props.defaultData) setData(props.defaultData);

				setFields(allFields);
			}
		}, []);

		return (
			<StyledForm id={id} name={name} ref={ref} onSubmit={handleSubmit}>
				{typeForm === 'onlyForm'
					? (propiedades as IDetalleFormulario).campos.map(({ id, tipoCampo: { tipo, propiedades } }, index: number) =>
							tipo === 'calendar' ? (
								<Calendar
									key={index}
									id={id}
									name={propiedades.name}
									defaultValue={(data?.[id] as string) || ''}
									onChange={(name: string, date: Date, event: any) => {
										event.target.value = DateFns.format(date, 'dd/MM/yyyy');
										handleChange(propiedades.name, id)(event);
									}}
									onBlur={(name: string, e: any) => handleBlur(propiedades.name, id)(e)}
									errors={visitedFields[propiedades.name] && errors[id]}
									{...propiedades}
								/>
							) : tipo === 'yearPicker' ? (
								<YearPicker
									key={index}
									id={id}
									name={propiedades.name}
									onChange={(name: string, date: Date, event: any) => {
										event.target.value = date.getFullYear().toString();
										handleChange(propiedades.name, id)(event);
									}}
									value={data?.[id] ? (data[id] as number) : undefined}
									onBlur={(name: string, e: any) => handleBlur(propiedades.name, id)(e)}
									errors={visitedFields[propiedades.name] && errors[id]}
									{...propiedades}
								/>
							) : tipo === 'dropDownList' ? (
								<DropDownList
									key={index}
									id={id}
									name={propiedades.name}
									value={propiedades.opciones.find((option: IOptionDropDownList) => String(option.id) === data?.[id])}
									onChange={handleChange(propiedades.name, id)}
									onBlur={
										handleBlur(propiedades.name, id) as (event: React.FocusEventHandler<HTMLSelectElement>) => void
									}
									errors={visitedFields[propiedades.name] && errors[id]}
									{...propiedades}
								/>
							) : tipo === 'optionDouble' ? (
								<OptionDouble
									key={index}
									id={id}
									name={propiedades.name}
									value={propiedades.optionsDouble.find(({ value }: IItemOptionDouble) => value === data?.[id])}
									onChange={handleChange(propiedades.name, id)}
									errors={visitedFields[propiedades.name] && errors[id]}
									{...propiedades}
								/>
							) : tipo === 'maskInput' ? (
								<InputWithMask
									key={index}
									id={id}
									name={propiedades.name}
									type={propiedades.type as InputType}
									value={data?.[id] ? (data[id] as string) : ''}
									mask={propiedades.mask ? propiedades.mask : false}
									onChange={handleChange(propiedades.name, id) as (event: React.ChangeEvent<HTMLElement>) => void}
									onBlur={handleBlur(propiedades.name, id) as unknown as (event: React.FocusEvent<HTMLElement>) => void}
									errors={visitedFields[propiedades.name] && errors[id]}
									{...propiedades}
								/>
							) : tipo === 'textArea' ? (
								<TextArea
									key={index}
									id={id}
									type={tipo as InputType}
									name={propiedades.name}
									value={data?.[id] || ''}
									onChange={handleChange(propiedades.name, id)}
									onBlur={
										handleBlur(propiedades.name, id) as unknown as (
											event: React.FocusEventHandler<HTMLTextAreaElement>,
										) => void
									}
									errors={visitedFields[propiedades.name] && errors[id]}
									{...propiedades}
								/>
							) : (
								<Input
									key={index}
									id={id}
									type={tipo as InputType}
									name={propiedades.name}
									value={data?.[id] || ''}
									onChange={handleChange(propiedades.name, id)}
									onBlur={
										handleBlur(propiedades.name, id) as (event: React.FocusEventHandler<HTMLInputElement>) => void
									}
									errors={visitedFields[propiedades.name] && errors[id]}
									{...propiedades}
								/>
							),
					  )
					: typeForm === 'paso'
					? 'Formulario de paso'
					: typeForm === 'tabs' && 'Formulario tipo tabs'}

				{props.submit && (
					<WrapperButtonSubmit>
						{typeof props.submit === 'boolean' ? (
							<Button type='submit' label='Enviar' height={30} width={80} />
						) : (
							props.submit
						)}
					</WrapperButtonSubmit>
				)}

				{props.buttonSubmitHidden && (
					<Button
						style={{ display: 'none' }}
						hidden
						id={`${id}ButtonSubmitHidden`}
						type='submit'
						label='Enviar'
						height={10}
						width={10}
					/>
				)}
			</StyledForm>
		);
	},
);

export default Form;
