/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Button fue escrita por Luis Noriega
 */

import React from 'react';
import styled from 'styled-components';

import { IOptionDropDownList } from '../../interfaces/formElements/IDropDownListProps';
import Input from '../formElements/Input';
import Button from '../buttons/Button';
import DropDownList from '../formElements/DropDownList';
import { ElementsStates } from 'constants/types';

export type TBeneficiarioItem = {
    error: boolean,
    completo: boolean,
    mensajeError: string,
    valor: string
}

export type TBeneficiario = {
    identificacion: TBeneficiarioItem;
    nombres: TBeneficiarioItem;
    apellidos: TBeneficiarioItem;
    parentesco: TBeneficiarioItem;
    porcentaje: TBeneficiarioItem;
    otrosErrorParentesco?: boolean;
}

export type TBeneficiarioProp = {
    /**
     * Datos beneficiario
     */
    datos: TBeneficiario;
    /**
     * Lista de parentescos
     */
    parentescos: IOptionDropDownList[];
    /**
     * Funcion para acciones
     */
    actionDeleteHandle?: () => void;
    /**
     * Funcion para la accion de agregar
    */
    actionAddHandle?: () => void;
    /**
     * Funcion para actualizar beneficiario
     */
    updateBeneficiario: (prop: any) => void;

    porcentajeDisponible?: number;

    indexBeneficiario?: number
}

const Beneficiario: React.FC<TBeneficiarioProp> = ({
    datos,
    parentescos,
    actionDeleteHandle,
    actionAddHandle,
    updateBeneficiario,
    porcentajeDisponible,
    indexBeneficiario
}: TBeneficiarioProp): JSX.Element => {

    const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateBeneficiario({ name: [event.target.name], value: event.target.value });
    }

    return (
        <StyledBeneficiario>
            <div className='row'>
                <div className='column'>
                    <Input
                        id='nombres'
                        name='nombres'
                        label='Nombres'
                        value={datos.nombres.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        maxLength='75'
                        errors={datos.nombres.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.nombres.mensajeError,
                                    campoAnidado: '',
                                    regla: '',
                                    tipoRegla: '',
                                }
                            }
                            : undefined
                        }
                    />
                </div>
                <div className='column'>
                    <Input
                        id='apellidos'
                        name='apellidos'
                        label='Apellidos'
                        value={datos.apellidos.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        maxLength='75'
                        errors={datos?.apellidos.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.apellidos.mensajeError,
                                    campoAnidado: '',
                                    regla: '',
                                    tipoRegla: '',
                                }
                            }
                            : undefined
                        }
                    />
                </div>
                <div className='column'>
                    <Input
                        id='identificacion'
                        name='identificacion'
                        label='Identificación'
                        value={datos.identificacion.valor}
                        onChange={handleChanged}
                        showlabel={true}
                        errors={datos?.identificacion.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.identificacion.mensajeError,
                                    campoAnidado: '',
                                    regla: '',
                                    tipoRegla: '',
                                }
                            }
                            : undefined
                        }
                    />
                </div>
                <div className='column'>
                    <CustomDropDownListBeneficiario otrosError={datos.otrosErrorParentesco}
                        className='animacion'
                    >
                        <DropDownList
                            id='parentesco'
                            name='parentesco'
                            opciones={parentescos}
                            placeholder='Seleccione parentesco'
                            value={parentescos.find((item: IOptionDropDownList) => item.id === datos.parentesco.valor)}
                            onChange={(e: any) => updateBeneficiario({ name: 'parentesco', value: e.target.value })}
                            required
                            label='Parentesco'
                            errors={datos.parentesco.error ?
                                {
                                    mensajeError: {
                                        mensaje: datos.parentesco.mensajeError,
                                        campoAnidado: '',
                                        regla: '',
                                        tipoRegla: '',
                                    }
                                }
                                : undefined
                            }

                        />
                    </CustomDropDownListBeneficiario>
                </div>
                <div className='column'>
                    <Input
                        id='porcentaje'
                        name='porcentaje'
                        value={datos.porcentaje.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        label='Porcentaje (%)'
                        help={(indexBeneficiario === 0) && `Porcentaje diponible: ${porcentajeDisponible}%`}
                        errors={datos.porcentaje.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.porcentaje.mensajeError,
                                    campoAnidado: '',
                                    regla: '',
                                    tipoRegla: '',
                                }
                            }
                            : undefined
                        }
                    />
                </div>

                {
                    (indexBeneficiario === 0 && porcentajeDisponible !== 0) ? (
                        <div className='column'>
                            <div className='cl'>
                                <Button
                                    label={'+ AGREGAR'}
                                    typeStyle={'info'}
                                    buttonClick={actionAddHandle}
                                    width={80}
                                />
                            </div>
                        </div>
                    ) :
                        indexBeneficiario !== 0 && <div className='column'>
                            <div className='cl'>
                                <Button
                                    label={'- ELIMINAR'}
                                    typeStyle={'warning'}
                                    buttonClick={actionDeleteHandle}
                                    width={80}
                                />
                            </div>
                        </div>
                }
            </div>
        </StyledBeneficiario>
    );
};

const StyledBeneficiario = styled.div`
display: flex;
     
        width: 100%;

        & > div {
            & > :nth-child(1n+1){
                flex:1;
                padding: 0px 5px;
            }
        }
    
        .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            flex-grow: 2;
          }

        .column {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            width: 100%;
            flex: 1;
            .cl {
                height: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
              }
          }
`;



const CustomDropDownListBeneficiario = styled.div<ElementsStates>(({ otrosError }) => (`
${otrosError ? (`
    border: 1px solid red;
    padding: 10px 10px;
    box-shadow: 0px 0px 5px;
    animation: infinite resplandorAnimation 2s;
  
  @keyframes resplandorAnimation {
    0%,100%{
      box-shadow: 0px 0px 5px;
    }
    50%{
    box-shadow: 0px 0px 0px;
    
    }
  }
`) : ('')}     
`));

export default Beneficiario;
