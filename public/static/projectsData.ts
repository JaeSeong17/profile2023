export const projectsData = [
  {
    label: 'blogthree',
    title: 'Blog Three',
    titleSub: 'Web Development, Toy Project',
    desc: '개인 블로그를 직접 개발하면서 웹개발의 전체적인 흐름을 익힙니다.',
    github: 'https://github.com/JaeSeong17/blog-three',
    site: 'https://blog.jsdatabase.site/',
    skills: [
      'React',
      'Redux-toolkit',
      'Redux-Saga',
      'TypeScript',
      'Three.js',
      'React-three-fiber/drei',
      'GSAP',
      'Node.js',
      'koa',
      'MongoDB',
    ],
    comment:
      '블로그를 고민하던 중 직접 만들어 보고 싶어 시작한 개인 프로젝트 입니다. 게시판 형태로 글을 남길 수 있는 블로그 개발을 지향했고 Three.js와 GSAP을 활용해 개성있는 UI로 개발합니다.',
    reviews: [
      {
        title: '과한 애니메이션과 화려한 UI는 사용성을 낮춘다?',
        content:
          '개발할때 바라보는 화면과, 직접 사용할 떄 바라보는 화면에서 느껴지는 사용성이 차이가 납니다. 부드럽고 연결성 있는애니메이션과 다양한 사용자 상호작용은 매력적이지만, 직접 사용하는 측면에서는 불필요하고 긴 애니메이션보다 단순하고 직관적임을 원하게 됩니다. 덜어내는 것의 중요성을 느낀 프로젝트입니다.',
      },
      {
        title: '기술을 빠르게 익히고 쓰기 vs 원리에 대한 이해',
        content:
          '기술을 빠르게 익히고 사용하는 것도 중요하지만, 원리에 대한 이해도 필요합니다. 자신의 프로젝트를 진행할 때에는 예제와 강의에있는 상황만 발생하지 않기 때문에 마주하는 문제를 해결하는 능력을 기르기 위해선 깊이 있는 이해가 필요합니다.',
      },
    ],
    issues: [
      {
        title: 'Canvas상에 있는 Html 요소에서 Redux를 사용할 수 없는 문제',
        content:
          'Canvas상에 존재하는 요소들은 비트맵일 뿐이며 Canvas 하위 요소들은 전체 DOM 트리의 노드로 연결되지 않습니다. 프로젝트에서는 전역 상태 관리를 위해 Redux를 사용했는데, Canvas 내부의 Html 요소에서 전역상태에 접근하지 못하는 문제가 발생했습니다. Redux는 React의 context api를 기반으로 하며 이는 DOM 트리를 따라 데이터를 제공하기 때문에 Redux로 전역 상태를 등록하더라도 Canvas내의 Html에서는 접근이 불가능 합니다. 따라서 Canvas 내 Html에는 상태값을 직접 전달해주어야 했습니다.',
      },
      {
        title: '프론트와 백엔드의 연결 및 네트워크',
        content:
          '백엔드로부터 데이터 요청 시 발생하는 CORS문제 해결을 위해 네트워크를 좀 더 자세히 공부하게 되었습니다. 또한 JWT 로그인 방식과 쿠키 사용을 위해 Secure, SameSite 속성에 대해 조사했고, 자동 로그인 구현을 위해 브라우저 스토리지를 사용했습니다.',
      },
      {
        title: '최적화를 위한 시도',
        content:
          'Lighthouse 지표 분석을 시도했습니다. 네트워크 페이로드를 줄이기 위해 로컬 폰트를 Subset 방식 최적화하고 라이브러리 의존성을 확인(dev dependency로 전환)했습니다. 또한 화면 상에 나타나지 않지만 재생되고 있는 불필요한 애니메이션을 비활성화, 초기화면에서 표현되지 않는 3D 요소들을 React Suspense/Lazy를 활용하여 First Contentful Paint를 단축했습니다.',
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
      '취업 준비중 스터디를 찾아보다 개발자 스터디 플랫폼을 개발해보고자 진행한 프로젝트입니다. Airbnb의 UI를 참고하였으며 Nextjs 적용을 목표로 진행했습니다.',
    reviews: [
      {
        title: '최신버전 툴의 안정성',
        content:
          '최신버전을 공부하고자 하는 목적에 맞게 Nextjs13을 사용했는데 다른 라이브러리와의 충돌이나 에러 발생시 사례를 찾기 힘들다 보니 어려웠던 것 같습니다. 하지만 덕분에 공식문서와 깃헙 이슈를 찾아보는데 익숙해 질 수 있었습니다.',
      },
      {
        title: '모든 방면에서 우수한 하나의 툴은 없다',
        content:
          '이전 프로젝트에서 Styled Component를 너무 잘 사용했고 이보다 좋은 css 라이브러리가 있을까 싶었는데, 이번 프로젝트에서 Tailwind를 사용하면서 또 다른 편리함을 느꼈습니다. 하나의 툴을 맹신하지 않고 새로운 툴을 사용해보는 것에 대한 거부감을 줄이는 좋은 경험이었습니다.',
      },
    ],
    issues: [
      {
        title: 'Server side rendering',
        content:
          'Nextjs 13의 Server Side Rendering과 Data Fetching을 사용해보았습니다. 클라이언트에서 http 메서드로 서버에 데이터 요청 방식뿐만 아니라 SSR의 서버 컴포넌트에서 미리 데이터를 조회 후 클라이언트 컴포넌트와 동시에 전달해주는 방식을 사용해 보면서 SSR을 이해하고자 했습니다.',
      },
      {
        title: '반응형 웹과 적응형 웹',
        content:
          '넓은 화면을 기준으로 개발 후 사이즈만 줄이는 방식을 사용하니 가로로 배치된 UI들이 모바일 환경에서 제대로 표시되지 않았습니다. 사이즈 변경 뿐만 아니라 각 기기별로 화면의 UI 배치가 적절히 바뀌도록 했습니다. Tailwind가 사이즈별 스타일을 설정하는데 편리했던 것 같습니다.',
      },
      {
        title: '클라이언트에서 사용할 데이터를 다루는 방식',
        content:
          '스터디 일지 페이지에서 데이터를 로드하는 방식에 대해 고민했습니다. 달력에 일지가 작성된 날짜는 표시하려니 한번에 모든 일지를 불러와야 했는데 이는 처음 페이지 로딩시간을 늦추는 문제가 발생하기 때문에 작성된 날짜와 실제 작성된 일지 데이터를 분리 했습니다.',
      },
    ],
  },
];

export default projectsData;
