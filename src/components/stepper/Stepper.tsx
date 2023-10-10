/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Stepper fue escrita por Luis Noriega
 */

import React, { useEffect, useState } from 'react';

import Step from './Step';
import Button from '../buttons/Button';

import IStepperProps from '../../interfaces/IStepperProps';
import { WrapperStepToStepContent } from '../../styled/stepper/StepperStyled';

const Stepper: React.FC<IStepperProps> = ({
	defaultStep,
	activeStep,
	steps = [],
	children,
	completedStepper = false,
	...props
}: IStepperProps): JSX.Element => {
	const [currentStep, setCurrentStep] = useState<Number>(0);
	const [currentStepNode, setCurrentStepNode] = useState<React.ReactNode>(null);
	const [canMove, setCanMove] = useState({ prev: false, next: false });

	/**
	 * @function changeStep
	 * @param id identificador del paso al que iremos
	 * @param node nodo que se renderizara en este paso
	 * @param next indicador para poder ir al paso especificado
	 * @returns void
	 */
	const changeStep = (id: number, node: null | React.ReactNode, next: boolean) => {
		props.onChange?.(Number(id));
	
		if (next) {
			setCurrentStep(id);
			if (node) setCurrentStepNode(node);
		}	
	};

	const validateSteps = (prev: boolean, next: boolean) => {
		const indiceActual = steps.findIndex(({ id }) => id === currentStep);

		if (indiceActual > -1) {
			if (!prev || !next) {
				setCanMove({
					...canMove,
					prev: indiceActual > 0,
					next: steps[indiceActual].completed,
				});
			}

			if (prev) {
				setCurrentStep(steps[indiceActual > 0 ? (indiceActual - 1) : indiceActual].id);
				setCurrentStepNode(steps[indiceActual > 0 ? (indiceActual - 1) : indiceActual].component);
				if (props.onChange) props.onChange(steps[indiceActual > 0 ? (indiceActual - 1) : indiceActual].id);
			}

			if (next && ((indiceActual + 1) < steps.length)) {
				setCurrentStep(steps[indiceActual + 1].id);
				setCurrentStepNode(steps[indiceActual + 1].component);
				if (props.onChange) props.onChange(steps[indiceActual + 1].id);
			}

			if (next && ((indiceActual + 1) === steps.length)) {
				if (props.onCompleteStepper) {
					props.onCompleteStepper()
				};
			}
		}
	};

	/**
	 * Si cambian los pasos verifica si el paso es igual al actual del estado interno del componente y si este esta completo
	 * para indicar que puede pasar al siguiente
	 */
	useEffect(() => {
		steps.forEach(({ id, completed }) => {
			if (id === currentStep && completed) setCanMove({ ...canMove, next: true });
		});
	}, [steps]);

	useEffect(() => {
		if (Number.isInteger(currentStep) && currentStep >= 0) {
			validateSteps(false, false);
		}
	}, [currentStep]);

	useEffect(() => {
		if (defaultStep) {
			setCurrentStep(defaultStep);
			setCurrentStepNode(steps[defaultStep].component);
		} else {
			setCurrentStep(steps[0].id);
			setCurrentStepNode(steps[0].component);
		}
	}, []);

	return children ? children : (
		<>
			<ol className='c-stepper'>
				{steps.map(({ label, component, completed, id }, i: number, stepsArr) => (
					<Step
						key={i}
						id={id}
						label={label}
						isSelected={currentStep === id && (stepsArr[i - 1]?.completed || i === 0)}
						completed={completed || false}
						onSelected={(idStep: number) => changeStep(
							idStep,
							component,
							((i === 0 && completed) || stepsArr[i - 1]?.completed)
						)}
					/>
				))}
			</ol>
			{(currentStepNode) && currentStepNode}
			<WrapperStepToStepContent>
				{currentStep > 1 && (
					<Button
						buttonClick={() => validateSteps(true, false)}
						type='button'
						label='< Anterior'
					/>
				)}
				<Button
					type='button'
					label='Siguiente >'
					buttonClick={() => validateSteps(false, true)}
					disabled={!canMove.next}
				/>
			</WrapperStepToStepContent>
		</>
	);
};

export default Stepper;
