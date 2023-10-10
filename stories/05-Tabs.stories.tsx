import React, { CSSProperties } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TabBase as TabBaseSura, SmallSolutionCard } from '../src';

export default {
	title: 'Components/Tabs/TabBase',
	component: TabBaseSura,
} as ComponentMeta<typeof TabBaseSura>;

const Template: ComponentStory<typeof TabBaseSura> = (args) => {
  const styledRowRL: CSSProperties = {
    width: '20%',
    border: '2px solid #FA4'
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={styledRowRL}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex delectus nostrum culpa praesentium ea hic fuga. Ipsum eaque natus nulla voluptatem nostrum quas, animi, in architecto pariatur molestiae, impedit quasi?</p>
      </div>
      <div style={{ display: 'flex', width: '60%' }}>
        <TabBaseSura {...args} />
      </div>
      <div style={styledRowRL}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod animi asperiores neque esse, dolores dolorum? Debitis quo beatae vero asperiores non soluta, consequuntur atque ut necessitatibus ea impedit mollitia? Reiciendis?</p>
      </div>
    </div>
  )
};

export const TabBase = Template.bind({});
export const TabBaseSinIndicador = Template.bind({});
export const TabBaseWithActive = Template.bind({});

TabBase.args = {
  tabs: [
    {
      id: 'personas',
      title: 'Personas',
      component: <>
        <SmallSolutionCard
          title='AUTO'
          description='Asegúrate de disfrutar cada kilometro que recorres porque nosotros te protegemos.'
        />
        <SmallSolutionCard
          title='PLAN AVANZA SEGURO'
          description='Asegúrate de disfrutar cada kilometro que recorres porque nosotros te protegemos.'
        />
        <SmallSolutionCard
          title='SALUD'
          description='Cuidamos tu salud con una cobertura completa en Centroamerica o en cualquier parte del mundo.'
        />
      </>,
    },
    {
      id: 'empresas',
      title: 'Empresas',
      component: <>
        <SmallSolutionCard
          title='Seguros para tu Patrimonio'
          description='Asegúrate de que tu negocio siga creciendo mientras nosotros protegemos tu patrimonio.  '
        />
        <SmallSolutionCard
          title='Seguros Colectivos para Colaboradores'
          description='Protege a tus colaboradores, quienes hacen crecer tu negocio, con acceso a beneficios para su salud y seguridad. '
        />
        <SmallSolutionCard
          title='Seguros de Ingeniería'
          description='Tenemos las mejores opciones para la competitividad de tu sector industrial. '
        />
      </>,
    },
    {
      id: 'p1',
      title: 'Prueba con scroll',
      component: <p>Prueba scroll</p>,
    },
    {
      id: 'p2',
      title: 'Prueba con scroll',
      component: <p>Prueba scroll</p>,
    },
    {
      id: 'p3',
      title: 'Prueba con scroll',
      component: <p>Prueba scroll</p>,
    },
    {
      id: 'p4',
      title: 'Prueba con scroll',
      component: <p>Prueba scroll</p>,
    },
    {
      id: 'p5',
      title: 'Prueba con scroll',
      component: <p>Prueba scroll</p>,
    },
    {
      id: 'p6',
      title: 'Prueba con scroll',
      component: <p>Prueba scroll</p>,
    },
    {
      id: 'p7',
      title: 'Prueba con scroll',
      component: <p>Prueba scroll</p>,
    },
  ],
  styleContainer: {},
  styleContainerTitles: { justifyContent: 'space-between' },
  styleTitleItem: {},
  styleContainerSon: {},
};

TabBaseSinIndicador.args = {
  tabs: [
    {
      id: 'languages',
      title: 'Languages',
      component: <>
        <p>JavaScript</p>
        <p>C#</p>
        <p>PHP</p>
      </>,
    },
    {
      id: 'frameworks',
      title: 'Frameworks',
      component: <>
        <p>React JS</p>
        <p>.NET Core</p>
        <p>Laravel</p>
      </>,
    },
  ],
  styleContainer: {},
  styleContainerTitles: {},
  styleTitleItem: {
    fontSize: '16px',
    lineHeight: '18px',
  },
  styleContainerSon: {},
  indicatorActive: false
};

TabBaseWithActive.args = {
  tabs: [
    {
      id: 'languages',
      title: 'Languages',
      component: <>
        <p>JavaScript</p>
        <p>C#</p>
        <p>PHP</p>
      </>,
    },
    {
      id: 'frameworks',
      title: 'Frameworks',
      component: <>
        <p>React JS</p>
        <p>.NET Core</p>
        <p>Laravel</p>
      </>,
    },
  ],
  styleContainer: {},
  styleContainerTitles: {},
  styleTitleItem: {
    fontSize: '16px',
    lineHeight: '18px',
  },
  styleContainerSon: {},
  indicatorActive: false,
  activeTab: 'frameworks'
};
