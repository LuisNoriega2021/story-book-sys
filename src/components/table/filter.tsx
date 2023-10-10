import { ITableRef } from 'interfaces/ITableProps';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import Input from '../formElements/Input';

export interface Props {
	column: string;
	setFilter: (data: Record<string, string>) => void;
}

const ColumnFilter = forwardRef<ITableRef, Props>(({ setFilter, column }, ref) => {
	const [value, setValue] = useState('');

	const onChange = useCallback(
		(column) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
			setFilter({ [column]: e.target.value });
		},
		[],
	);

	useImperativeHandle(ref, () => ({
		cleanFilter() {
			setFilter({ [column]: '' });
			setValue('');
		},
	}));

	return (
		<>
			<Input
				hasSelectedContentOnClick
				id={`${column}Filter`}
				name={`${column}Filter`}
				onChange={onChange(column)}
				type='text'
				value={value}
			/>
		</>
	);
});

export default ColumnFilter;
