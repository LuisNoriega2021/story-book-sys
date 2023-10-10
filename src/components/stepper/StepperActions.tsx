/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * v1.0.1– Se implemento funcionamiento para ocultar los botones
 * ----
 * La primera versión de StepperActions fue escrita por Luis Noriega
 * v1.0.1 – Luis Noriega
 */

import React, { useEffect, useState } from 'react';

import Step from './Step';
import Button from '../buttons/Button';

import { WrapperStepToStepContent } from '../../styled/stepper/StepperStyled';
import { Wrapper } from '../../styled/stepper/BasicStepperStyled';

import IStepProps from '../../interfaces/IStepProps';

export interface IStepperActionsProps {
	/**
	 * Pasos del Stepper
	 */
	steps: IStepProps[];
	/**
	 * Texto del botón previo
	 */
	labelPrevious: string;
	/**
	 * Indicador para ocultar boton anterior
	 */
	hiddeButtonPrev?: boolean;
	/**
	 * Texto del botón siguiente
	 */
	labelNext: string;
	/**
	 * Indicador para ocultar boton siguiente
	 */
	hiddeButtonNext?: boolean;
	/**
	 * Callback para pasos previos
	 */
	onPrevious: (step: number) => boolean | Promise<boolean>;
	/**
	 * Callback para pasos siguientes
	 */
	onNext: (step: number) => boolean | Promise<boolean>;
	/**
	 * Setear paso actual
	 */
	currentStepProp?: number;
	/**
	 * Component opcional a renderizar en el centro de los botones para indicar el paso actual
	 */
	IndicatorSteps?: React.ReactNode | JSX.Element | any;
}

const StepperActions: React.FC<IStepperActionsProps> = ({
	steps = [],
	labelPrevious = 'Anterior',
	labelNext = 'Siguiente',
	onPrevious,
	onNext,
	currentStepProp,
	IndicatorSteps,
	hiddeButtonPrev = false,
	hiddeButtonNext = false,
}: IStepperActionsProps): JSX.Element => {
	const [currentStep, setCurrentStep] = useState<number>(currentStepProp || 0);
	const [currentStepNode, setCurrentStepNode] = useState<React.ReactNode>(null);

	const handlePrevious = async () => {
		if (await onPrevious(currentStep - 1)) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleNext = async () => {
		if (await onNext(currentStep + 1)) {
			setCurrentStep(currentStep + 1);
		}
	};

	useEffect(() => {
		const searchedElement = steps[currentStep];

		if (searchedElement) {
			setCurrentStepNode(searchedElement.component);
		}
	}, [currentStep]);

	useEffect(() => {
		typeof currentStepProp === 'number' && setCurrentStep(currentStepProp);
	}, [currentStepProp]);

	return (
		<Wrapper>
			<ol className='c-stepper'>
				{steps.map(({ label, component, completed, id }, i: number, stepsArr) => (
					<Step key={i} id={id} label={label} isSelected={currentStep === i} completed={completed || false} />
				))}
			</ol>
			{currentStepNode && currentStepNode}
			<WrapperStepToStepContent>
				<Button
					type='button'
					label={labelPrevious}
					buttonClick={handlePrevious}
					disabled={false}
					hidden={hiddeButtonPrev}
				/>
				{IndicatorSteps && <IndicatorSteps currentStep={currentStep} />}
				<Button type='button' label={labelNext} buttonClick={handleNext} disabled={false} hidden={hiddeButtonNext} />
			</WrapperStepToStepContent>
		</Wrapper>
	);
};

export default StepperActions;
