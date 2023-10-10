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
 
 export type TInformacionAdicionalCierreOperaciones = {
     institucionFinanciera: IItem;
     motivo: IItem;
 }
 
 export type TInformacionAdicionalCierreOperacionesProp = {
     /**
      * Datos InformacionAdicionalCierreOperaciones
      */
     datos: TInformacionAdicionalCierreOperaciones;
     /**
      * Funcion para actualizar InformacionAdicionalCierreOperaciones
      */
     updateInformacionAdicionalCierreOperaciones: (prop: any) => void;
 }
 
 const InformacionAdicionalCierreOperaciones: React.FC<TInformacionAdicionalCierreOperacionesProp> = ({
     datos,
     updateInformacionAdicionalCierreOperaciones
 }: TInformacionAdicionalCierreOperacionesProp): JSX.Element => {
 
     const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
         updateInformacionAdicionalCierreOperaciones({ name: [event.target.name][0], value: event.target.value });
     }
 
     return (
         <StyledInformacionAdicionalCierreOperaciones>
             <div className='row'>
                 <div className='column'>
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
                 </div>
                 <div className='column'>
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
                 </div>               
             </div>
         </StyledInformacionAdicionalCierreOperaciones>
     );
 };
 
 const StyledInformacionAdicionalCierreOperaciones = styled.div`
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
 
 
 
 export default InformacionAdicionalCierreOperaciones;
 