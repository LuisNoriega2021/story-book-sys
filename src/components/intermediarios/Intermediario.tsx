/**
 * @author                 Ronald Gutierrez <rvillanueva@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Button fue escrita por Ronald Gutierrez
 */

import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from '../formElements/Input';
import Button from '../buttons/Button';
import InputWithMask from '../formElements/InputWithMask';

export type TIntermediarioItem = {
	error: boolean;
	completo: boolean;
	mensajeError: string;
	valor: string;
};

export type TIntermediario = {
	codigoAsesor: TIntermediarioItem;
	nombreCompleto: TIntermediarioItem;
	participacionComision: TIntermediarioItem;
	celular: TIntermediarioItem;
	email?: TIntermediarioItem;
};

export type TIntermediarioProp = {
	/**
	 * Datos beneficiario
	 */
	datos: TIntermediario;
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
	updateIntermediario: (prop: any) => void;

	participacionComisionDisponible?: number;

	indexIntermediario?: number;

	mostrarAgregar?: boolean;
};

const Intermediario: React.FC<TIntermediarioProp> = ({
	datos,
	actionDeleteHandle,
	actionAddHandle,
	updateIntermediario,
	participacionComisionDisponible,
	indexIntermediario,
	mostrarAgregar = false,
}: TIntermediarioProp): JSX.Element => {
	const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateIntermediario({ name: [event.target.name], value: event.target.value });
	};

	const handleCelular = (e: ChangeEvent<HTMLElement>) => {
		const { target } = e;
		updateIntermediario({ name: [(target as HTMLInputElement).name], value: (target as HTMLInputElement).value });
	};

	return (
		<StyledIntermediario>
			<div className='row'>
				<div className='column'>
					<Input
						id='codigoAsesor'
						name='codigoAsesor'
						label='Código'
						required
						disabled={indexIntermediario === 0}
						value={datos.codigoAsesor.valor}
						onChange={handleChanged}
						showlabel={true}
						errors={
							datos?.codigoAsesor.error
								? {
										mensajeError: {
											mensaje: datos?.codigoAsesor.mensajeError,
											campoAnidado: '',
											regla: '',
											tipoRegla: '',
										},
								  }
								: undefined
						}
					/>
				</div>
				<div className='column'>
					<Input
						id='nombreCompleto'
						name='nombreCompleto'
						label='Nombre'
						value={datos.nombreCompleto.valor}
						onChange={handleChanged}
						required
						disabled={indexIntermediario === 0}
						showlabel={true}
						errors={
							datos.nombreCompleto.error
								? {
										mensajeError: {
											mensaje: datos?.nombreCompleto.mensajeError,
											campoAnidado: '',
											regla: '',
											tipoRegla: '',
										},
								  }
								: undefined
						}
					/>
				</div>

				<div className='column'>
					<InputWithMask
						id='celular'
						name='celular'
						showlabel
						label='Celular'
						type='text'
						placeholder='+503 ####-####'
						placeholderChar='#'
						required
						touched={true}
						value={datos.celular.valor}
						onChange={handleCelular}
						mask={['+', '5', '0', '3', ' ', /['7', '6']/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
						errors={
							datos.celular.error
								? {
										mensajeError: {
											mensaje: datos.celular.mensajeError,
											campoAnidado: '',
											regla: '',
											tipoRegla: '',
										},
								  }
								: undefined
						}
					/>
				</div>

				<div className='column'>
					<Input
						id='participacionComision'
						name='participacionComision'
						value={datos.participacionComision.valor}
						onChange={handleChanged}
						required
						showlabel={true}
						label='Participación (%)'
						help={indexIntermediario === 0 && `Participación diponible: ${participacionComisionDisponible}%`}
						errors={
							datos.participacionComision.error
								? {
										mensajeError: {
											mensaje: datos?.participacionComision.mensajeError,
											campoAnidado: '',
											regla: '',
											tipoRegla: '',
										},
								  }
								: undefined
						}
					/>
				</div>

				{indexIntermediario === 0 && participacionComisionDisponible !== 0 && mostrarAgregar ? (
					<div className='column'>
						<div className='cl'>
							<Button label={'+ AGREGAR'} typeStyle={'info'} buttonClick={actionAddHandle} width={80} />
						</div>
					</div>
				) : (
					indexIntermediario !== 0 && (
						<div className='column'>
							<div className='cl'>
								<Button label={'- ELIMINAR'} typeStyle={'warning'} buttonClick={actionDeleteHandle} width={80} />
							</div>
						</div>
					)
				)}
			</div>
		</StyledIntermediario>
	);
};

const StyledIntermediario = styled.div`
	display: flex;

	width: 100%;

	& > div {
		& > :nth-child(1n + 1) {
			flex: 1;
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

export default Intermediario;
