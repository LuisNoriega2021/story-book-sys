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

const FormularioBusqFechaIndividual: React.FC<TFuncionesBusqPorFechaProp> = ({
    actionClearHandle,
    actionSaveHandle,
}: TFuncionesBusqPorFechaProp): JSX.Element => {



    return (

        <StyledFormBusquedaIndividual>
            <div className='row'>
            <div className='column'>
                <fieldset className='fset'>
                    <legend>Seleccione la fecha</legend>
                    <div className='column datepickerBusqueda'>
                        <Calendar id='idFechaBusq' name='idFechaBusq' label='Ingrese Fecha' />
                    </div>
                </fieldset>
                </div>
                <div className='column buttons'>
                    <div className='cl'>
                        <Button
                            label={'Guardar'}
                            icon={'fa-solid fa-check-square'}
                            typeStyle={'primary'}
                            buttonClick={actionSaveHandle}
                            width={80}
                        />
                    </div>
                    <div className='clear'>
                        <Button
                            label={'Limpiar'}
                            typeStyle={'primary'}
                            buttonClick={() => {

                                console.log("Limpiando")
              
                                  }}
                            width={80}
                        />
                    </div>
                </div>
            </div>
        </StyledFormBusquedaIndividual>

    );
};




const StyledFormBusquedaIndividual = styled.div`
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


        .column.datepickerBusqueda {
            width: 50%;
        }

        .column.buttons {
            padding-left: 100px !important;
        }

        fieldset.fset {
            width: 100%;
            margin: 20px;
            padding: 0 10px 10px;
            border: 1px solid #666;
            border-radius: 8px;
            box-shadow: 0 0 4px #666;
            padding-top: 10px;
            height: 48px;
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

 `;

export default FormularioBusqFechaIndividual;

