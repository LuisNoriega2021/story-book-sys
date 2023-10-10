/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de RecursiveHeaderLink fue escrita por Luis Noriega
 */

import React, { Fragment } from 'react';
import IHeaderLink from '../../interfaces/IHeaderLink';
import HeaderLink from './HeaderLink';

export interface IRecursiveTreeProps {
  listLinks?: IHeaderLink[],
  onSelectCallback?: (value: IHeaderLink) => void
}

const RecursiveHeaderLink: React.FC<IRecursiveTreeProps> = ({
  listLinks = [],
  onSelectCallback = () => {}
}: IRecursiveTreeProps) => {
  const createTreeLinks = (link: IHeaderLink) => (
    <HeaderLink
      label={link.label}
      path={link.path}
      isPather={link.isPather}
    >
      {(link.isPather && Array.isArray(link.links)) && link.links.map((linkInt: IHeaderLink) => createTreeLinks(linkInt))}
    </HeaderLink>
  );

  return (
    <>
      {listLinks.map((link: IHeaderLink, i: any) => <Fragment key={i}>{createTreeLinks(link)}</Fragment>)}
    </>
  );
};

export default RecursiveHeaderLink;
