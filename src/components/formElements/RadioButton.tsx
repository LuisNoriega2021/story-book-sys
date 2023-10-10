/**
 * @author                 Byron Duarte <byron.duarte@elaniin.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creó el componente
 * ----
 * La primera versión de Textarea fue escrita por Ronald Gutierrez
 */
import React, { useState } from 'react';
import IRadioButtonProps from '../../interfaces/formElements/IRadioButtonProps';
import { WrapperRadioButton } from '../../styled/formElements/RadioButtonStyled';

//RadioButtonList con formato SURA
const RadioButton = ({
    id,
	name,
    items
    }: IRadioButtonProps): JSX.Element => {
        const [valueChecked, setChecked] = useState(items.find(radio => radio.checked).value);

        const onChangeValue = (e: React.ChangeEvent<HTMLElement>) => {
            const event = (e.target as HTMLInputElement);
            items.forEach(radio => radio.checked = radio.value === event.value);
            setChecked(event.value);
        }

        const itemsRadio = items.map((radio) =>
            <WrapperRadioButton key={Math.random().toString()}>
                <label htmlFor={radio.id} key={Math.random().toString()}>
                <input  
                    key={Math.random().toString()}
                    name={name}
                    id={radio.id}
                    type="radio"
                    checked={radio.checked}
                    onChange={(e) => onChangeValue(e)}
                    value={radio.value}
                    />
                <span key={Math.random().toString()}>{radio.text}</span>
                </label>
            </WrapperRadioButton>
        );

        return (
            <React.Fragment>
            <div data-checked={valueChecked}>
                {itemsRadio}
            </div>
            </React.Fragment>
        );
    };

 export default RadioButton;
