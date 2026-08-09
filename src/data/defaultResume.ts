import type { ResumeData, Lang } from '../types/resume'

export function createId(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function defaultResume(lang: Lang): ResumeData {
  return lang === 'zh-CN' ? zhSample() : enSample()
}

function zhSample(): ResumeData {
  return {
    basics: {
      name: '张三',
      title: '前端开发工程师',
      email: 'zhangsan@example.com',
      phone: '138-0000-0000',
      location: '北京',
      gender: '男',
      birthDate: '1995-06',
      nativePlace: '湖南',
      politicalStatus: '中共党员',
      expectedSalary: '25-35K',
      availableOn: '随时到岗',
      links: [{ id: createId(), label: 'GitHub', url: 'https://github.com/zhangsan' }],
      summary:
        '5 年前端开发经验，熟悉 React / TypeScript 生态，注重工程化与代码质量。主导过多个中大型项目从 0 到 1 的建设，善于将复杂需求拆解为可落地的技术方案。',
    },
    education: [
      {
        id: createId(),
        school: '某某大学',
        degree: '本科',
        major: '计算机科学与技术',
        startDate: '2015-09',
        endDate: '2019-06',
        description: '主修数据结构、操作系统、计算机网络，GPA 3.7/4.0。',
      },
    ],
    work: [
      {
        id: createId(),
        company: '某某科技有限公司',
        position: '高级前端开发工程师',
        startDate: '2022-07',
        endDate: '至今',
        description:
          '负责核心产品 Web 端架构与开发，搭建企业级组件库，制定前端开发规范；推动性能优化，首屏加载时间降低 40%；带领 4 人小组完成 3 个大型项目交付。',
      },
      {
        id: createId(),
        company: '某某网络科技有限公司',
        position: '前端开发工程师',
        startDate: '2019-07',
        endDate: '2022-06',
        description:
          '负责电商平台核心模块（商品详情、购物车、结算）开发；基于 Vue 重构订单系统，响应速度提升 30%；沉淀共享组件，业务复用率达 60%。',
      },
      {
        id: createId(),
        company: '某某软件公司',
        position: '前端开发实习生',
        startDate: '2018-06',
        endDate: '2019-06',
        description:
          '参与企业官网与内部管理系统开发，编写可复用 UI 组件，配合后端完成接口联调与按期上线。',
      },
    ],
    projects: [
      {
        id: createId(),
        name: '企业级低代码平台',
        role: '核心开发',
        link: '',
        startDate: '2021-01',
        endDate: '2022-06',
        description:
          '背景：集团 10+ 业务线页面开发重复度高、交付周期长，急需统一的可视化搭建能力。\n职责：作为核心开发，负责平台整体架构与可视化编辑器核心模块的设计与实现。\n动作：基于 React + TypeScript 设计组件协议与渲染引擎；搭建拖拽式编辑器，实现布局编排、数据绑定与权限体系；制定一键发布流程与组件接入规范。\n成果：平台上线后服务 10+ 业务线，页面平均交付周期从 2 周缩短至 2 天，沉淀可复用组件 80+。',
      },
      {
        id: createId(),
        name: '数据可视化大屏',
        role: '前端负责人',
        link: '',
        startDate: '2020-03',
        endDate: '2020-09',
        description:
          '背景：运营与汇报场景需要实时数据大屏，各项目自行实现导致图表不统一、大数据量渲染卡顿。\n职责：作为前端负责人，统筹大屏模板的设计与开发。\n动作：基于 ECharts 封装统一图表与主题配置；引入数据分片与画布复用优化渲染性能；搭建模板市场供团队一键套用。\n成果：首帧耗时从 3s 降至 800ms，模板覆盖 6 个业务场景，团队复用率超过 70%。',
      },
    ],
    skills: [
      { id: createId(), name: 'JavaScript / TypeScript', level: '熟练' },
      { id: createId(), name: 'React / Vue', level: '熟练' },
      { id: createId(), name: 'Node.js / 工程化', level: '掌握' },
      { id: createId(), name: 'Tailwind CSS', level: '熟练' },
    ],
  }
}

function enSample(): ResumeData {
  return {
    basics: {
      name: 'Alex Zhang',
      title: 'Senior Frontend Engineer',
      email: 'alex@example.com',
      phone: '+86 138-0000-0000',
      location: 'Beijing, China',
      gender: '',
      birthDate: '',
      nativePlace: '',
      politicalStatus: '',
      expectedSalary: '',
      availableOn: '',
      links: [
        { id: createId(), label: 'GitHub', url: 'https://github.com/alexzhang' },
        { id: createId(), label: 'LinkedIn', url: 'https://linkedin.com/in/alexzhang' },
      ],
      summary:
        'Frontend engineer with 5 years of experience building scalable React applications. Led architecture and performance initiatives that cut time-to-first-paint by 40%.',
    },
    education: [
      {
        id: createId(),
        school: 'Example University',
        degree: 'B.S.',
        major: 'Computer Science',
        startDate: '2015-09',
        endDate: '2019-06',
        description: 'GPA 3.7/4.0. Coursework: Data Structures, OS, Networks.',
      },
    ],
    work: [
      {
        id: createId(),
        company: 'Example Tech Inc.',
        position: 'Senior Frontend Engineer',
        startDate: '2022-07',
        endDate: 'Present',
        description:
          'Owned the frontend architecture of the flagship product. Built a reusable component library and coding standards; cut initial load time by 40%; led a team of 4 to ship 3 major releases.',
      },
      {
        id: createId(),
        company: 'Example Networks',
        position: 'Frontend Engineer',
        startDate: '2019-07',
        endDate: '2022-06',
        description:
          'Built core modules (product detail, cart, checkout) for an e-commerce platform. Refactored the order system with Vue, improving response speed by 30%; maintained shared components used across 60% of features.',
      },
      {
        id: createId(),
        company: 'Example Software',
        position: 'Frontend Intern',
        startDate: '2018-06',
        endDate: '2019-06',
        description:
          'Built reusable UI components and internal tools; partnered with backend engineers on API integration and on-time releases.',
      },
    ],
    projects: [
      {
        id: createId(),
        name: 'Enterprise Low-Code Platform',
        role: 'Core Contributor',
        link: '',
        startDate: '2021-01',
        endDate: '2022-06',
        description:
          'Situation: Page development was highly repetitive across 10+ business lines, slowing release cycles and inflating cost.\nTask: Lead the core development of a visual page-building platform.\nAction: Designed the component protocol and rendering engine with React + TypeScript; built a drag-and-drop editor with layout, data binding and permission control; defined a one-click release pipeline and component onboarding standards.\nResult: Serves 10+ business lines, cutting average page delivery from 2 weeks to 2 days, with 80+ reusable components.',
      },
      {
        id: createId(),
        name: 'Data Visualization Dashboards',
        role: 'Frontend Lead',
        link: '',
        startDate: '2020-03',
        endDate: '2020-09',
        description:
          'Situation: Real-time dashboards were built ad hoc per project, causing inconsistent visuals and laggy rendering on large datasets.\nTask: Own the design and development of reusable dashboard templates.\nAction: Wrapped ECharts with unified themes and components; optimized large-dataset rendering via data slicing and canvas reuse; built a template gallery for one-click adoption.\nResult: First paint dropped from 3s to 800ms; templates cover 6 business scenarios with 70%+ reuse across teams.',
      },
    ],
    skills: [
      { id: createId(), name: 'JavaScript / TypeScript', level: 'Advanced' },
      { id: createId(), name: 'React / Vue', level: 'Advanced' },
      { id: createId(), name: 'Node.js / Tooling', level: 'Intermediate' },
      { id: createId(), name: 'Tailwind CSS', level: 'Advanced' },
    ],
  }
}
