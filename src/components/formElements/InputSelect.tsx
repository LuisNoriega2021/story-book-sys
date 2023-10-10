/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de InputSelect fue escrita por Luis Noriega
 */

import React, { useState } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import { IInputSelectProps } from '../../interfaces/formElements/IInputSelectProps';

import Tooltip from '../modals/Tooltip';
import RenderErrors from '../RenderErrors';

import { WrapperCustomDropDownList, WrapperSelect } from '../../styled/formElements/DropDownListStyled';
import { LabelInput } from '../../styled/formElements/Input';

import IconoAyuda from '../../assets/img/svg/iconAlerta.svg';
import Theme from '../../config/theme';
import { IItemOptionDouble } from '../../interfaces/formElements/IOptionDoubleProps';

const InputSelect: React.FC<IInputSelectProps> = ({
	inputId,
	defaultValue,
	name,
	actionOnSelectedOption,
	noOptionsMessage,
	loadingMessage,
	errors,
	...props
}) => {
	const [focus, setFocus] = useState(false);

	const handleChange = (dataSelected: Array<IItemOptionDouble> | IItemOptionDouble) => {
		actionOnSelectedOption?.(dataSelected);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setFocus(false);
		props.handleBlur?.(event);
	};

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setFocus(true);
		props.handleFocus?.(event);
	};

	return (
		<WrapperCustomDropDownList disabled={props.disabled}>
			{props.label && (
				<LabelInput
					focus={focus}
					hasValue={
						(props.value instanceof Array && props.value?.length > 0 ? true : props.value?.['value']?.length > 0) ||
						props?.placeholder?.length > 0
					}
					htmlFor={inputId}
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
				<Select
					inputId={inputId}
					name={name}
					isLoading={props.loading}
					isClearable={props.clearable}
					isSearchable={props.searchable}
					isDisabled={props.disabled}
					menuIsOpen={props.menuIsOpen}
					isMulti={props.isMulti}
					placeholder={props.placeholder}
					value={props.value}
					options={props.options}
					defaultValue={props.defaultValue}
					onChange={handleChange}
					noOptionsMessage={noOptionsMessage}
					loadingMessage={loadingMessage}
					onFocus={handleFocus}
					onBlur={handleBlur}
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
				/>
				<input
					className='input-hidden-required-sura-components'
					type='text'
					value={
						Array.isArray(props.value) && _.get(props, 'value[0].value', '') !== ''
							? JSON.stringify(props.value)
							: _.isObject(props.value) && _.get(props, 'value.value', '') !== ''
							? JSON.stringify(props.value)
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

export default InputSelect;
