/**
 * @author                 Ronald Gutierrez <rvillanueva@asesuisa.com>
 * @version                               1.1
 *
 * History
 * v1.0 – Se creo el componente
 * v1.1 – Se colocaron las interfaces en las carpetas respectivas
 * ----
 * La primera versión de ToggleSwitch fue escrita por Ronald Gutierrez
 * v1.1 Luis Noriega, importaciones de interfaces cambio
 */

import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import IToggleSwitch from '../../interfaces/formElements/IToggleSwitch';

import Tooltip from '../modals/Tooltip';

import Theme from '../../config/theme';
import IconoAyuda from '../../assets/img/svg/iconAlerta.svg';
import { CustomInput, Help } from '../../styled/formElements/Input';

/**
 * Input HTML con formato SURA, icono al lado izquierdo y label
 */
const ToggleSwitch: FC<IToggleSwitch> = ({
	id,
	name,
	label,
	type = 'checkbox',
	showlabel = false,
	checked = false,
	help,
	labelAyuda,
	...props
}) => {
	const [isChecked, setIsChecked] = useState(checked);
	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
		isChecked ? setIsChecked(false) : setIsChecked(true);
	};

	return (
		<>
			<StyledWrapperInput>
				<WrapperContentInput>
					<label htmlFor={id} className='label-checkbox'>
						{label}
						{labelAyuda && (
							<Tooltip message={labelAyuda} overlayStyle={{ width: 250 }} overlayInnerStyle={{}}>
								{<img width={14} style={{ marginLeft: 5 }} src={IconoAyuda} alt='iconoDeAyuda' />}
							</Tooltip>
						)}
					</label>
					<label className={`switchBtn ${props?.classListInput?.join(' ') || ''}`}>
						<CustomInput
							required={props.required}
							type='checkbox'
							name={name}
							id={id}
							checked={isChecked}
							onClick={handleClick}
							{...props}
						/>
						<div className='slide round'></div>
					</label>
				</WrapperContentInput>
				{help && <Help>{help}</Help>}
			</StyledWrapperInput>
		</>
	);
};

const StyledWrapperInput = styled.div`
	display: flex;
	flex-direction: column;

	${Theme.Desktop.LabelForm}

	.label-checkbox {
		color: ${Theme.AZUL.ACERO_CLARO};
		margin-right: 1rem;
		display: flex;
		align-items: center;
	}
	.switchBtn {
		position: relative;
		display: inline-block;
		width: 32px;
		height: 12px;
	}
	.switchBtn input {
		// display: none;
		border: 0;
		color: transparent;
		background-color: transparent;
		top: 0;
		left: 0;
		width: 1px;
		z-index: 0;

		:focus-visible {
			outline: -webkit-focus-ring-color auto 0px;
			outline-offset: 0px;
		}
	}
	.slide {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		padding: 1px;
		color: ${Theme.AZUL.CLARO};
		z-index: 1;
	}
	.slide:before {
		position: absolute;
		content: '';
		width: 20px;
		height: 20px;
		left: 0px;
		bottom: -4px;
		background: white;
		top: calc(50% - 20px / 2);
		-webkit-transition: 0.4s;
		transition: 0.4s;
		box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.237602);
	}
	input:checked + .slide {
		background-color: #4ec3e0;
		color: white;
		padding-left: 20px;
	}
	input:focus + .slide {
		box-shadow: 0 0 1px #01aeed;
	}
	input:checked + .slide:before {
		-webkit-transform: translateX(15px);
		-ms-transform: translateX(15px);
		transform: translateX(15px);
		right: 15px;
		background: #00aec7;
	}
	.slide.round {
		border-radius: 30px;
	}
	.slide.round:before {
		border-radius: 60%;
	}
`;

const WrapperContentInput = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1rem 0 0 0;
`;

export default ToggleSwitch;
