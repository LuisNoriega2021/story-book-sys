/**
 * @author                 Ronald Gutierrez <rvillanueva@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Button fue escrita por Ronald Gutierrez
 */

import React from 'react';
import styled from 'styled-components';

import Input from '../formElements/Input';
import Button from '../buttons/Button';
import OptionDouble from '../formElements/OptionDouble';
import { IItemOptionDouble } from 'interfaces';

import IItem from '../../interfaces/IItem';

export type TInformacionAdicionalMiembroDirectiva = {
    nombreSociedad: IItem;
    cargo: IItem;
    participacion: IItem;
    esClienteAsesuisa: IItem;
}

const optionList = [
    { value: 'S', label: 'Si' },
    { value: 'N', label: 'No' },
];

export type TInformacionAdicionalMiembroDirectivaProp = {
    /**
     * Datos InformacionAdicionalMiembroDirectiva
     */
    datos: TInformacionAdicionalMiembroDirectiva;
    /**
    * Propiedad para mostrar o no el boton de agregar
    */
     showAdd?: boolean;
    /**
     * Funcion para acciones
     */
    actionDeleteHandle?: () => void;
    /**
     * Funcion para la accion de agregar
    */
    actionAddHandle?: () => void;
    /**
     * Funcion para actualizar InformacionAdicionalMiembroDirectiva
     */
    updateInformacionAdicionalMiembroDirectiva: (prop: any) => void;

    indexInformacionAdicionalMiembroDirectiva?: number
}

const InformacionAdicionalMiembroDirectiva: React.FC<TInformacionAdicionalMiembroDirectivaProp> = ({
    datos,
    actionDeleteHandle,
    actionAddHandle,
    updateInformacionAdicionalMiembroDirectiva,
    indexInformacionAdicionalMiembroDirectiva,
    showAdd
}: TInformacionAdicionalMiembroDirectivaProp): JSX.Element => {

    const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateInformacionAdicionalMiembroDirectiva({ name: [event.target.name][0], value: event.target.value });
    }

    return (
        <StyledInformacionAdicionalMiembroDirectiva>
            <div className='row'>
                <div className='column'>
                    <Input
                        id='nombreSociedad'
                        name='nombreSociedad'
                        label='Nombre de la sociedad'
                        value={datos.nombreSociedad.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        maxLength='75'
                        errors={datos.nombreSociedad.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.nombreSociedad.mensajeError,
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
                        id='cargo'
                        name='cargo'
                        label='Cargo'
                        value={datos.cargo.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        maxLength='75'
                        errors={datos?.cargo.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.cargo.mensajeError,
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
                        id='participacion'
                        name='participacion'
                        value={datos.participacion.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        label='Participación (%)'
                        errors={datos.participacion.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.participacion.mensajeError,
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
                    <OptionDouble
                        id='esClienteAsesuisa'
                        name='esClienteAsesuisa'
                        label='¿Es cliente de ASESUISA?'
                        onChange={handleChanged}
                        optionsDouble={optionList}
                        value={{ value: datos.esClienteAsesuisa.valor, label: datos.esClienteAsesuisa.valor === 'S' ? 'Sí' : 'No' }}
                        defaultSelected={optionList.find(
                            (item: IItemOptionDouble) => item.value === (datos.esClienteAsesuisa.valor),
                        )}
                        errors={datos?.esClienteAsesuisa.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.esClienteAsesuisa.mensajeError,
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
                    (indexInformacionAdicionalMiembroDirectiva === 0) ? (
                        showAdd && (
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
                        )
                    ) :
                        indexInformacionAdicionalMiembroDirectiva !== 0 && <div className='column'>
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
        </StyledInformacionAdicionalMiembroDirectiva>
    );
};

const StyledInformacionAdicionalMiembroDirectiva = styled.div`
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



export default InformacionAdicionalMiembroDirectiva;
