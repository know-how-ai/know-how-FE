describe("라우트 이동 테스트", () => {
    it("Dev 서버 E2E 테스트: '/'", () => {
        cy.visit("/");
        expect(true).equal(true);
    });

    it("'/' => '/coverletter' 이동", () => {
        cy.visit("/").get('a[href="/coverletter"]').click();
        cy.location("pathname").should("equal", "/coverletter");
    });

    it("'/' => '/interview' 이동", () => {
        cy.visit("/").get('a[href="/interview"]').click();
        cy.location("pathname").should("equal", "/interview");
    });

    it("'/' => '/job' 이동", () => {
        cy.visit("/").get('a[href="/job"]').click();
        cy.location("pathname").should("equal", "/job");
    });
});

describe("서비스 이용 테스트: 비로그인 상태", () => {
    it("메인에서 /coverletter 이동 후, 비로그인 상태에서 서비스 이용", () => {
        cy.visit("/").get('a[href="/coverletter"]').click();
        cy.location("pathname").should("equal", "/coverletter");

        cy.get('input[name="job"]').type("개발자");
        cy.get('textarea[name="coverletter"]').type("저는 개발을 좋아합니다.");

        cy.get('button[type="submit"]')
            .click({ waitForAnimations: true })
            .get('div[data-testid="toast"]');
    });

    it("메인에서 /interview 이동 후, 비로그인 상태에서 서비스 이용", () => {
        cy.visit("/").get('a[href="/interview"]').click();
        cy.location("pathname").should("equal", "/interview");

        cy.get('input[name="job"]').type("개발자");
        cy.get('input[name="domain"]').type("IT");
        cy.get('input[name="project"]').type("To do list");
        cy.get('input[name="skill"]').type("Javascript");
        cy.get('textarea[name="description"]').type("To do list 웹 앱 개발");

        cy.get('button[type="submit"]')
            .click({ waitForAnimations: true })
            .get('div[data-testid="toast"]');
    });

    it("메인에서 /job 이동 후, 비로그인 상태에서 서비스 이용", () => {
        cy.visit("/").get('a[href="/job"]').click();
        cy.location("pathname").should("equal", "/job");

        cy.get("input").type("섬세함");
        cy.get('button[aria-label="add personality button"]').click();

        cy.get("input").type("열정");
        cy.get('button[aria-label="add personality button"]').click();

        cy.get('button[aria-label="require recommendation button"]')
            .click({ waitForAnimations: true })
            .get('div[data-testid="toast"]');
    });
});

describe("로그인 모달 테스트", () => {
    it("'/': 로그인 모달 팝업 후, 모달 끄기", () => {
        cy.visit("/");
        cy.get('button[data-testid="sign button"]').click();

        cy.get('div[role="dialog"]');
        cy.get('button[data-testid="close button"]').click();

        cy.get("main").not('div[role="dialog"]');
    });

    it("로그인 모달 팝업 후, 메서드 토글: 접속하기 => 가입하기", () => {
        cy.visit("/");
        cy.get('button[data-testid="sign button"]').click();

        cy.get('h3[data-testid="login heading"]');

        cy.get('button[data-testid="toggle button"]').click();

        cy.get('h3[data-testid="join heading"]');
    });

    it("로그인 모달 팝업 후, 로그인 시도: 서버 점검 상태", () => {
        cy.visit("/");
        cy.get('button[data-testid="sign button"]').click();

        cy.get('input[type="email"]').type("id@example.com");
        cy.get('input[type="password"]').type("1234");

        cy.get('button[type="submit"]')
            .click({ waitForAnimations: true })
            .get('div[data-testid="toast"]');
    });

    it("로그인 모달 팝업 후, 비밀번호 찾기 시도: 서버 점검 상태", () => {
        cy.visit("/");
        cy.get('button[data-testid="sign button"]').click();
        cy.get('button[aria-label="reset password button"]').click();

        cy.get('form[aria-label="checking email form"]');
        cy.get('input[type="email"]').type("id@example.com");

        cy.get('button[aria-label="checking the email button"]')
            .click({ waitForAnimations: true })
            .get('div[data-testid="toast"]');
    });

    it("'/coverletter': 로그인 모달 팝업 후, 모달 끄기", () => {
        cy.visit("/coverletter");
        cy.get('button[data-testid="sign button"]').click();

        cy.get('div[role="dialog"]');
        cy.get('button[data-testid="close button"]').click();

        cy.get("main").not('div[role="dialog"]');
    });

    it("'/interview': 로그인 모달 팝업 후, 모달 끄기", () => {
        cy.visit("/interview");
        cy.get('button[data-testid="sign button"]').click();

        cy.get('div[role="dialog"]');
        cy.get('button[data-testid="close button"]').click();

        cy.get("main").not('div[role="dialog"]');
    });

    it("'/job': 로그인 모달 팝업 후, 모달 끄기", () => {
        cy.visit("/job");
        cy.get('button[data-testid="sign button"]').click();

        cy.get('div[role="dialog"]');
        cy.get('button[data-testid="close button"]').click();

        cy.get("main").not('div[role="dialog"]');
    });
});
