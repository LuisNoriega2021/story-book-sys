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
 
 import { IOptionDropDownList } from '../../interfaces/formElements/IDropDownListProps';
 import Input from '../formElements/Input';
 import Button from '../buttons/Button';
 import DropDownList from '../formElements/DropDownList';

 
 import IItem from '../../interfaces/IItem';
 
 export type TFamiliaresPEPS = {
     nombrePCompleto: IItem;
     parentesco: IItem;
     otrosParentesco?: boolean;
     nombreOtroParentesco?: IItem;
 }
 
 export type TFamiliaresPEPSProp = {
     /**
      * Datos FamiliaresPEPS
      */
     datos: TFamiliaresPEPS;
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
      * Funcion para actualizar FamiliaresPEPS
      */
     updateFamiliaresPEPS: (prop: any) => void;
 
     indexFamiliaresPEPS?: number
 }
 
 const FamiliaresPEPS: React.FC<TFamiliaresPEPSProp> = ({
     datos,
     parentescos,
     actionDeleteHandle,
     actionAddHandle,
     updateFamiliaresPEPS,
     indexFamiliaresPEPS
 }: TFamiliaresPEPSProp): JSX.Element => {
 
     const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
         updateFamiliaresPEPS({ name: [event.target.name][0], value: event.target.value });
     }
 
     return (
         <StyledFamiliaresPEPS>
             <div className='row'>
                 
             <div className='column'>
                         <DropDownList
                             id='parentesco'
                             name='parentesco'
                             opciones={parentescos}
                             placeholder='Seleccione parentesco'
                             value={parentescos.find((item: IOptionDropDownList) => item.id === datos.parentesco.valor)}
                             onChange={(e: any) => updateFamiliaresPEPS({ name: 'parentesco', value: e.target.value })}
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
                 </div>
                 <div className='column'>
                     <Input
                         id='nombrePCompleto'
                         name='nombrePCompleto'
                         label='Nombre Completo'
                         value={datos.nombrePCompleto.valor}
                         onChange={handleChanged}
                         required
                         showlabel={true}
                         maxLength='75'
                         errors={datos.nombrePCompleto.error ?
                             {
                                 mensajeError: {
                                     mensaje: datos?.nombrePCompleto.mensajeError,
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
                     (datos.otrosParentesco) && <div className='column'>
                 <Input
                     id='nombreOtroParentesco'
                     name='nombreOtroParentesco'
                     label='Especifique Otro Parentesco'
                     value={datos.nombreOtroParentesco.valor}
                     onChange={handleChanged}
                     required
                     showlabel={true}
                     maxLength='75'
                     errors={datos.nombreOtroParentesco.error ?
                         {
                             mensajeError: {
                                 mensaje: datos?.nombreOtroParentesco.mensajeError,
                                 campoAnidado: '',
                                 regla: '',
                                 tipoRegla: '',
                             }
                         }
                         : undefined
                     }
                 />
             </div>
                 }
 
                 {
                     (indexFamiliaresPEPS === 0) ? (
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
                         indexFamiliaresPEPS !== 0 && <div className='column'>
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
         </StyledFamiliaresPEPS>
     );
 };
 
 const StyledFamiliaresPEPS = styled.div`
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
 
 export default FamiliaresPEPS;
 