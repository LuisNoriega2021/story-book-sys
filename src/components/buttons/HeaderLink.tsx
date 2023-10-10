/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de HeaderLink fue escrita por Luis Noriega
 */

import React, { useState } from 'react';

import IHeaderLink from '../../interfaces/IHeaderLink';

import { ContainerChildrenStyled, HeaderLinkStyled, LabelLinkStyled } from '../../styled/buttons/HeaderLinkStyled';

const HeaderLink = ({ label, path, isPather, children, isSelected }: IHeaderLink) => {
  const [isOpen, toggleItemOpen] = useState<boolean | null>(null);
  const [selected, setSelected] = useState(isSelected);

  const decideAction = (e: React.MouseEvent<HTMLElement>): void => {
    setSelected(!selected);
    // onSelectCallback(e);
  };

  return (
    <HeaderLinkStyled
      isPather={isPather}
      onClick={decideAction}
    >
      <LabelLinkStyled>
        <p>{label}</p>
        {isPather && (<span onClick={() => toggleItemOpen(!isOpen)}>{isOpen ? '⬇' : '➡'}</span>)}
      </LabelLinkStyled>

      {(isPather && isOpen) && <ContainerChildrenStyled>{children}</ContainerChildrenStyled>}
    </HeaderLinkStyled>
  );
};

export default HeaderLink;
