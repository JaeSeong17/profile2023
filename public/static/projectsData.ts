export const projectsData = [
  {
    label: 'blogthree',
    title: 'Blog Three',
    titleSub: 'Web Development, Toy Project',
    desc: '게시판을 직접 개발하면서 웹개발의 전체적인 흐름을 익힙니다.',
    github: 'https://github.com/JaeSeong17/blog-three',
    site: 'https://web-blog-three-p8xrq2mlfy7lm82.sel3.cloudtype.app/',
    skills: [
      'React',
      'Redux-toolkit',
      'Redux-Saga',
      'TypeScript',
      'Three.js',
      'React-three-fiber/drei',
      'gsap',
      'Node.js',
      'koa',
      'MongoDB',
    ],
    comment:
      '계정을 등록하고 글을 남길 수 있는 게시판 형태의 개인 웹 프로젝트 입니다. Three.js와 GSAP을 활용해 개성있는 UI로 개발했습니다.',
    reviews: [
      {
        title: '기술을 빠르게 익히고 쓰기 vs 원리에 대한 이해',
        content:
          '다양한 라이브러리의 사용법을 빠르게 익히고 쓰는 것도 중요하지만 원리 이해에 대한 욕심을 져버리지 않으려 합니다. \
        React와 Redux를 사용해보고 Three.js와 접목시키는 과정에서 응용력과 에러 대처 능력을 향상 시키고 싶다는 욕심이 생겼습니다. \
        독창적인 의도에 맞게 구현해내고 과정에서 마주하는 에러를 해결해내는 힘은 예제를 사용해보고 사용법을 익히는 것을 넘어 \
        원리를 이해하는 것으로 기를 수 있다고 느꼈습니다. \
        ',
      },
      {
        title: '과한 애니메이션과 화려한 UI는 사용성을 낮춘다?',
        content:
          '부드럽고 연결성 있는 애니메이션과 다양한 사용자 상호작용은 매력적이지만, 직접 사용하는 입장에서는 단순하고 \
          직관적인 UI를 원할 수 있습니다. Three.js, gsap으로 독특하게 화면을 구성했지만 실제로 사용해보면 글 조회 \
          목적인 게시판에는 적합하지 않다는 느낌을 받을 수 있습니다. 빠른 데이터 제공, 응답과 처리 속도, 화려한 디자인과 \
          인터렉티브한 UI를 각 목적에 맞게 적절히 사용하는 것이 중요합니다.',
      },
    ],
    issues: [
      {
        title: 'Threejs와 Redux',
        content:
          'React-three-fiber는 Three.js를 React에서 선언형으로 사용하기 쉽게 만든 라이브러리입니다. \
            React의 컴포넌트가 DOM트리로 연결되듯 Three.js의 구성요소도 DOM트리에 연결 된다고 판단했습니다. 하지만 3D\
            화면상의 Mesh들의 상태를 루트 노드에 연결된 Redux 스토어에서 전역으로 관리하려 하다보니 Three.js의 렌더링 화면 \
            내에선 전역상태에 접근하지 못하는 문제가 발생했습니다. React-three-fiber는 형태만 react와 유사할 뿐 \
            Three.js를 렌더링하는 화면 내 구성요소는 화면 외부 DOM 트리와는 별도로 관리됩니다. \
            Three.js Scene 내부의 HTML 요소도 마찬가지로 외부 DOM트리와는 분리되어 있기 때문에 \
            Scene 외부에서 처리된 비동기 데이터들을 Scene 내부의 HTML 요소에 전달하기 위해서는 \
            직접 props로 전달해 주거나 Redux Provider 처럼 Context API기반이 아닌 다른 방식을 사용해야 합니다.',
      },
      {
        title: '프론트와 백엔드의 연결 및 네트워크',
        content:
          '프론트엔드와 백엔드의 전반적인 개발흐름을 모두 경험하려 노력했고 비동기로 데이터를 통신하는 과정에 집중했습니다. \
          특히 로그인 시스템을 만들면서 JWT방식과 Oauth를 적용해보고 쿠키와 세션을 활용하여 Stateless인 http request에서 서버가 \
          어떻게 클라이언트의 상태를 추적할 수 있는지 이해할 수 있었습니다. 또한 로컬 스토리지를 활용하여 클라이언트가 로그인 정보를 기억하고 \
          웹페이지 재접근 시 자동 로그인을 수행하도록 구현했습니다.',
      },
      {
        title: '최적화를 위한 시도',
        content:
          '최적화를 위해 Lighthouse 분석 지표를 활용했습니다. 초기 페이지 렌더링 속도를 단축시키기 위해서 첫 화면에 보이지 않는\
           3D요소와 UI에 lazy loading을 적용했습니다. 또한 3D화면의 프레임 저하를 방지하기 위해 화면상에 보이지 않지만 재생되고 있는\
           애니메이션을 비활성화하고 InstanseMesh를 사용하면서 Draw call을 줄이고자했습니다.',
      },
    ],
  },

  {
    label: 'studywith',
    title: 'StudyWith.',
    titleSub: 'Web Development, Toy Project',
    desc: '개발자 스터디 모집 플랫폼 주제로 진행한 토이 프로젝트입니다.',
    github: 'https://github.com/JaeSeong17/web-portfolio',
    site: 'https://web-portfolio-one-rouge.vercel.app/',
    skills: [
      'Nextjs',
      'TypeScript',
      'ReactQuery',
      'ReactHookForm',
      'Tailwind',
      'Prisma',
      'MongoDB',
      'Vercel',
    ],
    comment:
      '스터디원 모집과 관리 스터디 기록 및 관리 기능 사용할 수 있는 개발자 스터디 플랫폼 주제의 개인 웹 프로젝트입니다. Airbnb의 UI를 참고하였으며 Nextjs 적용을 목표로 개발했습니다.',
    reviews: [
      {
        title: '공식문서를 읽어보자',
        content:
          'Nextjs를 사용하면서 공식문서를 읽는 습관이 생겼습니다. Nextjs의 경우 백엔드에서 처리하던 API로직을 한 \
          프로젝트에서 관리할 수 있게 되면서 프론트와 백으로 나누어 생각하던 관점과 충돌이 있었습니다. 특히 서버 컴포넌트,\
          서버 액션과 같은 클라이언트에 표현되는 컴포넌트임에도 백엔드 영역과 혼재되어 있는 듯한 느낌은 더욱 혼란스럽게 \
          했습니다. 정리된 글을 통해 빠르게 지식을 습득하려던 습관을 멈추고 공식문서의 Data Fetching과 Component Rendering \
          가이드를 읽고 Nextjs 동작 방식에 대한 이해를 높일 수 있었습니다.',
      },
      {
        title: '모든 방면에서 우수한 하나의 툴은 없다',
        content:
          '라이브러리를 사용할 때 목적을 생각하고 장단점을 살펴보는 안목을 기르게 되었습니다. 전 프로젝트에서 사용한 \
          styled-component는 별도의 CSS 파일을 생성하지 않으며 컴포넌트 단위로 스타일 관리에 용이해 React와 어울렸습니다. \
          하지만 JS번들에 포함되는 점은 SSR에 적합하지 않았고 빌드타임에 스타일을 적용하는 방식인 Tailwind를 새롭게 도입했습니다. \
          요소의 className으로 쉽게 스타일을 적용할 수 있으며 SSR과 잘 어울리지만 CSS-In-JS 처럼 동적 변수 사용에 제한이 있다는 \
          장단점을 파악하면서 특정 라이브러리에 한정하지 않고 상황에 맞는 적절한 선택의 필요성을 느꼈습니다.',
      },
    ],
    issues: [
      {
        title: 'Server side rendering',
        content:
          'Nextjs 13의 Server Side Rendering과 Server component의 Data Fetching을 이해하는데 집중했습니다. \
          CSR의 경우 컴포넌트 정보만 먼저 받은 뒤 컴포넌트에서 표시할 데이터를 받기위해 다시 서버로 요청을 보내야 \
          하지만 SSR의 경우 클라이언트에 정보를 전달할 때 필요한 데이터를 미리 요청하여 렌더링할 컴포넌트와 한번에 \
          보내면서 클라이언트와 서버간의 통신을 줄일 수 있다는 점을 활용했습니다. 또한 클라이언트에서 이벤트 핸들러처럼 \
          동적 반응이 필요한 곳에 클라이언트 컴포넌트를 사용해 CSR과 SSR을 적절히 배치할 수 있는 Nextjs의 이점을 활용했습니다.',
      },
      {
        title: 'Zustand와 React-Query',
        content:
          '이전 프로젝트에서 Redux와 Redux-saga로 비동기 데이터의 상태관리시 사용하는 기능에 비해 코드가 너무 \
          길어지는 점에 불만을 느껴 Zustand와 React-query를 사용했습니다. 클로저 기반의 Zustand는 스토어 \
          생성후 별도의 Provider나 리듀서를 생성하지 않고 커스텀 훅 처럼 짧은 코드 구성만으로 상태관리가 가능한 \
          점이 좋았습니다. 또한 Redux-saga에서 직접 관리해야 했던 로딩 상태 추적이나 무한 스크롤 기능을 \
          react-query로 간편하게 처리할 수 있었습니다. ',
      },
      {
        title: '반응형 웹',
        content:
          '넓은 화면을 기준으로 개발 후 사이즈만 줄이는 방식을 사용하니 가로로 배치된 UI들이 모바일 환경에서 \
          제대로 표시되지 않았습니다. 사이즈 변경 뿐만 아니라 각 기기별로 화면의 UI 배치와 스타일이 적절히 \
          바뀌도록 했습니다. Tailwind를 사용할 때 뷰포트를 분기 별로 나누어 별도로 스타일을 적용시키는데 편리했습니다.',
      },
    ],
  },
];

export default projectsData;
