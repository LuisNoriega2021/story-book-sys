/**
 * @author                 Isabel Balderrama <ibalderrama@elaniin.com>
 * @version                               1.0
 *
 * History
 * v1.0 – Se creo el componente
 * ----
 * La primera versión de MonthearPicker fue escrita por Isabel Balderrama
 */

 import React, { useState } from 'react';
 import DatePicker from 'react-datepicker';
 import * as DateFns from 'date-fns';
 
 import 'react-datepicker/dist/react-datepicker.css';
 
 import { LabelInput, WrapperContentInput, WrapperIconAfter, WrapperInput } from '../../styled/formElements/Input';
 
 import IconCalendar from '../../assets/img/svg/iconCalendar.svg';
import IMonthYearPickerProps from 'interfaces/formElements/IMonthYearProps';

 
 const MonthYearPicker: React.FC<IMonthYearPickerProps> = ({
     id,
     name,
     label = '',
     onChange = (name: string, date: Date, event: React.SyntheticEvent<any>) => console.log(),
     onBlur = (name: string, event: React.FocusEvent<HTMLInputElement>) => console.log(),
     iconAfter = <img width={15} alt='iconoDeCalendario' src={IconCalendar} />,
     disabled = false,
     required = false,
     showlabel = false,
     value,
     ...props
 }) => {
     const formatDate = 'MMMM yyyy';
     const [focus, setFocus] = useState(false);
     const [startDate, setStartDate] = useState(new Date());
 
     const handleChange = (date: Date, event: React.SyntheticEvent<any>) => {
         setStartDate(date);
         if (DateFns.isValid(date)) onChange?.(name, date, event);
     };
 
     const onFocus = (event: React.FocusEvent<HTMLInputElement>) => setFocus(true);
     const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
         setFocus(false);
         if (onBlur) onBlur(name, event);
     };
 
     return (
         <WrapperInput disabled={disabled}  hasLabel={showlabel}>
             {showlabel && (
                 <LabelInput htmlFor={id} focus={focus} hasValue={value !== null && value !== undefined && value > 0}>
                     {required && <span style={{ color: 'red' }}>*</span>} {label}
                 </LabelInput>
             )}
             <WrapperContentInput>
                 <DatePicker
                     id={id}
                     name={name}
                     locale='es'
                     className='sura-form-control-month-year-picker'
                     value={value?.toString()}
                     selected={startDate}
                     dateFormat={formatDate}
                     disabled={disabled}
                     required={required}
                     onChange={handleChange}
                     onFocus={onFocus}
                     onBlur={handleBlur}
                     placeholderText={props['placeholder']}
                     showMonthYearPicker
                     yearItemNumber={9}
                 />
                 {iconAfter && <WrapperIconAfter>{iconAfter}</WrapperIconAfter>}
             </WrapperContentInput>
         </WrapperInput>
     );
 };
 
 export default MonthYearPicker;
 