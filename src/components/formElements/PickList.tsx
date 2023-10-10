/**
 * @author                 Ronald Gutierrez <rvillanueva@asesuisa.com>
 * @version                               1.1
 *
 * History
 * v1.0 – Se creo el componente
 * v1.1 – Se colocaron las interfaces en las carpetas respectivas
 * ----
 * La primera versión de PickList fue escrita por Ronald Gutierrez
 * v1.1 Luis Noriega, importaciones de interfaces cambio
 */

import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components';

import Theme from '../../config/theme';
import IPickList, { IPickListItem } from '../../interfaces/formElements/IPickList';

import { Help, WrapperIconAfter, WrapperIconBefore } from '../../styled/formElements/Input';

/**
 * Input HTML con formato SURA, icono al lado izquierdo y label
 */
const PickList: FC<IPickList> = ({
	id,
	name,
	label,
	iconBefore,
	iconAfter,
	type = 'checkbox',
	showlabel = false,
	help,
	elementsPick = [],
	onChange,
	removeDisclouser,
	startDisclouser,
	disabled = false,
	...props
}) => {
	const [elementsList, setElementsList] = useState<IPickListItem[]>([]);

	const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
		//isChecked ? setIsChecked(false) : setIsChecked(true);
		const e = event.target as HTMLInputElement;
		let copyElements = [...elementsList];

		let elementEditIndex = copyElements.findIndex((element) => element.id === e.id);

		if (elementEditIndex >= 0) {
			copyElements[elementEditIndex].checked = e.checked;
			e.checked ? startDisclouser(copyElements[elementEditIndex]) : removeDisclouser(copyElements[elementEditIndex]);
		}

		setElementsList(copyElements);
	};

	useEffect(() => {
		setElementsList(elementsPick);
	}, []);

	useEffect(() => {
		onChange(elementsList);
	}, [elementsList]);

	return (
		<>
			<WrapperInput>
				<WrapperContentInput>
					<label htmlFor={id} className='label-checkbox'>
						{label}
					</label>
					{iconBefore && <WrapperIconBefore>{iconBefore}</WrapperIconBefore>}
					{elementsList.length > 0 &&
						elementsList.map((element: IPickListItem, index) => (
							<div className='picklistElement' key={index}>
								<label className='checkboxPickList'>
									<CustomInput
										type='checkbox'
										name={element.id}
										id={element.id}
										checked={element.checked}
										onClick={handleClick}
										value={element.value}
										disabled={disabled}
										{...props}
									/>
									{element.value}
								</label>
							</div>
						))}

					{iconAfter && <WrapperIconAfter>{iconAfter}</WrapperIconAfter>}
				</WrapperContentInput>
				{help && <Help>{help}</Help>}
			</WrapperInput>
		</>
	);
};

const WrapperInput = styled.div`
	display: flex;
	flex-direction: row;
	${Theme.Desktop.Body}
`;

const WrapperContentInput = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem 0 0 0;

	.picklistElement {
		color: ${Theme.AZUL.ACERO_OSCURO};
	}
`;

const CustomInput = styled.input`
	${Theme.Desktop.LabelForm}

	.label-checkbox {
		color: ${Theme.AZUL.ACERO_CLARO};
		margin-right: 1rem;
	}
`;

export default PickList;
