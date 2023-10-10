import React, { CSSProperties, FC, FormEvent } from 'react';

type TForm = {
	id: string;
	style?: CSSProperties;
	handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
	className?: string;
};

const FormValidator: FC<TForm> = ({ id, children, handleSubmit, className, style }) => {
	const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSubmit?.(event);
	};

	return (
		<form id={id} onSubmit={handleOnSubmit} className={className} style={style}>
			{children}
		</form>
	);
};

export default FormValidator;
