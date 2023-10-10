import Input from '../../components/formElements/Input';
import SuraButton from '../../components/buttons/Button';
import { IDiagnosticoCIE10Props } from '../../interfaces/diagnosticoCIE10/IDiagnosticoCIE10Props';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WrapperDiagnostico } from '../../styled/diagnosticoCIE10/diagnosticoStyed';
import { Col, Row } from '../../styled/structural/Disposition';
import DropDownList from '../../components/formElements/DropDownList';
import Table from '../../components/table/Table';
/**
 * Componente generico de Diagnosticos CIE10, busqueda, insercion y actualizacion
 * de registros
 *
 * @param {string} [titulo] Titulo a mostrar
 * @returns JSXElement
 */
const DiagnosticoCIE10 = ({
	titulo = 'Diagnósticos',
	codCIE10Label = 'Codigo CIE10',
	codCIE10Value = '',
	nombreLabel = 'Nombre',
	nombreValue = '',
	aliasLabel = 'Nombre genérico',
	aliasValue = '',
	clasificacion = true,
	clasificacionDefaultValue,
	clasificacionValues = ['Agudos', 'Cronicos'],
	dataTable,
	guardarDiagnostico = (data: any) => console.log('click in guardarDiagnostico', data),
	actualizarDiagnostico = (data: any) => console.log('click in actualizarDiagnostico', data),
	buscarDiagnostico = (txtSearch: string) => console.log('click in btnBuscarDiagnostico', txtSearch),
	getCurrentItem,
}: IDiagnosticoCIE10Props): JSX.Element => {
	const [state, setState] = useState<any>({
		cmbClasificacion: '',
		txtCodCIE10: '',
		txtNombreCIE10: '',
		txtNombreGenericoCIE10: '',
	});

	const changeValue = (e: any) => setState({ ...state, [e.target.name]: e.target.value });
	const buscar = () => buscarDiagnostico(state.txtCodCIE10);
	const guardar = () => guardarDiagnostico(state);
	const actualizar = () => actualizarDiagnostico(state);

	/*const handleCheck = (e: any) => {
		// let item = dataTable.datos.find(
		// 	(current: any) => current.id === e.target.id.substr(4)
		// );
		// if (item && getCurrentItem) getCurrentItem(item);
	};*/

	useEffect(() => {
		setState({
			...state,
			cmbClasificacion: clasificacionDefaultValue,
			txtCodCIE10: codCIE10Value,
			txtNombreCIE10: nombreValue,
			txtNombreGenericoCIE10: aliasValue,
		});
	}, [clasificacionDefaultValue, codCIE10Value, nombreValue, aliasValue]);

	const opciones = [
		{ id: '1', value: 'Agudo' },
		{ id: '2', value: 'Crónico' },
	];

	let columns = [
		{ accessor: 'codigo', label: 'CODIGO' },
		{ accessor: 'nombre', label: 'NOMBRE' },
		{ accessor: 'nombre_gen', label: 'NOMBRE GENÉRICO' },
		{ accessor: 'clasificacion', label: 'CLASIFICACIÓN' },
	];

	let data = [
		{ codigo: 'COD239CH', nombre: 'Grita prosaica', nombre_gen: 'Catarro', clasificacion: 'Agudos' },
		{ codigo: 'COD23DP', nombre: 'Espumi militica', nombre_gen: 'Dolor de cabeza', clasificacion: 'Cronico' },
	];

	return (
		<Card>
			<CardBody>
				<WrapperDiagnostico>
					<h3>{titulo}</h3>
					<Row>
						<Col>
							<Input
								id='txtCodCIE10'
								name='txtCodCIE10'
								placeholder={codCIE10Label}
								value={state.txtCodCIE10}
								type='text'
								onChange={changeValue}
							></Input>
						</Col>
						<Col>
							<span className='input-group-btn'>
								<SuraButton className='btn btn-info' type='button' label='BUSCAR' onClick={buscar} text=''></SuraButton>
							</span>
						</Col>
					</Row>
					<Row>
						<Col>
							<Input
								id='txtNombreCIE10'
								name='txtNombreCIE10'
								placeholder={nombreLabel}
								value={state.txtNombreCIE10}
								type='text'
								onChange={changeValue}
							></Input>
						</Col>
						<Col>
							<Input
								id='txtNombreGenericoCIE10'
								name='txtNombreGenericoCIE10'
								placeholder='Nombre Genérico'
								value={state.txtNombreGenericoCIE10}
								type='text'
								onChange={changeValue}
							></Input>
						</Col>
						{clasificacion && (
							<Col>
								<DropDownList
									id='cmbClasificacion'
									opciones={opciones}
									label='Clasificación'
									name='cmbClasificacion'
								></DropDownList>
							</Col>
						)}
						<Col>
							<SuraButton onClick={guardar} type='button' label='Guardar'></SuraButton>
						</Col>
						<Col>
							<SuraButton onClick={actualizar} type='button' label='Actualizar'></SuraButton>
						</Col>
					</Row>
					<Table columns={columns} data={data} title='Homologación' idColumn='diagn'></Table>
				</WrapperDiagnostico>
			</CardBody>
		</Card>
	);
};

const Card = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	min-width: 0;
	word-wrap: break-word;
	background-color: #fff;
	background-clip: border-box;
	border: 1px solid rgba(0, 0, 0, 0.125);
	border-radius: 0.25rem;
	margin-bottom: 15px;

	label {
		color: #0033a0;
	}
`;

const CardBody = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: auto;
	padding: 1.25rem;
`;
export default DiagnosticoCIE10;
