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

import Calendar from '../formElements/Calendar';
import { format } from 'date-fns';
import { addYears } from 'date-fns/fp';
import IItem from '../../interfaces/IItem';

export type TMiembroDirectivaPartidoPolitico = {
    partidoPolitico: IItem;
    cargo: IItem;
    fechaInicioGestion: IItem;
    fechaFinGestion: IItem;
}


export type TMiembroDirectivaPartidoPoliticoProp = {
    /**
     * Datos MiembroDirectivaPartidoPolitico
     */
    datos: TMiembroDirectivaPartidoPolitico;

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
     * Funcion para actualizar MiembroDirectivaPartidoPolitico
     */
    updateMiembroDirectivaPartidoPolitico: (prop: any) => void;

    indexMiembroDirectivaPartidoPolitico?: number
}

const MiembroDirectivaPartidoPolitico: React.FC<TMiembroDirectivaPartidoPoliticoProp> = ({
    datos,
    actionDeleteHandle,
    actionAddHandle,
    updateMiembroDirectivaPartidoPolitico,
    indexMiembroDirectivaPartidoPolitico,
    showAdd
}: TMiembroDirectivaPartidoPoliticoProp): JSX.Element => {

    const fechaActual = new Date(new Date().getFullYear(), 11, 31);

    const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateMiembroDirectivaPartidoPolitico({ name: [event.target.name][0], value: event.target.value });
    }

    return (
        <StyledMiembroDirectivaPartidoPolitico>
            <div className='row'>
                <div className='column'>
                    <Input
                        id='partidoPolitico'
                        name='partidoPolitico'
                        label='Partido político'
                        value={datos.partidoPolitico.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        maxLength='75'
                        errors={datos.partidoPolitico.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.partidoPolitico.mensajeError,
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
                    <Calendar
                        id='fechaInicioGestion'
                        name='fechaInicioGestion'
                        showlabel
                        required
                        label='Fecha de inicio del período'
                        defaultValue={(datos.fechaInicioGestion.valor as string) || ''}
                        onChange={(name: string, date: Date, event: any) => {
                            event.target.value = format(date, 'dd/MM/yyyy');
                            event.target.name = 'fechaInicioGestion';
                            handleChanged(event);
                        }}
                        maxDate={addYears(3, fechaActual)}
                        errors={datos.fechaInicioGestion.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.fechaInicioGestion.mensajeError,
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
                    <Calendar
                        id='fechaFinGestion'
                        name='fechaFinGestion'
                        showlabel
                        required
                        label=' Fecha de finalización del período'
                        defaultValue={(datos.fechaFinGestion.valor as string) || ''}
                        onChange={(name: string, date: Date, event: any) => {
                            event.target.value = format(date, 'dd/MM/yyyy');
                            event.target.name = 'fechaFinGestion';
                            handleChanged(event);
                        }}
                        maxDate={addYears(3, fechaActual)}
                        errors={datos.fechaFinGestion.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.fechaFinGestion.mensajeError,
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
                    (indexMiembroDirectivaPartidoPolitico === 0) ? (
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
                        indexMiembroDirectivaPartidoPolitico !== 0 && <div className='column'>
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
        </StyledMiembroDirectivaPartidoPolitico>
    );
};

const StyledMiembroDirectivaPartidoPolitico = styled.div`
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



export default MiembroDirectivaPartidoPolitico;
