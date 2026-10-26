import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  guidesSidebar: [
    'ai-engineering/index',
    {
      type: 'category',
      label: 'Architecture',
      link: {type: 'doc', id: 'architecture/index'},
      items: ['architecture/how-to-write-an-effective-adr'],
    },
    'github-copilot/index',
    'software-engineering/index',
  ],
};

export default sidebars;