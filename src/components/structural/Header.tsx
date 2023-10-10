/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Header fue escrita por Luis Noriega
 */

import React from 'react';

import { ContainerHeaderLink, ContainerHeaderLogo, CustomHeader,CustomLabel } from '../../styled/structural/HeaderStyled';
import RecursiveHeaderLink from '../buttons/RecursiveHeaderLink';

import IHeaderLink from '../../interfaces/IHeaderLink';

export interface IHeaderProp {
  /**
   * Logo del header
   */
  logo: any
  text:string
  /**
   * Elementos IHeaderLink que se mostraran en el header
   */
  links?: IHeaderLink[]
}

const Header: React.FC<IHeaderProp> = ({ logo, text,links = [] }: IHeaderProp): JSX.Element => {

  return (
    <CustomHeader>
      <ContainerHeaderLogo>
        <img src={logo} alt='Logo Asesuisa' />
      </ContainerHeaderLogo>

      <ContainerHeaderLink>
        <RecursiveHeaderLink listLinks={links} />
      </ContainerHeaderLink>
      <CustomLabel>{text}</CustomLabel>
    </CustomHeader>
  );
};

export default Header;
