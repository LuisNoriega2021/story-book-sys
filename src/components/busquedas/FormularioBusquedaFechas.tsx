/**
 * @author                 Pedro Mira <pedro.mira@elaniin.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente para realizar busqueda por campo Fecha
 * ----
 * La primera versión del componente de busquedas 
 */

import React from 'react';
import styled from 'styled-components';
import Calendar from '../formElements/Calendar';
import Button from '../buttons/Button';
import { Col, Row } from '../../styled/structural/Disposition';



export type TFuncionesBusqPorFechaProp = {


    /**
     * Funcion para acciones
     */
    actionClearHandle?: () => void;
    /**
     * Funcion para la accion de agregar
    */
    actionSaveHandle?: () => void;

}

const FormularioBusqFecha: React.FC<TFuncionesBusqPorFechaProp> = ({
    actionClearHandle,
    actionSaveHandle,
}: TFuncionesBusqPorFechaProp): JSX.Element => {



    return (
        <StyledFormBusqueda>


        <fieldset className='fset'>
            <legend>Seleccione el rango de fecha </legend>
            <Row></Row>
            <Row></Row>
        <Row>
            <Col>
                    <div className='column datepickerBusqueda'>
                        <label>Fecha desde:</label>
                        <Calendar id='idFechaBusq' name='idFechaBusq' label='Ingrese Fecha' />
                    </div> 
            </Col>
            <Col>
                    <div className='column datepickerBusqueda'>
                    <label>Fecha hasta:</label>
                        <Calendar id='idFechaBusq' name='idFechaBusq' label='Ingrese Fecha' />
                    </div>
            </Col>
            <Col>
            <Button
                            label={'Guardar'}
                            icon={'fa-solid fa-check-square'}
                            typeStyle={'primary'}
                            buttonClick={actionSaveHandle}
                            width={80}
                        />
                        <div className='clearBtn'>
                        <Button
                            label={'Limpiar'}
                            typeStyle={'primary'}
                            buttonClick={() => {

                                console.log("Limpiando")
              
                                  }}
                            width={80}
                        />
                    </div>
            </Col>
            <Col></Col>
        </Row>
        </fieldset>
        
        </StyledFormBusqueda>
    );
};




const StyledFormBusqueda = styled.div`


        .column.buttons {
            padding-left: 100px !important;
        }

        fieldset.fset {
            margin: 20px;
            padding: 0 10px 10px;
            border: 1px solid #666;
            border-radius: 8px;
            box-shadow: 0 0 4px #666;
            padding-top: 10px;
        }
        legend {
            padding: 2px 4px;
            background: #fff;
            /* para una mejor legibilidad en la sombra */
          }

        fieldset > legend {
            float: left;
            margin-top: -20px;
          }
          fieldset > legend + * {
            clear: both;
          }


          .clearBtn {
            position: relative;
            top: 12px;
        }

 `;

export default FormularioBusqFecha;

