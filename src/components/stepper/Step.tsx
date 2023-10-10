/**
 * @author                 Luis Noriega <lnoriega@asesuisa.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de Step fue escrita por Luis Noriega
 */

import React from 'react';

import IStepProps from '../../interfaces/IStepProps';

const Step: React.FC<IStepProps> = ({
  label = '',
  id,
  onSelected,
  isSelected,
  tooltip = '',
  completed = false,
  ...props
}: IStepProps) => {
  const selected = () => {
    if (onSelected) onSelected(id);
  };

  return (
    <li
      className={`c-stepper__item ${isSelected ? 'item-selected' : ''} ${completed ? 'item-complete' : ''}`}
      id={id.toString()}
      onClick={selected}
    >
      <h3 className='c-stepper__title'>{label}</h3>
    </li>
  );
};

export default Step;
