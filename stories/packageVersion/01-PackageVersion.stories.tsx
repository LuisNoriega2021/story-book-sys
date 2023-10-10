import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Pakagev from '../../src/components/packageVersion/PackageVersion';
import pakage from '../../package.json';

storiesOf('Components/Version', module)
    .addDecorator(withKnobs)
    .add('Pakagev', () => <Pakagev pakage={pakage} />);