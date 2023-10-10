import React, { useCallback, useEffect, useState } from 'react';
import DropDownList from '../formElements/DropDownList';
import Form from '../forms/Form';
import Button from '../buttons/Button';
import { ICampo } from '../../interfaces/forms/IFormProps';

interface Props {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	onPageChange: (currentPage: number) => void;
	onPageSizeChange: (pageSize: number) => void;
}

const campos: ICampo[] = [
	{
		id: 'currentPage',
		tipoCampo: {
			tipo: 'number',
			propiedades: {
				id: 'currentPage',
				name: 'currentPage',
				required: true,
				hasSelectedContentOnClick: true,
			},
		},
		reglas: [],
	},
];
const Pagination = ({ currentPage, pageSize, totalCount, onPageChange, onPageSizeChange }: Props) => {
	const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / pageSize));
	const [currentPageText, setCurrenPageText] = useState('');
	const [lastCurrentPage, setLastCurrentPage] = useState(1);

	const _onPageChange = useCallback(
		(nextPage) => (e: React.MouseEvent<Element, globalThis.MouseEvent>) => onPageChange(nextPage),
		[],
	);

	useEffect(() => {
		setTotalPages(Math.ceil(totalCount / pageSize));

		if (lastCurrentPage <= Math.ceil(totalCount / pageSize)) {
			onPageChange(lastCurrentPage);
		}
	}, [pageSize, totalCount]);

	useEffect(() => {
		setLastCurrentPage(currentPage);
		if (currentPage > totalPages) {
			onPageChange(totalPages ? totalPages : 1);
		}
	}, [currentPage]);

	useEffect(() => {
		const firstPage = (currentPage - 1) * pageSize + 1;
		const lastPage = currentPage * pageSize < totalCount ? currentPage * pageSize : totalCount;

		if (lastPage === 0) {
			setCurrenPageText('0');
			return;
		}
		if (firstPage === lastPage) {
			setCurrenPageText(`${firstPage}`);
		} else if (firstPage > lastPage) {
			onPageChange(Math.ceil(totalCount / pageSize));
		} else {
			setCurrenPageText(`${firstPage} - ${lastPage}`);
		}
	}, [currentPage, pageSize, totalCount]);

	const handlePageChange = useCallback((data: any) => {
		onPageChange(Number(data.currentPage));
	}, []);

	const handleSizeChange = useCallback((data: any) => {
		onPageSizeChange(Number(data.target.value));
	}, []);

	return (
		<>
			<div>
				<span>
					<Button label='<<' typeStyle='info' disabled={currentPage === 1} buttonClick={_onPageChange} />
				</span>
				<span>
					<Button
						label='<'
						typeStyle='info'
						disabled={currentPage === 1}
						buttonClick={_onPageChange(Number(currentPage) - 1)}
					/>
				</span>
				<span>Página</span>
				<Form
					id='formPagination'
					name='pagination'
					tipo={{
						id: 'idFormPagination',
						tipo: 'onlyForm',
						activo: true,
					}}
					propiedades={{
						id: 1,
						nombre: 'pagination',
						descripcion: '',
						campos: campos,
					}}
					values={{ currentPage }}
					buttonSubmitHidden={true}
					onSubmit={handlePageChange}
				/>
				<span>de {totalPages}</span>
				<span>
					<Button
						label='>'
						typeStyle='info'
						disabled={currentPage >= totalPages}
						buttonClick={_onPageChange(Number(currentPage) + 1)}
					/>
				</span>
				<span>
					<Button
						label='>>'
						typeStyle='info'
						disabled={currentPage >= totalPages}
						buttonClick={_onPageChange(totalPages)}
					/>
				</span>
			</div>
			<div>
				<span>
					mostrando {currentPageText} de {totalCount}
				</span>
				<span>
					<DropDownList
						id='pageSize'
						name='pageSize'
						opciones={[
							{ id: '5', value: '5' },
							{ id: '10', value: '10' },
							{ id: '20', value: '20' },
							{ id: '50', value: '50' },
							{ id: '100', value: '100' },
							{ id: '200', value: '200' },
						]}
						onChange={handleSizeChange}
						value={{ id: pageSize.toString(), value: pageSize.toString() }}
					></DropDownList>
				</span>
			</div>
		</>
	);
};

export default Pagination;
