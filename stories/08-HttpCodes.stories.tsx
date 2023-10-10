import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs';
import Code from "../src/components/httpCode/httpCode" ;
// import img from "../stories/img/404.svg";

const img: string = require("../stories/img/404.svg").default;

let AlType = ['primary', 'info', 'warning'];

let logo = [img,'https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png','https://edteam-media.s3.amazonaws.com/blogs/original/a6513f9f-e88e-48a9-a7e1-a894ab291225.jpg'];
let status= [404, 401]

storiesOf('HttpCodes', module)
    .addDecorator(withKnobs)
    .add('code', () => <Code Logo={select('foto',logo,null)} status={select('status',status, 0)}/>)
