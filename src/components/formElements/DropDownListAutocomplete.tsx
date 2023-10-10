import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';
import _ from 'lodash';

import {
	IDropDownListAutocompleteProps,
	IDropDownListAutocompleteState,
} from '../../interfaces/formElements/IDropDownListAutocompleteProps';

import Tooltip from '../modals/Tooltip';
import RenderErrors from '../RenderErrors';

import { WrapperCustomDropDownList, WrapperSelect } from '../../styled/formElements/DropDownListStyled';
import { LabelInput } from '../../styled/formElements/Input';

import IconoAyuda from '../../assets/img/svg/iconAlerta.svg';
import Theme from '../../config/theme';

const DropDownListAutocomplete: React.FC<IDropDownListAutocompleteProps> = ({
	id,
	menuIsOpen,
	defaultOptions,
	placeholder,
	inputId,
	defaultValue,
	searchApiUrl,
	name,
	setInputValue,
	actionOnSelectedOption,
	mapOptionsToValuesCallback,
	noOptionsMessage,
	loadingMessage,
	errors,
	...props
}) => {
	const [state, setState] = useState<IDropDownListAutocompleteState>({
		selectedOption: defaultValue || {},
		inputValue: '',
	});
	const [focus, setFocus] = useState(false);

	const handleChange = (selectedOption: object) => {
		setState({ ...state, selectedOption });

		actionOnSelectedOption?.(selectedOption);
	};

	const mapOptionsToValues = (options: Array<object>) => {
		return options.map((option: object) => ({
			value: option['id'],
			label: option['value'],
		}));
	};

	const mapDefaultOptions = () => {
		return [{ value: '0', label: 'Escribe para buscar en la lista' }];
	};

	const getOptions = (inputValue: any, callback: any) => {
		if (!inputValue) {
			return callback(mapDefaultOptions());
		}

		let fetchURL = searchApiUrl + inputValue;

		fetch(fetchURL).then((response) => {
			response.json().then((data) => {
				const results = data.ReturnData;
				if (mapOptionsToValuesCallback) callback(mapOptionsToValuesCallback(results));
				else callback(mapOptionsToValues(results));
			});
		});
	};

	const onFocus = (element: any) => {
		setFocus(true);
	};

	const handleBlur = (element: any) => {
		setFocus(false);
	};

	// Le aplica un retraso de tiempo a la función
	const debouncedSearch = React.useRef(debounce(getOptions, 500)).current;

	const handleInputChange = (inputValue: string) => {
		setInputValue?.(inputValue);
		setState({ ...state, inputValue });
	};

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	useEffect(() => {
		if (defaultValue) setState({ ...state, selectedOption: defaultValue });
	}, [defaultValue]);

	return (
		<WrapperCustomDropDownList disabled={props.disabled}>
			{props.label && (
				<LabelInput
					focus={focus}
					hasValue={state.selectedOption?.['value']?.length > 0 || props?.placeholder?.length > 0}
					htmlFor={id}
					canPress={props.labelAyuda && props.labelAyuda.length > 0}
				>
					{props.required && <span style={{ color: 'red' }}>*</span>} {props.label}
					{props.labelAyuda && (
						<Tooltip message={props.labelAyuda} overlayStyle={{ width: 250 }} overlayInnerStyle={{}}>
							{<img width={14} style={{ marginLeft: 5 }} src={IconoAyuda} alt='iconoDeAyuda' />}
						</Tooltip>
					)}
				</LabelInput>
			)}
			<WrapperSelect focus={focus}>
				<AsyncSelect
					isClearable
					cacheOptions
					inputId={inputId}
					name={name}
					value={state.selectedOption}
					defaultOptions={defaultOptions}
					loadOptions={debouncedSearch}
					placeholder={placeholder}
					onChange={handleChange}
					onInputChange={handleInputChange}
					menuIsOpen={menuIsOpen}
					noOptionsMessage={noOptionsMessage}
					loadingMessage={loadingMessage}
					onFocus={onFocus}
					onBlur={handleBlur}
					isDisabled={props.disabled}
					className={`basic-multi-select-sura-components ${props?.classListInput?.join(' ') || ''}`}
					classNamePrefix='react-select'
					styles={{
						container: (provided, state) => ({
							...provided,
							fontFamily: 'Barlow',
							fontSize: '14px',
						}),
						dropdownIndicator: (provided, state) => ({
							...provided,
							display: 'none',
						}),
						indicatorSeparator: (provided, state) => ({
							...provided,
							position: 'relative',
							right: '45px',
						}),
						loadingIndicator: (provided, state) => ({
							...provided,
							position: 'relative',
							right: '45px',
						}),
						control: (provided, state) => ({
							...provided,
							border: `1px solid ${
								state.isFocused || state.menuIsOpen
									? Theme.AZUL.BORDERS
									: errors && Object.keys(errors).length > 0
									? Theme.OTROS.ERRORINPUTS
									: Theme.AZUL.ACERO_CLARO
							}`,
							borderRadius: '30px',
							boxShadow: 'none',
							':hover': {
								border: `1px solid ${
									state.isFocused || state.menuIsOpen
										? Theme.AZUL.BORDERS
										: errors && Object.keys(errors).length > 0
										? Theme.OTROS.ERRORINPUTS
										: Theme.AZUL.ACERO_CLARO
								}`,
							},
							minHeight: 'auto',
						}),
						input: (provided, state) => ({
							...provided,
							margin: '0',
							padding: '0',
						}),
						singleValue: (provided, state) => ({
							...provided,
							margin: '0',
						}),
						valueContainer: (provided, state) => ({
							...provided,
							padding: '8px 0px 8px 15px !important',
						}),
						menu: (provided, state) => ({
							...provided,
							zIndex: 2,
						}),
					}}
					{...props}
				/>
				<input
					className='input-hidden-required-sura-components'
					type='text'
					value={
						_.isObject(state.selectedOption) && _.get(state.selectedOption, 'value', '') !== ''
							? JSON.stringify(state.selectedOption)
							: undefined
					}
					tabIndex={-1}
					autoComplete='off'
					required={props.required}
					disabled={props.disabled}
				/>
			</WrapperSelect>
			{errors && <RenderErrors errors={errors} />}
		</WrapperCustomDropDownList>
	);
};

export default DropDownListAutocomplete;
