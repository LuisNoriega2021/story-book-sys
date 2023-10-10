import Table from '../table/Table';
import React, { useEffect, useState } from 'react';
import {
	getSiniestrosDanios,
	/*getSiniestrosNoVida,
	getSiniestrosSalud,
	getSiniestrosVida,*/
} from '../../api/siniestro.services';
import {
	ISiniestroDanio,
	//ISiniestroNoVida,
	ISiniestroProps,
	//ISiniestroSalud,
	//ISiniestroVida,
} from '../../interfaces/customForms/ISiniestroProps';
import { ApisUrl } from '../../constants/apisUrl';

const SiniestrosForm = ({ codigoAseg, codigoRamo, numeroPoliza, ms }: ISiniestroProps) => {
	const [stroDanio, setStroDanio] = useState([]);
	const [_stroVida, _setStroVida] = useState([]);
	const [stroSalud, _setStroSalud] = useState([]);
	const [stro, setStro] = useState([]);

	let columns = [
		{ accessor: 'fechaHoraReclamo', label: 'Fecha Reclamo' },
		{ accessor: 'numeroSiniestro', label: 'Número Siniestro' },
		{ accessor: 'fechaAviso', label: 'Fecha Aviso' },
		{ accessor: 'fechaRegistro', label: 'Fecha Registro' },
		{ accessor: 'estado', label: 'Estado' },
		{ accessor: 'comentario', label: 'Comentario' },
		{ accessor: 'idStro', label: 'Id Siniestro' },
		{ accessor: 'txt_desc_redu', label: 'Descripcion Redu' },
		{ accessor: 'deducible', label: 'Deducible' },
		{ accessor: 'causaStro', label: 'Causa Siniestro' },
		{ accessor: 'placa', label: 'Placa' },
		{ accessor: 'direccion', label: 'Direccion' },
		//Salud
		{ accessor: 'stro', label: 'Siniestro Salud' },
		{ accessor: 'fecha_estro', label: 'Fecha Siniestro Salud' },
		{ accessor: 'ramo', label: 'Ramo Salud' },
		{ accessor: 'poliza', label: 'Poliza Siniestro Salud' },
		{ accessor: 'estimacion', label: 'Estimación Siniestro Salud' },
		{ accessor: 'cobertura', label: 'Cobertura Stro Salud' },
		{ accessor: 'importe_Estimado', label: 'Cobertura Stro Salud' },
		//{accessor: 'estado', label:'Estado Stro Salud'},
	];

	const getSiniestros = async () => {
		const getStroDanios = async () => {
			const { result } = await getSiniestrosDanios({
				codigoAsegurado: codigoAseg,
				codigoRamo: codigoRamo,
				numeroPoliza: numeroPoliza,
				url: ApisUrl.MS_Siniestro,
				suscriptionKey: '737ecfecd54d44c7a7101a4a99e87bce',
			});
			const lstDanios: Array<object> = Array<ISiniestroDanio>(...result);
			console.log(lstDanios);
			setStroDanio(lstDanios);
			console.log(stroDanio);
		};

		/*const getStroVida = async () =>{
      const {result} = await getSiniestrosVida({codigoAsegurado : codigoAseg, codigoRamo : codigoRamo, numeroPoliza : numeroPoliza, url:ApisUrl.MS_Siniestro_Vida, suscriptionKey :'737ecfecd54d44c7a7101a4a99e87bce'});
      const resultArray = result? {...result}: [];
      const lstVida: Array<object> = Array<ISiniestroVida>(resultArray);
      setStroVida(lstVida);
    }*/

		/*const getStroSalud = async () =>{
      const {result} = await getSiniestrosSalud({codigoAsegurado : codigoAseg, codigoRamo : codigoRamo, numeroPoliza : numeroPoliza, url:ApisUrl.MS_Siniestro_Salud, suscriptionKey :'737ecfecd54d44c7a7101a4a99e87bce'});
      //const resultArray =  result? {...result}: [];
      const lstSalud: Array<object> = Array<ISiniestroSalud>(...result);
      setStroSalud(lstSalud);
    }*/
		await getStroDanios();
		// await getStroVida();
		//await getStroSalud();
		const lstResult = [...stroDanio];
		console.log(stroDanio);
		console.log(stroSalud);

		setStro(lstResult);
	};
	useEffect(() => {
		getSiniestros();
	}, []);

	return (
		<>
			<Table columns={columns} data={stro} idColumn={'nro_pol'} title='Siniestros' />
		</>
	);
};

export default SiniestrosForm;
