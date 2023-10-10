import { IWrapperDateRangePickerProps } from 'interfaces/formElements/IDateRangePickerProps';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styled from 'styled-components';
import 'moment/locale/es'  // without this line it didn't work
import es from 'date-fns/locale/es';
import { registerLocale } from 'react-datepicker';
registerLocale("es", es);

const DateRangePickerSura = ({
    Datos = [],
}: IWrapperDateRangePickerProps) => {

    const [ranges, setRanges] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

      
    /**
     * 
     * @param range funcion al seleccionar fechas en el dateRange
     * en la cual reemplazamos el objeto del mes seleccionado y seteamos un nuevo objeto
     */
    const handleSelectRange = (range: any) => {
        setRanges([range.selection]);
    }

    //Botones para saber que mes estamos posicionados
    // const dataDates = [
    //     { month: 'Enero' },
    //     { month: 'Febrero' },
    //     { month: 'Marzo' },
    //     { month: 'Abril' },
    //     { month: 'Mayo' },
    //     { month: 'Junio' },
    //     { month: 'Julio' },
    //     { month: 'Agosto' },
    //     { month: 'Septiembre' },
    //     { month: 'Octubre' },
    //     { month: 'Noviembre' },
    //     { month: 'Diciembre' }
    // ]

    return (
        <Wrapper>
            {/* <div className='buttons'>
                {dataDates.map((data, index) => <CustomButton isCurrent={dateCurrent == data.month.toLowerCase()}>{data.month}</CustomButton>)}
            </div> */}
            <DateRange
            editableDateInputs={true}
            onChange={item => handleSelectRange(item)}
            moveRangeOnFirstSelection={false}
            ranges={ranges}
            dragSelectionEnabled={true}
            />
        </Wrapper>
    )
}
const Wrapper = styled.div`
.buttons {
    display:flex !important
    }
.rdrDateDisplayWrapper{display:none}
`

// const CustomButton = styled.button.attrs((props: any) => ({ ...props }))`
//     display: block;
//     outline: 0;
//     border: 0;
//     padding: 10px 20px;
//     text-align: center;
//     color: ${({ isCurrent }) => isCurrent ? 'black !important' : 'white !important'} ;
//     background-color: ${({ isCurrent }) => isCurrent ? "yellow" : 'blue'};
//     color: #fff;
//     margin-left: 5px;
// `

export default DateRangePickerSura;
