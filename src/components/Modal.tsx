/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Modal fue escrita por Luis Noriega
 */

import React, { useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';

export interface ModalProps {
	/**
	 * Indica si el modal se mostrara
	 */
	isOpen?: boolean;
	/**
	 * Indica de que tipo sera el modal
	 */
	type?: 'info' | 'warning' | 'danger' | 'content';
	/**
	 * Titulo que se muestra en el header del modal
	 */
	title?: string;
	/**
	 * Muestra el header del modal
	 */
	header?: boolean;
	/**
	 * Contenido del header
	 */
	contentHeader?: ReactNode;
	/**
	 * Muestra el footer en el modal
	 */
	footer?: boolean;
	/**
	 * Contenido del Footer
	 */
	contentFooter?: ReactNode;
	/**
	 * Contenido del modal
	 */
	children?: ReactNode;
	/**
	 * Color del Footer y Header
	 */
	backgroundColorHF?: string;
	/**
	 * Color del fondo
	 */
	backgroundColor?: string;
	/**
	 * Funcion que se ejecuta cuando cerramos o abrimos el modal
	 * recibe el como argumento el estado del modal
	 */
	openOrCloseModal?: (isOpen: boolean) => void;

	/**
	 * Cancela la funcionalidad por defecto de cerrarse al hacer click en cualquier parte
	 */
	hideOnClickOutside?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen = false,
	type = 'content',
	title = 'Tituto en encabezado del modal',
	header = true,
	contentHeader,
	footer = false,
	contentFooter,
	children,
	backgroundColorHF = '#5cb85c',
	backgroundColor = 'rgba(0, 0, 0, 0.4)',
	openOrCloseModal,
	hideOnClickOutside = true,
}: ModalProps) => {
	const refModal = useRef<HTMLDivElement>(null);

	const openOrCloseRef = (_isOpen: boolean) => {
		if (refModal && refModal.current) {
			refModal.current.style.display = _isOpen ? 'block' : 'none';

			if (openOrCloseModal) openOrCloseModal(_isOpen);
		}
	};

	const clickOutSide = (): void => {
		if (hideOnClickOutside) {
			openOrCloseRef(false);
		}
	};

	const clickX = (): void => {
		openOrCloseRef(false);
	};

	useEffect(() => {
		openOrCloseRef(isOpen);
	}, [isOpen]);

	return (
		<ContenedorModal backgroundColor={backgroundColor} ref={refModal} onClick={clickOutSide}>
			<ContenidoModal>
				{header && (
					<HeaderModal backgroundColor={backgroundColorHF}>
						<Close onClick={clickX}>&times;</Close>
						<h2>{title}</h2>
						{contentHeader}
					</HeaderModal>
				)}
				<BodyModal>
					{!header && <Close onClick={clickX}>&times;</Close>}
					{children && children}
				</BodyModal>
				{footer && <FooterModal backgroundColor={backgroundColorHF}>{contentFooter}</FooterModal>}
			</ContenidoModal>
		</ContenedorModal>
	);
};

interface PropsStyle {
	backgroundColor: string;
}
// const ContenedorModal = styled.div<PropsConMod>``;

const ContenedorModal = styled.div<PropsStyle>`
	display: none;
	position: fixed;
	z-index: 1005;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: ${({ backgroundColor }) => backgroundColor};
`;

const ContenidoModal = styled.div`
	position: relative;
	background-color: #fefefe;
	margin: auto;
	padding: 0;
	border: 1px solid #888;
	width: 80%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	animation-name: animatetop;
	animation-duration: 0.4s;

	@keyframes animatetop {
		from {
			top: -300px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
`;

const HeaderModal = styled.div<PropsStyle>`
	padding: 2px 16px;
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: white;
`;

const BodyModal = styled.div`
	padding: 2px 16px;
`;

const FooterModal = styled.div<PropsStyle>`
	padding: 2px 16px;
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: white;
`;

const Close = styled.span`
	color: white;
	float: right;
	font-size: 28px;
	font-weight: bold;

	:hover,
	:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
`;

export default Modal;
