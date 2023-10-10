import React, { useState } from 'react';
import { WrapperPackageVersionStyled } from '../../styled/packageVersion/PackageVersionStyled';

//Este componente muestra el detalle técnico de la aplicación, para esto lee el archivo package.json
const Pakagev = ({
    ...props
    }:  IPakagev) :JSX.Element => {
   
    const [show, setShow] = useState(false); 
    
    
    return (
        <WrapperPackageVersionStyled>
            <div className="col-md-12 text-center">
                <a href="javascript:void(0);" onClick={() => setShow(!show) }>{props.pakage.name}</a>
            </div>
            { show &&
                <div className="section-package">
                <span>Version: </span>{props.pakage.version}<br />
                <span>Descripcion: </span>{props.pakage.description}<br />
                <div className="wrapper-badges">
                    {props.pakage.keywords.map(item => {
                        return (<span key={Math.random().toString()} className="badge-sura">{item}</span>);
                    })}
                </div>
            </div>
            
            }
        </WrapperPackageVersionStyled>
    );
    
}

export default Pakagev;