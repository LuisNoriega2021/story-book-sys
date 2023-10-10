import React from 'react';

import { MessageError } from '../styled/formElements/Input';

import IErrorsProps from '../interfaces/IErrorsProps';

const RenderErrors = ({ errors }: IErrorsProps) => {
	const errorsView = [];

	for (const key in errors) {
		if (Object.prototype.hasOwnProperty.call(errors, key)) {
			const element = errors[key];
			
			if (element.mensaje.trim() !== '')
				errorsView.push(<MessageError key={key}>{element.mensaje}</MessageError>)
		}
	}

	return <>{errorsView}</>;
};

export default RenderErrors;
