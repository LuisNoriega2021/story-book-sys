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

 import IItem from '../../interfaces/IItem';

 export type TMiembroFamiliar = {
     nombreFamiliar: IItem;
     cargo: IItem;
     parentesco: IItem;
 }
 
 export type TMiembroFamiliarProp = {
     /**
      * Datos MiembroFamiliar
      */
     datos: TMiembroFamiliar;
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
      * Funcion para actualizar MiembroFamiliar
      */
     updateMiembroFamiliar: (prop: any) => void;
 
     indexMiembroFamiliar?: number
 }
 
 const MiembroFamiliar: React.FC<TMiembroFamiliarProp> = ({
     datos,
     actionDeleteHandle,
     actionAddHandle,
     updateMiembroFamiliar,
     indexMiembroFamiliar,
     showAdd
 }: TMiembroFamiliarProp): JSX.Element => {
 
     const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
         updateMiembroFamiliar({ name: [event.target.name][0], value: event.target.value });
     }
 
     return (
         <StyledMiembroFamiliar>
             <div className='row'>
                 <div className='column'>
                     <Input
                         id='nombreFamiliar'
                         name='nombreFamiliar'
                         label='Nombre'
                         value={datos.nombreFamiliar.valor}
                         onChange={handleChanged}
                         required
                         showlabel={true}
                         maxLength='75'
                         errors={datos.nombreFamiliar.error ?
                             {
                                 mensajeError: {
                                     mensaje: datos?.nombreFamiliar.mensajeError,
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
                         errors={datos.cargo.error ?
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
                         id='parentesco'
                         name='parentesco'
                         label='Parentesco'
                         value={datos.parentesco.valor}
                         onChange={handleChanged}
                         required
                         showlabel={true}
                         maxLength='75'
                         errors={datos.parentesco.error ?
                             {
                                 mensajeError: {
                                     mensaje: datos?.parentesco.mensajeError,
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
                     (indexMiembroFamiliar === 0) ? (
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
                         indexMiembroFamiliar !== 0 && <div className='column'>
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
         </StyledMiembroFamiliar>
     );
 };
 
 const StyledMiembroFamiliar = styled.div`
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
 
 export default MiembroFamiliar;
 