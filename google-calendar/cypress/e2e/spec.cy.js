/// <reference types="Cypress" / >
import EVENT from "../../src/sample/EVENT.json";

describe("달력 UI", () => {
  const YEAR = 2017;
  const MONTH = 2;
  const DATE = 14;

  beforeEach(() => {
    cy.clock(timeFor(YEAR, MONTH, DATE), ["Date"]).then((clock) => clock.bind(window));
    cy.visit("/calendar");
  });

  describe("주간 스케줄 보기", () => {
    it("주간 스케줄 보기 형태로 오늘 날짜가 속한 일주일의 달력이 보여야 한다.", () => {
      cy.getBySel("ui-daily").should("have.length", 7);
      cy.getBySel("ui-today").should("have.text", DATE);
    });

    it("사용자가 이전 주와 다음 주 달력으로 이동할 수 있는 좌우 버튼이 있어야 한다.", () => {
      cy.getBySel("btn-prev").should("exist");
      cy.getBySel("btn-next").should("exist");
    });

    it("X축 방향으로는 요일과 날짜가 표기되어야 하고, Y축 방향으로는 1시간 단위로 시간대가 표기되어야 한다.", () => {
      cy.getBySel("ui-day").should("have.length", 7);
      cy.getBySel("ui-date").should("have.length", 7);
      cy.getBySel("ui-hour").should("have.length", 24 * 7);
    });

    it("사용자가 이전 주로 이동하는 버튼을 클릭할 경우, 지난 주에 해당하는 7일 간의 일정이 보여야 한다. ", () => {
      cy.getBySel("btn-prev").click();
      cy.getBySel("ui-daily").should("have.length", 7);
      cy.getBySel("ui-today").should("not.exist");
      cy.getBySel("ui-date").each((date) => shouldBeEarlierThanToday(date));
    });

    it("사용자가 다음 주로 이동하는 버튼을 클릭할 경우, 다음 주에 해당하는 7일 간의 일정이 보여져야 한다.", () => {
      cy.getBySel("btn-next").click();
      cy.getBySel("ui-daily").should("have.length", 7);
      cy.getBySel("ui-today").should("not.exist");
      cy.getBySel("ui-date").each((date) => shouldBeLaterThanToday(date));
    });

    it("특정 날짜와 시간에 이벤트가 존재할 경우, 이벤트의 이름이 일정에 표기되어야 한다.", () => {
      cy.getBySel("event").first().within(() => {
        cy.getBySel("event-title").should("have.text", EVENT.title);
      });
    });

    it("사용자가 이벤트를 클릭할 경우, 이벤트 상세정보 UI로 이동한다.", () => {
      cy.getBySel("event").first().click();
      cy.url().should("include", `/events/${EVENT.id}`);
    });

    it("사용자가 일간 스케줄 보기 형태로 전환할 수 있는 버튼이 있어야 한다.", () => {
      cy.getBySel("btn-daily").should("exist");
    });

    it("사용자가 일간 스케줄 보기로 전환할 경우, 오늘 날짜에 해당하는 일간 스케줄이 보여져야 한다.", () => {
      cy.getBySel("btn-daily").click();
      cy.getBySel("ui-daily").should("have.length", 1);
      cy.getBySel("ui-today").should("have.text", DATE);
    });

    it("사용자가 일정이 없는 공간을 클릭할 경우, 이벤트 폼 UI로 이동한다.", () => {
      cy.getBySel("btn-empty").click({ force: true });
      cy.url().should("include", "/events/new");
    });
  });

  describe("일간 스케줄 보기", () => {
    beforeEach(() => {
      cy.getBySel("btn-daily").click();
    });

    it("사용자가 이전 날짜와 다음 날짜로 이동할 수 있는 좌우 버튼이 있어야 한다.", () => {
      cy.getBySel("btn-prev").should("exist");
      cy.getBySel("btn-next").should("exist");
    });

    it("X축 방향으로는 요일과 날짜가 표기되어야 하고, Y축 방향으로는 1시간 단위로 시간대가 표기되어야 한다.", () => {
      cy.getBySel("ui-day").should("have.length", 1);
      cy.getBySel("ui-date").should("have.length", 1);
      cy.getBySel("ui-hour").should("have.length", 24);
    });

    it("사용자가 이전 날짜로 이동하는 버튼을 클릭할 경우, 하루 전에 해당하는 날짜의 일정이 보여져야 한다.", () => {
      cy.getBySel("btn-prev").click();
      cy.getBySel("ui-daily").should("have.length", 1);
      cy.getBySel("ui-today").should("not.exist");
      cy.getBySel("ui-date").should("have.text", DATE - 1);
    });

    it("사용자가 다음 날짜로 이동하는 버튼을 클릭할 경우, 다음 날에 해당하는 날짜의 일정이 보여져야 한다.", () => {
      cy.getBySel("btn-next").click();
      cy.getBySel("ui-daily").should("have.length", 1);
      cy.getBySel("ui-today").should("not.exist");
      cy.getBySel("ui-date").should("have.text", DATE + 1);
    });

    it("특정 시간에 이벤트가 존재할 경우, 이벤트의 이름이 일정에 표기되어야 한다.", () => {
      cy.getBySel("event").first().within(() => {
        cy.getBySel("event-title").should("have.text", EVENT.title);
      });
    });

    it("사용자가 이벤트를 클릭할 경우, 이벤트 상세정보 UI로 이동한다.", () => {
      cy.getBySel("event").first().click();
      cy.url().should("include", `/events/${EVENT.id}`);
    });

    it("사용자가 주간 스케줄 보기 형태로 전환할 수 있는 버튼이 있어야 한다.", () => {
      cy.getBySel("btn-weekly").should("exist");
    });

    it("사용자가 주간 스케줄 보기로 전환할 경우, 오늘 날짜에 해당하는 주간 스케줄이 보여져야 한다.", () => {
      cy.getBySel("btn-weekly").click();
      cy.getBySel("ui-daily").should("have.length", 7);
      cy.getBySel("ui-today").should("have.text", DATE);
    });

    it("사용자가 일정이 없는 공간을 클릭할 경우, 이벤트 폼 UI로 이동한다.", () => {
      cy.getBySel("btn-empty").click({ force: true });
      cy.url().should("include", "/events/new");
    });
  });

  const timeFor = (year, month, date) => new Date(Date.UTC(year, month, date)).getTime();

  const shouldBeEarlierThanToday = date =>
    cy.wrap(date)
      .invoke("text")
      .then((text) => {
        expect(Number(text.trim())).to.be.lessThan(DATE);
      });

  const shouldBeLaterThanToday = date =>
    cy.wrap(date)
      .invoke("text")
      .then((text) => {
        expect(Number(text.trim())).to.be.greaterThan(DATE);
      });
});

describe("이벤트 폼 UI", () => {
  beforeEach(() => {
    cy.visit("/events/new");
  });

  it("이벤트를 생성할 수 있는 양식에 사용자는 이름, 상세 설명, 시작 날짜 및 시간, 종료 날짜 및 시간을 입력할 수 있어야 한다.", () => {
    cy.getBySel("input-name").type(EVENT.title);
    cy.getBySel("input-description").type(EVENT.description);
    cy.getBySel("input-start-date").type(EVENT.date);
    cy.getBySel("input-start-time").type(EVENT.startedAt);
    cy.getBySel("input-end-date").type(EVENT.date);
    cy.getBySel("input-end-time").type(EVENT.endedAt);
  });

  it("이름, 상세 설명, 시작 날짜 및 시간, 종료 날짜 및 시간은 필수 정보다.", () => {
    cy.getBySel("ui-required").should("have.length", 6);
    cy.getBySel("btn-submit").should("be.disabled");

    cy.getBySel("input-name").type(EVENT.title);
    cy.getBySel("input-description").type(EVENT.description);
    cy.getBySel("input-start-date").type(EVENT.date);
    cy.getBySel("input-start-time").type(EVENT.startedAt);
    cy.getBySel("input-end-date").type(EVENT.date);
    cy.getBySel("input-end-time").type(EVENT.endedAt);

    cy.getBySel("btn-submit").should("not.be.disabled");
  });

  it("이벤트 생성이 완료된 이후, 캘린더 UI로 이동해야 하고 일정은 일간 스케줄, 주간 스케줄 중 사용자가 이전에 마지막으로 사용했던 모드로 보여져야 한다.", () => {
    cy.visit("/calendar");
    cy.getBySel("btn-daily").click();
    cy.getBySel("btn-empty").click({ force: true });

    cy.getBySel("input-name").type("이벤트 이름");
    cy.getBySel("input-description").type("이벤트 설명");
    cy.getBySel("input-start-date").type("2017-02-14");
    cy.getBySel("input-start-time").type("12:00");
    cy.getBySel("input-end-date").type("2017-02-14");
    cy.getBySel("input-end-time").type("13:00");
    cy.getBySel("btn-submit").click();

    cy.url().should("include", "/calendar");
    cy.getBySel("ui-daily").should("have.length", 1);
  });
});

describe("이벤트 상세정보 UI", () => {
  beforeEach(() => {
    cy.visit(`/events/${EVENT.id}`);
  });

  it("이벤트 이름, 상세 설명, 시작 날짜 및 시간, 종료 날짜 및 시간에 대한 정보를 보여주어야 한다.", () => {
    cy.getBySel("input-name").should("have.value", EVENT.title);
    cy.getBySel("input-description").should("have.value", EVENT.description);
    cy.getBySel("input-start-date").should("have.value", EVENT.date);
    cy.getBySel("input-start-time").should("have.value", EVENT.startedAt);
    cy.getBySel("input-end-date").should("have.value", EVENT.date);
    cy.getBySel("input-end-time").should("have.value", EVENT.endedAt);
  });

  it("사용자는 모든 입력 사항에 대해 수정할 수 있다.", () => {
    cy.getBySel("input-name").type("마케팅 부서 런치 미팅");
    cy.getBySel("input-description").type("신제품 출시 관련 마케팅 전략 논의");
    cy.getBySel("input-start-date").type("2024-07-18");
    cy.getBySel("input-start-time").type("13:00");
    cy.getBySel("input-end-date").type("2024-07-18");
    cy.getBySel("input-end-time").type("15:00");
    cy.getBySel("btn-submit").click();
  });

  it("삭제 버튼을 이용하여 사용자는 이벤트를 삭제할 수 있다.", () => {
    cy.getBySel("btn-delete").click();
    cy.getBySel("ui-delete-alert").should("exist");
  });

  it("존재하지 않거나 유효하지 않은 event_id로 접근한다면 유효하지 않은 이벤트라는 정보를 표시해주어야 한다.", () => {
    cy.visit("/events/invalid-id");
    cy.getBySel("ui-invalid-event-id").should("exist");
  });

  describe("기타", () => {
    it("/로 진입시, 캘린더 UI로 전환한다.", () => {
      cy.visit("/");
      cy.url().should("include", "/calendar");
    });
  });
});
