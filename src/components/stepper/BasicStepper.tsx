/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de BasicStepper fue escrita por Luis Noriega
 */

import React from 'react';

import Stepper from './Stepper';

import { Wrapper } from '../../styled/stepper/BasicStepperStyled';

import IBasicStepperProps from '../../interfaces/IBasicStepperProps';

const BasicStepper: React.FC<IBasicStepperProps> = ({
  steps = [],
  children,
  ...props
}: IBasicStepperProps): JSX.Element => {
  return (
    <Wrapper>
      {children
        ?
          <Stepper {...props} steps={steps}>
            {children}
          </Stepper>
        : <Stepper {...props} steps={steps} />
      }
    </Wrapper>
  );
};

export default BasicStepper;
