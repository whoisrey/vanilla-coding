/// <reference types="Cypress" / >

const KEYWORD = "바닐라코딩";

describe("영상 목록 UI", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("영상 목록이 보여야 한다.", () => {
    cy.getBySel("video-list").should("be.visible");
  });

  it("영상 목록의 각 항목이 최소 10개가 보여야 한다.", () => {
    cy.getBySel("video-list").children().should("have.length.least", 10);
  });

  it("초기 진입시 영상 목록은 5개씩 최소 2줄(5 x 2) 이상이 보여야 한다.", () => {
    cy.get("[data-test^=video-item-]").as("videoItems");

    cy.get("@videoItems").should("have.length.least", 10);

    cy.get("@videoItems")
      .invoke("position")
      .its("top")
      .then((position) => {
        cy.get("@videoItems")
          .first(5)
          .invoke("position")
          .its("top")
          .should("eq", position);

        cy.get("@videoItems")
          .last(5)
          .invoke("position")
          .its("top")
          .should("not.eq", position);
      });
  });

  it("영상 목록의 각 항목은 썸네일, 제목, 설명을 보여야 한다.", () => {
    cy.get("[data-test^=video-item-]")
      .first()
      .within(() => {
        cy.getBySel("video-thumbnail").should("be.visible");
        cy.getBySel("video-title").should("be.visible");
        cy.getBySel("video-description").should("be.visible");
      });
  });

  it("영상 목록의 설명은 30 글자 이상일 경우, 생략 처리가 되어야 한다.", () => {
    cy.getBySel("video-description").each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .then((description) => {
          if (description.length > 30) {
            return cy
              .wrap($el)
              .should("have.text", `${description.slice(0, 30)}...`);
          }

          cy.wrap($el).should("have.length.lessThan", 31);
        });
    });
  });

  it("사용자가 페이지 하단으로 스크롤하면 새로운 영상 목록이 추가로 보여야 한다.", () => {
    cy.get("[data-test^=video-item-]")
      .its("length")
      .then((initialLength) => {
        cy.scrollTo("bottom");
        cy.wait(100);

        cy.get("[data-test^=video-item-]")
          .its("length")
          .should("be.greaterThan", initialLength);
      });
  });

  it("영상 목록의 각 항목을 클릭하면 영상 상세 페이지로 이동해야 한다.", () => {
    cy.get("[data-test^=video-item-]").first().as("videoItem");

    cy.get("@videoItem")
      .invoke("attr", "data-test")
      .then((dataTest) => {
        const videoId = dataTest.split("-").pop();

        cy.get("@videoItem").click();
        cy.url().should("include", `/${videoId}`);
      });
  });

  it("검색어를 입력할 수 있는 Input이 보여야 한다.", () => {
    cy.getBySel("input-search").should("be.visible");
    cy.getBySel("input-search").should("be.enabled");
    cy.getBySel("input-search").should("have.attr", "type", "text");
  });

  it("검색어를 입력하면 검색어가 변경되어야 한다.", () => {
    cy.getBySel("input-search").clear();
    cy.getBySel("input-search").type(KEYWORD);
    cy.getBySel("input-search").should("have.value", KEYWORD);
  });

  it("검색어를 입력하고 엔터를 누르면 url에 검색어 쿼리가 추가되어야 한다.", () => {
    cy.getBySel("input-search").clear();
    cy.getBySel("input-search").type("vaco{enter}");
    cy.url().should("include", "q=vaco");
  });

  it("검색어가 포함된 URL(예: `/?q=바닐라코딩`)로 초기 진입할 경우, 랜덤한 영상 목록이 아닌 검색 결과 목록을 보여주어야 한다.", () => {
    cy.visit(`/?q=${encodeURIComponent(KEYWORD)}`);

    cy.intercept("GET", "https://www.googleapis.com/youtube/v3/search*", {
      fixture: "search.json",
      delay: 1000,
    }).as("getSearchApi");

    cy.get("@getSearchApi")
      .its("response.body.items")
      .then((items) => {
        const videoIds = items.map((item) => item.id.videoId);

        cy.get("[data-test^=video-item-]").each(($video, index) => {
          const videoId = videoIds[index];
          cy.wrap($video).should(
            "have.attr",
            "data-test",
            `video-item-${videoId}`
          );
        });
      });
  });

  it("사용자가 검색어를 입력하고 엔터를 누르면 기존 영상 목록이 사라지고 새로운 영상 목록이 보여야 한다.", () => {
    cy.get("[data-test^=video-item-]").as("prevVideos");

    cy.getBySel("input-search").clear();
    cy.getBySel("input-search").type(KEYWORD + "{enter}");

    cy.get("[data-test^=video-item-]").as("newVideos");

    cy.get("@prevVideos").should("not.deep.equal", "@newVideos");
  });

  it("빈 검색어를 입력하고 엔터를 누르면 검색어를 다시 확인해 달라는 메시지가 모달 UI로 보여야 한다.", () => {
    cy.getBySel("error-message-modal").should("not.exist");

    cy.getBySel("input-search").clear();
    cy.getBySel("input-search").type("{enter}");

    cy.getBySel("error-message-modal").should("be.visible");
  });
});

describe("영상 상세 정보: Modal UI", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get("[data-test^=video-item-]").first().as("videoItem");

    cy.get("@videoItem").then(() => {
      cy.get("@videoItem").click();
    });
  });

  it("사용자가 선택한 영상에 대하여 상세 정보를 보여야 한다.", () => {
    cy.getBySel("video-title").should("be.visible");
    cy.getBySel("video-description").should("be.visible");
    cy.getBySel("video-published-at").should("be.visible");

    cy.get("iframe")
      .should("be.visible")
      .then(($iframe) => {
        const playerUrl = $iframe.attr("src");
        expect(playerUrl).to.include("youtube.com/embed");
      });
  });

  it("모달 UI가 보이면 닫기 버튼을 누르면 모달이 닫혀야 한다.", () => {
    cy.getBySel("video-modal").should("be.visible");

    cy.getBySel("btn-modal-close").click();

    cy.getBySel("video-modal").should("not.exist");
  });

  it("모달 UI에는 닫기 버튼이 있어야 한다, 닫기 버튼을 누르면 모달이 닫히고 화면 1로 이동해야 한다.", () => {
    cy.getBySel("video-modal").should("be.visible");

    cy.getBySel("btn-modal-close").should("be.visible");
    cy.getBySel("btn-modal-close").click();

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });

  it("모달을 닫으면 기존 영상 목록과 스크롤 위치가 유지되어야 한다.", () => {
    cy.getBySel("btn-modal-close").click();

    cy.scrollTo("bottom");

    cy.get("[data-test^=video-item-]").then(($videos) => {
      const initialTitles = Array.from(
        $videos,
        ($video) => $video.querySelector("[data-test=video-title]").textContent
      );
      const initialDescriptions = Array.from(
        $videos,
        ($video) =>
          $video.querySelector("[data-test=video-description]").textContent
      );
      cy.wrap({ initialTitles, initialDescriptions }).as("initialVideos");
    });
    cy.window().its("pageYOffset").as("initialScrollPosition");

    cy.get("[data-test^=video-item-]").last().click();
    cy.getBySel("video-modal").should("be.visible");

    cy.getBySel("btn-modal-close").click();
    cy.getBySel("video-modal").should("not.exist");

    cy.get("[data-test^=video-item-]").then(($videos) => {
      const currentTitles = Array.from(
        $videos,
        ($video) => $video.querySelector("[data-test=video-title]").textContent
      );
      const currentDescriptions = Array.from(
        $videos,
        ($video) =>
          $video.querySelector("[data-test=video-description]").textContent
      );
      cy.get("@initialVideos").should("deep.equal", {
        initialTitles: currentTitles,
        initialDescriptions: currentDescriptions,
      });
    });

    cy.window()
      .its("pageYOffset")
      .then((currentOffset) => {
        cy.get("@initialScrollPosition").then((initialOffset) => {
          expect(currentOffset).to.equal(initialOffset);
        });
      });
  });

  it("모달의 크기는 전체 화면보다 작아야 한다.", () => {
    cy.getBySel("video-modal").should("be.visible");

    cy.getBySel("video-modal").then(($modal) => {
      const modalWidth = $modal.outerWidth();
      const modalHeight = $modal.outerHeight();
      const windowWidth = Cypress.config("viewportWidth");
      const windowHeight = Cypress.config("viewportHeight");

      expect(modalWidth).to.be.lessThan(windowWidth);
      expect(modalHeight).to.be.lessThan(windowHeight);
    });
  });

  it("모달 외곽을 클릭하면 모달이 닫혀야 한다.", () => {
    cy.getBySel("video-modal").should("be.visible");

    cy.get("body").click("topRight");

    cy.getBySel("video-modal").should("not.exist");
  });
});
