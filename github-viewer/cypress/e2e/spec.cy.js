/// <reference types="Cypress" / >

import LANGUAGES from "../fixtures/languages";

const { en: language, fixtureFileName } =
  LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];

describe("메인 네비게이션 UI", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("인기 저장소 버튼과 GitHub 대결 버튼이 보여야 한다.", () => {
    cy.getBySel("btn-popular").should("exist");
    cy.getBySel("btn-battle").should("exist");
  });

  it("기본적으로 인기 저장소 버튼은 활성화되어 있어야 한다.", () => {
    cy.getBySel("btn-popular").should("have.class", "active");
    cy.getBySel("btn-battle").should("not.have.class", "active");
  });

  it("GitHub 대결 버튼을 누르면 인기 저장소 버튼은 비활성화되어야 한다.", () => {
    cy.getBySel("btn-battle").click();
    cy.getBySel("btn-popular").should("not.have.class", "active");
    cy.getBySel("btn-battle").should("have.class", "active");
  });

  it("GitHub 대결 버튼을 누르면 대결 UI가 보여야 한다.", () => {
    cy.getBySel("btn-battle").click();
    cy.getBySel("ui-battle").should("exist");
    cy.getBySel("ui-popular").should("not.exist");
  });
});

describe("인기 저장소 UI", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("프로그래밍 언어 선택 메뉴에는 옵션의 수가 8개여야 한다.", () => {
    cy.getBySel("nav-languages").children().should("have.length", 8);
  });

  it("기본적으로 프로그래밍 언어 선택 메뉴는 첫번째 옵션이 선택되어 있어야 한다.", () => {
    cy.getBySel(`btn-language-${LANGUAGES[0].en}`).should(
      "have.class",
      "selected"
    );
    cy.getBySel(`btn-language-${LANGUAGES[1].en}`).should(
      "not.have.class",
      "selected"
    );
  });

  it("프로그래밍 언어 선택 메뉴에서 하나를 누르면 선택된 언어에 관한 저장소들만 보여야 한다.", () => {
    cy.intercept("GET", "https://api.github.com/search/repositories*", {
      fixture: fixtureFileName,
    }).as("getPopularRepositories");
    cy.wait("@getPopularRepositories");

    cy.getBySel(`btn-language-${language}`).click();

    cy.fixture(fixtureFileName).then((repositories) => {
      const { stargazers_count, forks, open_issues } = repositories.items[0];

      cy.getBySel("list-stars-0").contains(stargazers_count.toLocaleString());
      cy.getBySel("list-forks-0").contains(forks.toLocaleString());
      cy.getBySel("list-issues-0").contains(open_issues.toLocaleString());
    });
  });

  it("관련 저장소의 데이터를 가져오는 중이라면, 로딩 UI가 보여야 한다.", () => {
    cy.getBySel("ui-loading").should("exist");

    cy.intercept("GET", "https://api.github.com/search/repositories*", {
      fixture: fixtureFileName,
      delay: 1000,
    }).as("getPopularRepositories");
    cy.wait("@getPopularRepositories");

    cy.getBySel("ui-loading").should("not.exist");
  });

  it("관련 저장소의 데이터를 가져오는 중에 오류가 생겼다면, 오류 메시지를 보여주는 UI가 화면에 나타나야 한다.", () => {
    cy.getBySel("error-message-popular").should("not.exist");

    cy.intercept("GET", "https://api.github.com/search/repositories*", {
      forceNetworkError: true,
    }).as("getPopularRepositories");
    cy.wait("@getPopularRepositories");

    cy.getBySel("error-message-popular").should("exist");
  });
});
