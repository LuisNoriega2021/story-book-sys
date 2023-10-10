/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de TabBase fue escrita por Luis Noriega
 */

import React, { useState, useEffect } from 'react';

import { ITabBase } from '../../interfaces';
import { TabBaseStyled, TabBaseSonStyled, TabBaseTitlesStyled, OptionPatherTab, ContenidoScrollH } from '../../styled';

const TabBase: React.FC<ITabBase> = ({
	tabs = [],
	indicatorActive = true,
	activeTab,
	...props
}: ITabBase): JSX.Element => {
	const [selected, setSelected] = useState({ ...tabs[0] });

	const focusItem = (id: string) => {
		let element = document.querySelector(`#${id}`);
		element.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		const tabSearch = tabs.find(({ id }) => id === activeTab);
		if (activeTab && tabSearch) {
			setSelected(tabSearch);
			focusItem(tabSearch.id);
		}
	}, [activeTab]);

	return (
		<TabBaseStyled style={{ ...props.styleContainer }}>
			<ContenidoScrollH>
				<TabBaseTitlesStyled style={{ ...props.styleContainerTitles }}>
					{tabs.map((item, i: number) => (
						<OptionPatherTab
							id={item.id}
							key={i}
							isSelected={item.id === selected.id}
							indicatorActive={indicatorActive}
							onClick={() => !activeTab && setSelected(item)}
							style={{ ...props.styleTitleItem }}
						>
							{item.title}
						</OptionPatherTab>
					))}
				</TabBaseTitlesStyled>
			</ContenidoScrollH>

			<TabBaseSonStyled style={{ ...props.styleContainerSon }}>{selected.component}</TabBaseSonStyled>
		</TabBaseStyled>
	);
};

export default TabBase;
