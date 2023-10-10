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

 export type TVinculoComercial = {
     nombre: IItem;
     participacion: IItem;
     cargo: IItem;
 }
 
 export type TVinculoComercialProp = {
     /**
      * Datos VinculoComercial
      */
     datos: TVinculoComercial;
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
      * Funcion para actualizar VinculoComercial
      */
     updateVinculoComercial: (prop: any) => void;
 
     indexVinculoComercial?: number
 }
 
 const VinculoComercial: React.FC<TVinculoComercialProp> = ({
     datos,
     actionDeleteHandle,
     actionAddHandle,
     updateVinculoComercial,
     indexVinculoComercial,
     showAdd
 }: TVinculoComercialProp): JSX.Element => {
 
     const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
         updateVinculoComercial({ name: [event.target.name][0], value: event.target.value });
     }
 
     return (
         <StyledVinculoComercial>
             <div className='row'>
                 <div className='column'>
                     <Input
                         id='nombre'
                         name='nombre'
                         label='Nombre'
                         value={datos.nombre.valor}
                         onChange={handleChanged}
                         required
                         showlabel={true}
                         maxLength='75'
                         errors={datos.nombre.error ?
                             {
                                 mensajeError: {
                                     mensaje: datos?.nombre.mensajeError,
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
                         label='Participación (%)'
                         value={datos.participacion.valor}
                         onChange={handleChanged}
                         required
                         showlabel={true}
                         maxLength='75'
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

 
                 {
                     (indexVinculoComercial === 0) ? (
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
                         indexVinculoComercial !== 0 && <div className='column'>
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
         </StyledVinculoComercial>
     );
 };
 
 const StyledVinculoComercial = styled.div`
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
 
 export default VinculoComercial;
 