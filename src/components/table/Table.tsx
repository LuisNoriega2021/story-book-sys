/**
 * @author                 Luis Fuentes <lefuentes@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de ExportExcelButton fue escrita por Luis Fuentes
 */

import React, { useMemo, useState, useRef, useCallback, useEffect, forwardRef, Ref } from 'react';
import TableHead from './tableHead';
import TableBody from './tableBody';
import Pagination from './pagination';
import ExportToExcel from '../buttons/ExportExcelButton';
import Loading from '../loaders/Loading';
import { PaginationWrapper, TableContainer, TableContents, TableFrame, TableStyled } from '../../styled';
import { ITableProps, ITableRef } from '../../interfaces/ITableProps';
import Theme from '../../config/theme';

export interface IColumn {
	accessor: string;
	label?: string;
}

function filterArray(arr: Object[], criteria: Record<string, string>) {
	return arr.filter((element) => {
		return Object.keys(criteria).every((c) => {
			if (criteria[c].length === 0) {
				return true;
			}
			return element[c] ? element[c].toString().toLowerCase().includes(criteria[c].toLowerCase()) : false;
		});
	});
}

const Table = forwardRef<ITableRef, ITableProps>(
	(
		{
			columns,
			data,
			idColumn,
			action,
			isFetching,
			children,
			title = 'tabla',
			initialPageSize,
			noExport,
			excelFunction = (data) => data,
			excelButtonTypeStyle,
			excelFormat,
			customFilter = filterArray,
			minColumnWidth = 0,
			buttons,
			top,
			bottom,
		},
		ref?: Ref<ITableRef>,
	) => {
		const [tableData, setTableData] = useState(data);
		const [filteredData, setFilteredData] = useState(data);
		const fref = useRef<ITableRef>();

		const initialFilter: Record<string, string> = columns.reduce((acc, column) => {
			return { ...acc, [column.accessor]: '' };
		}, {});

		const [filter, setFilter] = useState(initialFilter);
		const [pageSize, setPageSize] = useState(initialPageSize ? initialPageSize : 10);

		const [currentPage, setCurrentPage] = useState(1);

		const onPageChange = useCallback((page) => {
			setCurrentPage(page);
		}, []);

		const onPageSizeChange = useCallback((page) => {
			setPageSize(page);
		}, []);

		useMemo(() => {
			setTableData(data);
		}, [data]);

		useEffect(() => {
			if (fref.current) {
				fref.current.cleanFilter();
			}
		}, [isFetching]);

		const handleFilter = useCallback(
			(data: Record<string, string>) => {
				setFilter((filter) => ({ ...filter, ...data }));
				setCurrentPage(1);
			},
			[filter],
		);

		useMemo(() => {
			setFilteredData(customFilter(tableData, filter));
		}, [filter, tableData]);

		const currentTableData = useMemo(() => {
			const firstPageIndex = (currentPage - 1) * pageSize;
			const lastPageIndex = firstPageIndex + pageSize;
			return filteredData.slice(firstPageIndex, lastPageIndex);
		}, [currentPage, filteredData, pageSize]);

		const handleSorting = (sortField: string, sortOrder: string) => {
			if (sortField) {
				const sorted = [...tableData].sort((a, b) => {
					if (a[sortField] === null) return 1;
					if (b[sortField] === null) return -1;
					if (a[sortField] === null && b[sortField] === null) return 0;
					return (
						a[sortField].toString().localeCompare(b[sortField].toString(), 'es', { numeric: true }) *
						(sortOrder === 'asc' ? 1 : -1)
					);
				});
				setTableData(sorted);
				setCurrentPage(1);
			}
		};

		return (
			<>
				<TableContainer>
					<span className='title'>{title}</span>
					<TableFrame>
						<TableContents>
							{top ? top : null}
							{children ? children : null}
							<div
								style={{
									display: 'flex',
									flexFlow: 'row nowrap',
									alignContent: 'baseline',
									alignItems: 'center',
									justifyContent: 'flex-end',
									width: '100%',
									marginBottom: '5px',
								}}
							>
								{buttons ? buttons : null}
								{!noExport && (
									<ExportToExcel
										className='exportarExcel'
										columns={columns}
										data={excelFunction(filteredData)}
										title={title}
										format={excelFormat}
										typeStyle={excelButtonTypeStyle}
										style={{ marginLeft: '0.5rem', fontSize: '12px', padding: '6px 12px' }}
									/>
								)}
							</div>

							<div
								className='table-wrapper'
								style={{
									width: '100%',
									maxHeight: '80vh',
									overflow: 'auto',
									border: `1px solid ${Theme.GRIS.NEGRO}`,
									borderTopLeftRadius: '0.5rem',
								}}
							>
								<TableStyled>
									<TableHead {...{ columns, handleSorting, minColumnWidth }} setFilter={handleFilter} ref={fref} />
									{!isFetching && (
										<TableBody {...{ columns, idColumn, action, minColumnWidth }} tableData={currentTableData} />
									)}
								</TableStyled>
							</div>

							<Loading loading={isFetching} zIndex={100} height={'100px'} />
							<div
								style={{
									display: 'flex',
									flexFlow: 'row nowrap',
									alignContent: 'baseline',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: '100%',
								}}
							>
								<PaginationWrapper>
									<Pagination
										currentPage={currentPage}
										totalCount={filteredData.length}
										pageSize={pageSize}
										onPageChange={onPageChange}
										onPageSizeChange={onPageSizeChange}
									/>
								</PaginationWrapper>
							</div>
							{bottom ? bottom : null}
						</TableContents>
					</TableFrame>
				</TableContainer>
			</>
		);
	},
);

export default Table;
