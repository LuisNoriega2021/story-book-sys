import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IColumns } from './tableHead';
import Draggable from './draggable';
import TooltipSura from '../../components/modals/ToolTipSura';

export interface Props {
	idColumn: string;
	tableData: Object[];
	columns: IColumns[];
	action: (data: any) => void;
	minColumnWidth: number;
}

const TableBody = ({ tableData, columns, idColumn, action, minColumnWidth }: Props) => {
	const [activeRow, setActiveRow] = useState('');

	const _handleSelect = useCallback(
		(data: any) => (e: React.MouseEvent<Element, globalThis.MouseEvent>) => {
			setActiveRow(data[idColumn]);
			if (typeof action === 'function') action(data);
		},
		[],
	);

	return (
		<tbody>
			{tableData.map((data, i) => {
				return (
					<StyledRow
						key={data[idColumn]}
						className={activeRow === data[idColumn] ? 'active' : ''}
						onClick={_handleSelect(data)}
					>
						{columns.map(({ accessor }, j) => {
							return (
								<td key={`${data[idColumn]}${accessor}`}>
									{typeof data[accessor] === 'string' && data[accessor].length > 44 ? (
										<TooltipSura message={data[accessor]} position={'bottom'}>
											<div
												className={`${j}`}
												style={{
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													minWidth: '100%',
													width: `250px`,
													maxWidth: 'max-content',
												}}
											>
												{data[accessor]}
											</div>
										</TooltipSura>
									) : (
										<div
											className={`${j}`}
											style={{
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												minWidth: '100%',
												width: `250px`,
												maxWidth: 'max-content',
											}}
										>
											{data[accessor]}
										</div>
									)}

									<Draggable col={j} min={minColumnWidth} last={j === columns.length - 1} />
								</td>
							);
						})}
					</StyledRow>
				);
			})}
		</tbody>
	);
};

const StyledRow = styled.tr`
	:hover {
		background-color: #f5f6f8;
	}
	&.active {
		background-color: #fcfde7;
	}
`;

export default TableBody;
