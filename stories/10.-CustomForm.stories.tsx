import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs';
import SiniestroForm from "../src/components/customForms/siniestroForm";
import AseguradoForm from "../src/components/customForms/aseguradoForm";

storiesOf('SiniestroForm', module)
    .addDecorator(withKnobs)
    .add('code', () => <SiniestroForm codigoAseg={101940} codigoRamo = {5} numeroPoliza = {1067730} ms = 'MS_Siniestro' />)


    
storiesOf('AseguradoForm', module)
.addDecorator(withKnobs)
.add('code', () => <AseguradoForm codigoAseg={120468} ms = 'UriExample'  />)

