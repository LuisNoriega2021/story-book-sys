import React, { useEffect, useState } from 'react';
import { getAseguradoInfo } from '../../api/asegurado.services';
import { IAsegurado, IAseguradoProps } from '../../interfaces/customForms/IAseguradoProps';
import { Col, Row } from '../../styled/structural/Disposition';
import styled from 'styled-components';

const AseguradoForm = ({ codigoAseg, ms }: IAseguradoProps) => {
	let aseguradoInfo;

	const [_Asegurado, setAsegurado] = useState(Object);

	const [Codigo, setCodigo] = useState();
	const [NomAseg, setNomAseg] = useState();
	const [NitDUI, setNItDui] = useState<any | null>(null);
	const [Celular, setCelular] = useState();
	const [TipoPersona, setTipoPersona] = useState();
	const [FechaNac, setFechaNac] = useState();
	const [Email, setEmail] = useState();
	const [Telefono, setTelefono] = useState();

	useEffect(() => {
		const get = async () => {
			const { result } = await getAseguradoInfo({
				codigoAseg: codigoAseg,
				suscriptionKey: '737ecfecd54d44c7a7101a4a99e87bce',
			});
			console.log(result);

			// creacion de objeto para obtener dataResult
			const AseguradoObj = result.map(
				(val: any): IAsegurado => ({
					Codigo: val.codigo,
					Asegurado: val.asegurado,
					email: val.email,
					telefonoCobro: val.telefonoCobro,
					telefonoCelular: val.telefonoCelular,
					fec_nac: val.fec_nac,
					tipopersona: val.tipopersona,
					NIT: val.nit,
					dui: val.dui,
				}),
			);

			aseguradoInfo = AseguradoObj.filter((x: any) => typeof x !== undefined).shift();

			if (aseguradoInfo) {
				setAsegurado(aseguradoInfo);
				//seteando propiedades a mostrar
				setCodigo(aseguradoInfo.Codigo != undefined ? aseguradoInfo.Codigo : '');
				setNomAseg(aseguradoInfo.Asegurado != undefined ? aseguradoInfo.Asegurado : '');
				setNItDui(
					(aseguradoInfo.NIT != undefined ? aseguradoInfo.NIT : '') +
						' / ' +
						(aseguradoInfo.dui != undefined ? aseguradoInfo.dui : ''),
				);
				setCelular(aseguradoInfo.telefonoCelular != undefined ? aseguradoInfo.telefonoCelular : '');
				setTipoPersona(aseguradoInfo.tipopersona != undefined ? aseguradoInfo.tipopersona : '');
				setFechaNac(aseguradoInfo.fec_nac != undefined ? aseguradoInfo.fec_nac : '');
				setEmail(aseguradoInfo.email != undefined ? aseguradoInfo.email : '');
				setTelefono(aseguradoInfo.telefonoCobro != undefined ? aseguradoInfo.telefonoCobro : '');

				console.log(...AseguradoObj);
			}
		};
		get();
	}, []);

	return (
		<>
			{/* <SmallSolutionCard title="Test" description = "test" labelLink = 'Saber más' height = '400px' width = '100%' >
            
    
</SmallSolutionCard> */}

			<StyledFormAsegurados>
				<h2>Información del Asegurado</h2>
				<hr></hr>
				<Row></Row>
				<Row>
					<Col>
						<label>
							<span className='labelFormat'>Asegurado:</span> {NomAseg}
						</label>
					</Col>
					<Col>
						<label>
							<span className='labelFormat'>NIT/DUI:</span> {NitDUI}
						</label>
					</Col>
				</Row>
				<Row></Row>
				<Row>
					<Col>
						<label>
							<span className='labelFormat'>Código de asegurado:</span> {Codigo}
						</label>
					</Col>
					<Col>
						<label>
							<span className='labelFormat'>Tipo de persona:</span> {TipoPersona}
						</label>
					</Col>
					<Col>
						<label>
							<span className='labelFormat'>Fecha de nacimiento:</span>
							{FechaNac}
						</label>
					</Col>
				</Row>
				<Row></Row>
				<Row>
					<Col>
						<label>
							<span className='labelFormat'>Email:</span> {Email}
						</label>
					</Col>
					<Col>
						<label>
							<span className='labelFormat'>Teléfono de cobro: </span>
							{Telefono}
						</label>
					</Col>
					<Col>
						<label>
							<span className='labelFormat'>Celular: </span> {Celular}
						</label>
					</Col>
				</Row>
			</StyledFormAsegurados>
		</>
	);
};

const StyledFormAsegurados = styled.div`
	span.labelFormat {
		color: #0033a0;
		font-weight: bold;
		font-size: 17px;
	}
`;

export default AseguradoForm;
