import { ITableRef } from 'interfaces/ITableProps';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Draggable from './draggable';
import Filter from './filter';

export interface IColumns {
	accessor: string;
	label?: string;
}

export interface Props {
	columns: IColumns[];
	handleSorting: (sortField: string, sortOrder: string) => void;
	setFilter: (data: Record<string, string>) => void;
	minColumnWidth: number;
}

const tableHead = forwardRef<ITableRef, Props>(({ columns, handleSorting, setFilter, minColumnWidth }, ref) => {
	const [sortField, setSortField] = useState('');
	const [order, setOrder] = useState('asc');
	const fref = useRef<Array<ITableRef>>([]);

	useImperativeHandle(ref, () => ({
		cleanFilter() {
			for (const i of fref?.current) {
				i?.cleanFilter();
			}
		},
	}));

	const handleSortingChange = (accessor: string) => {
		const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';

		setSortField(accessor);
		setOrder(sortOrder);
		handleSorting(accessor, sortOrder);
	};

	return (
		<>
			<thead>
				<tr>
					{columns.map(({ label, accessor }, i) => {
						return (
							<th
								key={`${accessor}Sorter`}
								onClick={() => {
									handleSortingChange(accessor);
								}}
							>
								<div
									className={`${i}`}
									style={{
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										minWidth: `100%`,
										maxWidth: 'max-content',
									}}
								>
									{label ? label : accessor}
									{sortField === accessor && (order === 'asc' ? '\u25B2' : '\u25BC')}
								</div>
								<Draggable col={i} min={minColumnWidth} last={i === columns.length - 1} />
							</th>
						);
					})}
				</tr>
				<tr>
					{columns.map(({ accessor }, i) => {
						return (
							<th key={`${accessor}FilterCell`}>
								<Filter setFilter={setFilter} column={accessor} ref={(ref) => (fref.current[i] = ref)} />
								<Draggable col={i} min={minColumnWidth} last={i === columns.length - 1} />
							</th>
						);
					})}
				</tr>
			</thead>
		</>
	);
});

export default tableHead;
