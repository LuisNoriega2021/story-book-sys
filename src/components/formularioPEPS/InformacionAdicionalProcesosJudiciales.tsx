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

import IItem from '../../interfaces/IItem';
import TextArea from '../formElements/TextArea';

export type TInformacionAdicionalProcesosJudiciales = {
    institucionFinanciera: IItem;
    motivo: IItem;
    recomendaciones: IItem;
}

export type TInformacionAdicionalProcesosJudicialesProp = {
    /**
     * Datos InformacionAdicionalProcesosJudiciales
     */
    datos: TInformacionAdicionalProcesosJudiciales;
    /**
     * Funcion para actualizar InformacionAdicionalProcesosJudiciales
     */
    updateInformacionAdicionalProcesosJudiciales: (prop: any) => void;
}

const InformacionAdicionalProcesosJudiciales: React.FC<TInformacionAdicionalProcesosJudicialesProp> = ({
    datos,
    updateInformacionAdicionalProcesosJudiciales
}: TInformacionAdicionalProcesosJudicialesProp): JSX.Element => {

    const handleChanged = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        updateInformacionAdicionalProcesosJudiciales({ name: [event.target.name][0], value: event.target.value });
    }

    return (
        <StyledInformacionAdicionalProcesosJudicialeContainer>
            <WrapperContainerFormRow>
                <WrapperContainerFormCol>
                    <Input
                        id='institucionFinanciera'
                        name='institucionFinanciera'
                        label='Institución financiera'
                        value={datos.institucionFinanciera.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        maxLength='75'
                        errors={datos.institucionFinanciera.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.institucionFinanciera.mensajeError,
                                    campoAnidado: '',
                                    regla: '',
                                    tipoRegla: '',
                                }
                            }
                            : undefined
                        }
                    />
                </WrapperContainerFormCol>
                <WrapperContainerFormCol>
                    <Input
                        id='motivo'
                        name='motivo'
                        label='Motivo'
                        value={datos.motivo.valor}
                        onChange={handleChanged}
                        required
                        showlabel={true}
                        maxLength='75'
                        errors={datos?.motivo.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.motivo.mensajeError,
                                    campoAnidado: '',
                                    regla: '',
                                    tipoRegla: '',
                                }
                            }
                            : undefined
                        }
                    />
                </WrapperContainerFormCol>
            </WrapperContainerFormRow>
            <WrapperContainerFormRow>
                <WrapperContainerFormCol>
                <TextArea
						id='recomendaciones'
						name='recomendaciones'
						label='Recomendaciones Ejecutivo/Asesor'
                        value={datos.recomendaciones.valor}
                        onChange={handleChanged}
                        required
                        rows={2}
                        showlabel={true}
                        errors={datos.recomendaciones.error ?
                            {
                                mensajeError: {
                                    mensaje: datos?.recomendaciones.mensajeError,
                                    campoAnidado: '',
                                    regla: '',
                                    tipoRegla: '',
                                }
                            }
                            : undefined
                        }
						className='sura-form-control'
					/>
                </WrapperContainerFormCol>
            </WrapperContainerFormRow>
        </StyledInformacionAdicionalProcesosJudicialeContainer>
    );
};

  const StyledInformacionAdicionalProcesosJudicialeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  line-height: normal;
  font-size: initial;
`;

const WrapperContainerFormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin: 0 0 10px 0;
`;

const WrapperContainerFormCol = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  flex-wrap: wrap;
  aling-item: flex-start;
  flex: 1;
  padding: 0px 10px;

  textarea {
      width: 100% !important;
  }
`;

export default InformacionAdicionalProcesosJudiciales;
