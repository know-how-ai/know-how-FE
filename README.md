## 모두의 커리어 코칭 서비스, <span style="color:violet">[**urworkhelper**](https://urworkhelper.net)</span>

[![Running Test then Merge by Dev branch](https://github.com/know-how-ai/know-how-FE/actions/workflows/github-actions.yaml/badge.svg?branch=main)](https://github.com/know-how-ai/know-how-FE/actions/workflows/github-actions.yaml)

## **_목차_**

0. [개요](#0-개요)
1. [서비스 다이어그램](#1-서비스-다이어그램)
2. [기술 스택](#2-기술-스택)
3. [프로젝트 상세](#3-프로젝트-상세)
4. [프로젝트 환경](#4-프로젝트-환경)
5. [프로젝트 스크립트](#5-프로젝트-스크립트)

---

![preview](public/service_preview.gif)

---

## _0. 개요_

-   [Front-end Repository](https://github.com/know-how-ai/know-how-FE) | [Back-end Repository](https://github.com/know-how-ai/know-how-BE)

    | 구성원                                              | 역할   | 수행                                                           |
    | --------------------------------------------------- | ------ | -------------------------------------------------------------- |
    | [songforthemute](https://github.com/songforthemute) | 리드   | 프런트엔드, 백엔드 보일러플레이트 구축, 데브옵스, 코드 리뷰 등 |
    | [error-coder](https://github.com/error-coder)       | 백엔드 | API 작성, 데이터베이스 마이그레이션, 코드 리뷰 등              |

-   이 프로젝트는 **AI 커리어 코칭 서비스** 프로젝트로, `Next.js`와 `Express.js` 등을 이용해 개발한 웹 서비스입니다.

-   취업 준비를 하며, 자기소개서 등의 서류 준비나 면접 준비가 쉽지 않다는 것을 느꼈습니다. 그래서 이런 문제에서 인공지능을 이용해 피드백을 제공하여 결점을 보완하고, 혼자서는 예상하지 못했던 부분을 예상할 수 있도록 하여 취업 성공의 확률을 높여주는 코칭 서비스를 만들어보고자 진행하게 되었습니다.

-   _현재 openai의 api 응답이 느려, 정상적인 응답을 받지 못하는 경우가 간혹 있습니다. 이 경우, 잠시 후에 다시 시도해주시거나, 인내심을 갖고 기다려주시면 감사하겠습니다._

---

## _1. 서비스 다이어그램_

-   #### 서비스 아키텍처

    ![infra acrh-png](https://github.com/know-how-ai/know-how-FE/assets/105373350/80bb2cce-a0d9-4eaf-9534-f57ffc62070e)

-   #### 데이터베이스 ERD

      <img width="480" alt="스크린샷 2023-08-29 오후 9 05 19" src="https://github.com/know-how-ai/know-how-BE/assets/105373350/465dc6fc-6654-4d9b-bb50-cb3fd00e906d">

---

## _2. 기술 스택_

-   **Language** | `TypeScript`, `JavaScript`

-   **Core** | `Next.js`, `Express.js`

-   **Architecture** | MVC 아키텍처 기반의 프런트엔드-백엔드 애플리케이션 분리 구축

-   **Development Methodology** | 상향식 컴포넌트 주도 개발, 아토믹 디자인 시스템(Front-end, 4 steps)

-   **State Management** | `Redux (w/ Redux Toolkit)`, `Redux-persist (/w Local Storage)`

-   **Style** | `Styled-components`, `Framer-motion`

-   **Database** | `MySQL`, `Sequelize`, `Redis`

-   **Infrastructure** | `AWS S3`, `AWS CloudFront`, `AWS Route 53`, `AWS Lightsail`, `Github Actions`, `Apache`

-   **Test** | `Jest`, `Storybook`

-   **Lint** | `ESLint`, `Prettier`

-   **etc.** | `Openai`

---

## _3. 프로젝트 상세_

#### Front-end

-   이 프로젝트의 프런트엔드 파트는 `Next.js`와 `TypeScript`로 작성되었으며, `AWS S3` 스토리지 서비스와 `AWS CloudFront` CDN 서비스를 통해 정적 호스팅을 제공하고 있습니다.

-   프런트엔드 애플리케이션은 컴포넌트 주도 개발 방법론을 따라 **아토믹 디자인 시스템(Atomic Design System)** 아키텍처를 커스텀하여 상향식으로 작성했습니다.

    > _`Atoms`, `Molecules`, `Organisms`, `Pages`의 네 단계로 나누어 컴포넌트 레벨을 디자인하고, UI의 일관성을 높게 유지할 수 있었습니다. 또한 이 방법론을 통해, 하위 컴포넌트에 가까워질수록 순수한 UI 컴포넌트로 사용할 수 있도록 로직과 분리시켰으며, 상위 컴포넌트에 가까울수록 로직에 보다 집중할 수 있도록 시도했습니다._

-   프런트엔드 애플리케이션의 상태 관리는 `Redux`를 `Redux Toolkit`으로 이용했습니다. 브라우저의 새로 고침 시, 상태가 초기화되는 현상을 막기 위해 `Redux-persist`를 채용하며 브라우저의 `Local Storage`를 이용해 이에 대응했습니다.

-   스타일링은 `Styled-components`를 이용해 구성했으며, 라이트 테마와 다크 테마의 두 가지 테마 모드를 구현했습니다. 인터랙션은 `Framer-motion`을 이용해 구현했습니다.

-   모달 UI를 통해 사용자 인증을 시도하게 함으로써, 비 로그인 시, 현재 작성 중인 폼의 내용을 유지하면서 인증을 시도할 수 있는 방식으로 구현했습니다.

-   토스트 UI를 통해 사용자에게 서비스의 현재 상태를 알림으로 전달하여 인터랙티브하고 반응성이 좋다는 인식을 줄 수 있도록 유도하였습니다.

-   단위 테스트는 `Jest` 프레임워크를 이용해 시행하고, UI 테스트는 `Storybook`을 이용하였습니다. <span style="color:gray">_2023-08-28 기준 코드 커버리지는 85.47%입니다. 향후 애플리케이션의 안정성을 검증하기 위해 다양한 테스트를 추가할 예정입니다._</span>

-   `Github Actions`를 이용한 테스트 자동화를 도입하고, 테스트 통과 시에 메인 브랜치로 푸시하는 전략을 도입하는 과정 속에서, `actions/cache` 액션 패키지를 이용해 이전과 동일한 의존성 패키지라면 캐싱한 데이터를 사용하는 캐싱 전략을 도입해, 2분 이상이 소요되는 워크플로우를 1분 내외로 줄이며 약 50%를 절약했습니다.

#### Back-end

-   이 프로젝트의 백엔드 파트는 `Express.js`와 `JavaScript`로 작성되었으며, `AWS Lightsail` VPS의 `Devian Linux`에서 구동 중입니다.

-   `MVC` 아키텍처를 기반으로, View 계층을 담당하는 `Next.js`를 Controller 계층인 `Express.js`와 분리해서 개발하여 Controller와 View 계층 간 결합도를 낮춰 의존성을 덜어내고, 유지보수성과 확장성을 더욱 확보했습니다. 프런트엔드 애플리케이션과 백엔드 애플리케이션 간의 통신은 `JSON` 인터페이스와 HTTP/S 프로토콜을 이용해 구성했습니다.

-   백엔드 애플리케이션 또한 상향식 컴포넌트 주도 개발 방법론에 근거해 책임을 최소화하여 컨트롤러를 작성하고, 컨트롤러로 하여금 하나의 역할을 수행하는 미들웨어를 작성하며 각각의 API 엔드포인트를 완성했는데, 이 과정을 통해 의존성을 최소화시키고 기능을 단순화시키려 시도했습니다. <span style="color:gray">_신뢰할 수 있고 유지보수가 용이한 소프트웨어를 구축하기 위해 테스트 코드를 추가할 예정입니다._</span>

-   `Apache` 서버를 리버스 프록시 서버로 사용하여 SSL/TLS 암호화를 적용하고 전체적인 부하를 분산했습니다.

-   데이터베이스는 `MySQL`을 이용했으며, 빠르게 서비스의 MVP를 완성시키고자 `Sequelize` ORM을 이용해 쿼리를 처리했습니다.

-   `Node.js`의 싱글 스레드 방식에 따른 하나의 스레드가 멈춰 서비스가 중단될 경우를 대비해, `pm2.js`를 이용해 여러 프로세스를 두고 관리했습니다.

-   `Openai` API는 사용량에 따라 과금되므로 보안이 중요하고, 네트워크 통신을 통한 페이로드 교환이 많은 서비스의 특성 상, Session Cookie 방식이 유리하다 판단하여 해당 방식으로 인증을 구현했으며, 프로세스 간 세션 공유가 어려운 점을 인 메모리 데이터베이스 시스템인 `Redis`를 이용해 해결했습니다.

-   `Openai` API를 이용하여 서비스를 구축하며, API 이용에 따른 과금을 조절하기 위한 장치로 포인트 제도를 도입하고 서비스 이용 로그 테이블을 만들어, 사용자에게는 서비스 이용 로그를 제공함과 동시에 서비스 이용 한도를 제어할 수 있도록 구축했습니다.

-   2인의 팀으로 개발을 진행했기 때문에 `Git`, `Github`를 통해 각각의 개인 브랜치를 두고, 코드 리뷰를 통해서 코드 통합을 이루는 전략을 도입했습니다. 또한, 코드 스타일의 통일을 위해 `Prettier`, `ESLint`의 린팅 도구를 도입했습니다.

---

## _4. 프로젝트 환경_

-   ### 개발 환경

    -   Editor : `Visual Studio Code`
    -   OS : `Mac OS Ventura 13.5.1 (w/ Apple M1)`
    -   Runtime : `Node.js v16.14.0`
    -   Dependency Manager : `npm`, `yarn`
    -   Browser : `Chrome` | `Safari` | `Vivaldi` | `Brave`

-   ### 서버 환경

    -   OS : `Debian Linux 11`
    -   DB : `MariaDB 10`
    -   Runtime : `Node.js v18`
    -   Dependency Manager : `npm`

---

## _5. 프로젝트 스크립트_

```
# Run application as dev mode
npm run dev
# or
yarn dev
```

```
# Build the application(Front-end)
npm run build
# or
yarn build

# Build the application as static files(Front-end)
npm run build:ssg
# or
yarn build:ssg
```

```
# Run test by jest watch mode
npm run test
# or
yarn test

# Run test by jest & check coverage
npm run test:ci
# or
yarn test:ci
```

```
# Build & Run the storybook(Front-end)
npm run storybook
# or
yarn storybook
```

---

<h3 align="center">
<i style="color:orange">
Thank you for visit, <br/>
Have a great day! <br/>
<i>
</h3>

---
