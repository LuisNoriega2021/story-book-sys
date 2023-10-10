/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de OptionDouble fue escrita por Luis Noriega
 */

import React, { useEffect, useState } from 'react';

import Tooltip from '../modals/Tooltip';
import RenderErrors from '../RenderErrors';

import IOptionDoubleProps from '../../interfaces/formElements/IOptionDoubleProps';
import {
	WrapperLabel,
	WrapperOptionDouble,
	WrapperOptionDoubleStyled,
} from '../../styled/formElements/OptionDoubleStyled';

import IconoAyuda from '../../assets/img/svg/iconAlerta.svg';

const OptionDouble: React.FC<IOptionDoubleProps> = React.forwardRef<HTMLDivElement, IOptionDoubleProps>(
	(
		{
			id,
			defaultSelected,
			disabled = false,
			label,
			labelAyuda,
			required = false,
			name,
			optionsDouble = [],
			errors,
			...props
		},
		ref,
	) => {
		const [selectedOption, setSelectedOption] = useState<string>();

		const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
			setSelectedOption(event.target.value);

			props.onChange?.(event);
		};

		useEffect(() => {
			if (props.value) {
				setSelectedOption(props.value.value);
			}
		}, [props?.value?.value]);

		useEffect(() => {
			if (defaultSelected) {
				setSelectedOption(defaultSelected.value);
			}
		}, []);

		return (
			<WrapperOptionDoubleStyled ref={ref} id={id}>
				<WrapperOptionDouble>
					<WrapperLabel>
						<label className='label-option-double'>
							{required && <span style={{ color: 'red' }}>*</span>} {label}
						</label>
						{labelAyuda && (
							<Tooltip message={labelAyuda} overlayStyle={{ width: 250 }} overlayInnerStyle={{}}>
								{<img width={15} src={IconoAyuda} alt='iconoDeAyuda' />}
							</Tooltip>
						)}
					</WrapperLabel>
					<fieldset
						className={`container-all-options ${props?.classListInput?.join(' ') || ''}`}
						aria-disabled={disabled}
					>
						{optionsDouble.map(({ value, label }, i: number) => (
							<label
								aria-disabled={disabled}
								key={i}
								className={`container-option ${selectedOption === value ? 'option-selected' : ''}`}
								htmlFor={`sura-components-radio-${id}${i.toString()}`}
							>
								{label}
								<input
									id={`sura-components-radio-${id}${i.toString()}`}
									name={name}
									type='radio'
									value={value}
									disabled={disabled}
									checked={selectedOption === value}
									onChange={radioHandler}
									required={required}
								/>
							</label>
						))}
					</fieldset>
				</WrapperOptionDouble>
				{errors && <RenderErrors errors={errors} />}
			</WrapperOptionDoubleStyled>
		);
	},
);

export default OptionDouble;
