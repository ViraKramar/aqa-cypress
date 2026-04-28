const socialLinks = ["facebook", "t.me", "youtube", "instagram", "linkedin"];

describe("QAuto landing page header and footer", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("finds all header buttons", () => {
    cy.get("header").within(() => {
      cy.contains("a.header-link", "Home").should("be.visible");
      cy.contains("button.header-link", "About").should("be.visible");
      cy.contains("button.header-link", "Contacts").should("be.visible");
      cy.contains("button", "Guest log in").should("be.visible");
      cy.contains("button", "Sign In").should("be.visible");
    });
  });

  it("finds the Sign up button", () => {
    cy.contains("button", "Sign up").should("be.visible");
  });

  it("finds all contact social links", () => {
    cy.get(".contacts_socials").within(() => {
      socialLinks.forEach((socialLink) => {
        cy.get(`a.socials_link[href*="${socialLink}"]`).should("be.visible");
      });
    });
  });

  it("finds contact website and email links", () => {
    cy.contains("a.contacts_link", "ithillel.ua").should("be.visible");
    cy.contains("a.contacts_link", "support@ithillel.ua").should("be.visible");
  });
});
