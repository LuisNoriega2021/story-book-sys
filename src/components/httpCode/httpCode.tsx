/* eslint-disable react/no-deprecated */
import { IHttpCodeProps } from 'interfaces/http/IHttpCodeProps';
import React /*, { useState } */ from 'react';
import { WrapperHttpCodeStyled } from '../../styled/http/HttpCodeStyled';
// import { withRouter } from "react-router-dom";

//Función para cerrar una ventana y asignar tiempo Unix a document.cookie
function ActionLink() {
	function handleClick(e: Event) {
		e.preventDefault();
		document.cookie = 'z24HG56i1=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		window.close();
	}
	return (
		<a title='Login' onClick={() => handleClick} href='/'>
			Aquí
		</a>
	);
}

//Componente para cuando el usuario ha tenido un tiempo prolongado de inactividad, entonces esto es mostrado
const HttpCode = ({ ...props }: IHttpCodeProps): JSX.Element => {
	// const [state, setState] = useState('');
	const { Logo, Status } = props;

	// const componentWillMount = () => {
	// 	//Obtener Logo
	// 	fetch('/token/obtenerLogo')
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setState(data.Result);
	// 			console.log(state);
	// 		})
	// 		.catch(console.log);
	// };

	return (
		<WrapperHttpCodeStyled>
			<img
				alt='Logo'
				src={Logo ? Logo : 'https://manualdemarcasura.com/sites/default/files/2020-09/logotipo.png'}
				style={{ width: '180px' }}
			/>
			<br />
			{/*validación para comprobar el codigo de ingreso, si es 404 o 401*/}
			{Status == 404 ? (
				<b>
					Pagina no encontrada, clic <ActionLink /> para redireccionar
				</b>
			) : (
				<b>
					Tu sesión expiro, clic <ActionLink /> para salir
				</b>
			)}
		</WrapperHttpCodeStyled>
	);
};
export default HttpCode;
