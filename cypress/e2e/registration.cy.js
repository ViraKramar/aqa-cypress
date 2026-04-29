describe("Registration", () => {
  const assertInvalidBorder = (selector) => {
    cy.get(selector)
      .invoke("css", "border-color")
      .should("match", /rgb\(220,\s*53,\s*69\)|rgba\(220,\s*53,\s*69/);
  };

  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.get(".hero-descriptor_btn").click();
  });

  it("displays registration form fields", () => {
    cy.get("app-signup-modal").within(() => {
      cy.contains("h4", "Registration").should("be.visible");

      cy.get("#signupName").should("be.visible");
      cy.get("#signupLastName").should("be.visible");
      cy.get("#signupEmail").should("be.visible");
      cy.get("#signupPassword").should("be.visible");
      cy.get("#signupRepeatPassword").should("be.visible");

      cy.contains("button", "Register").should("be.visible").and("be.disabled");
    });
  });

  it("validates Name field", () => {
    cy.get("app-signup-modal").within(() => {
      // Empty field -> required error
      cy.get("#signupName").focus().blur();
      cy.contains("p", "Name required").should("be.visible");
      cy.get("#signupName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupName");

      // Invalid data -> invalid format error
      cy.get("#signupName").clear().type("J1").blur();
      cy.contains("p", "Name is invalid").should("be.visible");
      cy.get("#signupName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupName");

      // Too short value -> length error
      cy.get("#signupName").clear().type("A").blur();
      cy.contains("p", "Name has to be from 2 to 20 characters long").should("be.visible");
      cy.get("#signupName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupName");

      // Too long value -> length error
      cy.get("#signupName").clear().type("ABCDEFGHIJKLMNOPQRSTU").blur();
      cy.contains("p", "Name has to be from 2 to 20 characters long").should("be.visible");
      cy.get("#signupName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupName");

      // Without letters (digits only) -> invalid format error
      cy.get("#signupName").clear().type("12").blur();
      cy.contains("p", "Name is invalid").should("be.visible");
      cy.get("#signupName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupName");

      // Non-English letters -> invalid format error
      cy.get("#signupName").clear().type("Іван").blur();
      cy.contains("p", "Name is invalid").should("be.visible");
      cy.get("#signupName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupName");

      // Min boundary (2 chars) should be valid
      cy.get("#signupName").clear().type("Jo").blur();
      cy.contains("p", "Name is invalid").should("not.exist");
      cy.contains("p", "Name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupName").should("have.class", "ng-valid");

      // Max boundary (20 chars) should be valid
      cy.get("#signupName").clear().type("ABCDEFGHIJKLMNOPQRST").blur();
      cy.contains("p", "Name is invalid").should("not.exist");
      cy.contains("p", "Name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupName").should("have.class", "ng-valid");

      // Valid value should make field valid
      cy.get("#signupName").clear().type("John").blur();
      cy.contains("p", "Name required").should("not.exist");
      cy.contains("p", "Name is invalid").should("not.exist");
      cy.contains("p", "Name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupName").should("have.class", "ng-valid");
    });
  });

  it("validates Last name field", () => {
    cy.get("app-signup-modal").within(() => {
      // Empty field -> required error
      cy.get("#signupLastName").focus().blur();
      cy.contains("p", "Last name required").should("be.visible");
      cy.get("#signupLastName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupLastName");

      // Invalid data -> invalid format error
      cy.get("#signupLastName").clear().type("D1").blur();
      cy.contains("p", "Last name is invalid").should("be.visible");
      cy.get("#signupLastName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupLastName");

      // Too short value -> length error
      cy.get("#signupLastName").clear().type("A").blur();
      cy.contains("p", "Last name has to be from 2 to 20 characters long").should("be.visible");
      cy.get("#signupLastName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupLastName");

      // Too long value -> length error
      cy.get("#signupLastName").clear().type("ABCDEFGHIJKLMNOPQRSTU").blur();
      cy.contains("p", "Last name has to be from 2 to 20 characters long").should("be.visible");
      cy.get("#signupLastName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupLastName");

      // Without letters (digits only) -> invalid format error
      cy.get("#signupLastName").clear().type("12").blur();
      cy.contains("p", "Last name is invalid").should("be.visible");
      cy.get("#signupLastName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupLastName");

      // Non-English letters -> invalid format error
      cy.get("#signupLastName").clear().type("Іванов").blur();
      cy.contains("p", "Last name is invalid").should("be.visible");
      cy.get("#signupLastName").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupLastName");

      // Min boundary (2 chars) should be valid
      cy.get("#signupLastName").clear().type("Do").blur();
      cy.contains("p", "Last name is invalid").should("not.exist");
      cy.contains("p", "Last name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupLastName").should("have.class", "ng-valid");

      // Max boundary (20 chars) should be valid
      cy.get("#signupLastName").clear().type("ABCDEFGHIJKLMNOPQRST").blur();
      cy.contains("p", "Last name is invalid").should("not.exist");
      cy.contains("p", "Last name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupLastName").should("have.class", "ng-valid");

      // Valid value should make field valid
      cy.get("#signupLastName").clear().type("Doe").blur();
      cy.contains("p", "Last name required").should("not.exist");
      cy.contains("p", "Last name is invalid").should("not.exist");
      cy.contains("p", "Last name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupLastName").should("have.class", "ng-valid");
    });
  });

  it("validates Email field", () => {
    cy.get("app-signup-modal").within(() => {
      // Empty field -> required error
      cy.get("#signupEmail").focus().blur();
      cy.contains("p", "Email required").should("be.visible");
      cy.get("#signupEmail").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupEmail");

      // Wrong data -> incorrect email error
      cy.get("#signupEmail").clear().type("john").blur();
      cy.contains("p", "Email is incorrect").should("be.visible");
      cy.get("#signupEmail").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupEmail");

      // Missing domain part -> incorrect email error
      cy.get("#signupEmail").clear().type("john@").blur();
      cy.contains("p", "Email is incorrect").should("be.visible");
      cy.get("#signupEmail").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupEmail");

      // Missing dot in domain -> incorrect email error
      cy.get("#signupEmail").clear().type("john@example").blur();
      cy.contains("p", "Email is incorrect").should("be.visible");
      cy.get("#signupEmail").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupEmail");

      // Spaces in email -> incorrect email error
      cy.get("#signupEmail").clear().type("john doe@example.com").blur();
      cy.contains("p", "Email is incorrect").should("be.visible");
      cy.get("#signupEmail").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupEmail");

      // Valid email should make field valid
      cy.get("#signupEmail").clear().type("john.doe@example.com").blur();
      cy.contains("p", "Email required").should("not.exist");
      cy.contains("p", "Email is incorrect").should("not.exist");
      cy.get("#signupEmail").should("have.class", "ng-valid");

      // Valid email with plus alias should be accepted
      cy.get("#signupEmail").clear().type("john.doe+qa@example.com").blur();
      cy.contains("p", "Email required").should("not.exist");
      cy.contains("p", "Email is incorrect").should("not.exist");
      cy.get("#signupEmail").should("have.class", "ng-valid");
    });
  });

  it("validates Password field", () => {
    cy.get("app-signup-modal").within(() => {
      const passwordRuleText =
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

      // Empty field -> required error
      cy.get("#signupPassword").focus().blur();
      cy.contains("p", "Password required").should("be.visible");
      cy.get("#signupPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupPassword");

      // Wrong data -> rule error
      cy.get("#signupPassword").clear().type("short", { sensitive: true }).blur();
      cy.contains("p", passwordRuleText).should("be.visible");
      cy.get("#signupPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupPassword");

      // Too long -> rule error
      cy.get("#signupPassword").clear().type("VeryLongPassword123", { sensitive: true }).blur();
      cy.contains("p", passwordRuleText).should("be.visible");
      cy.get("#signupPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupPassword");

      // Without integer -> rule error
      cy.get("#signupPassword").clear().type("Password", { sensitive: true }).blur();
      cy.contains("p", passwordRuleText).should("be.visible");
      cy.get("#signupPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupPassword");

      // Without capital letter -> rule error
      cy.get("#signupPassword").clear().type("password1", { sensitive: true }).blur();
      cy.contains("p", passwordRuleText).should("be.visible");
      cy.get("#signupPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupPassword");

      // Without small letter -> rule error
      cy.get("#signupPassword").clear().type("PASSWORD1", { sensitive: true }).blur();
      cy.contains("p", passwordRuleText).should("be.visible");
      cy.get("#signupPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupPassword");

      // Without letters -> rule error
      cy.get("#signupPassword").clear().type("12345678", { sensitive: true }).blur();
      cy.contains("p", passwordRuleText).should("be.visible");
      cy.get("#signupPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupPassword");

      // Valid password should make field valid
      cy.get("#signupPassword").clear().type("Test1234", { sensitive: true }).blur();
      cy.contains("p", "Password required").should("not.exist");
      cy.contains("p", passwordRuleText).should("not.exist");
      cy.get("#signupPassword").should("have.class", "ng-valid");
    });
  });

  it("validates Re-enter password field", () => {
    cy.get("app-signup-modal").within(() => {
      // Empty field -> required error
      cy.get("#signupRepeatPassword").focus().blur();
      cy.contains("p", "Re-enter password required").should("be.visible");
      cy.get("#signupRepeatPassword").should("have.class", "ng-invalid");
      assertInvalidBorder("#signupRepeatPassword");

      // Fill password and mismatch repeat -> mismatch error
      cy.get("#signupPassword").clear().type("Test1234", { sensitive: true }).blur();
      cy.get("#signupRepeatPassword").clear().type("Test12345", { sensitive: true }).blur();
      cy.contains("p", "Passwords do not match").should("be.visible");
      assertInvalidBorder("#signupRepeatPassword");

      // Matching repeat password should make field valid
      cy.get("#signupRepeatPassword").clear().type("Test1234", { sensitive: true }).blur();
      cy.contains("p", "Re-enter password required").should("not.exist");
      cy.contains("p", "Passwords do not match").should("not.exist");
      cy.get("#signupRepeatPassword").should("have.class", "ng-valid");

      // If password changes afterwards, repeat password becomes invalid again
      cy.get("#signupPassword").clear().type("Newpass123", { sensitive: true }).blur();
      cy.contains("p", "Passwords do not match").should("be.visible");
      assertInvalidBorder("#signupRepeatPassword");
    });
  });

  it("registers a new user with valid data", () => {
    const email = `vira.qa+${Date.now()}@example.com`;
    const password = "Test1234";

    cy.get("app-signup-modal").within(() => {
      cy.get("#signupName").type("John");
      cy.get("#signupLastName").type("Doe");
      cy.get("#signupEmail").type(email);
      cy.get("#signupPassword").type(password, { sensitive: true });
      cy.get("#signupRepeatPassword").type(password, { sensitive: true });

      cy.contains("button", "Register").should("not.be.disabled").click();
    });

    cy.url().should("include", "/panel/garage");
    cy.get("#userNavDropdown").should("be.visible").and("contain.text", "My profile");
    cy.contains("h1", "Garage").should("be.visible");
    cy.contains("button", "Add car").should("be.visible");
  });

  it("logs in with created user using custom command", () => {
    const email = `vira.qa+${Date.now()}@example.com`;
    const password = "Test1234";

    cy.get("app-signup-modal").within(() => {
      cy.get("#signupName").type("John");
      cy.get("#signupLastName").type("Doe");
      cy.get("#signupEmail").type(email);
      cy.get("#signupPassword").type(password, { sensitive: true });
      cy.get("#signupRepeatPassword").type(password, { sensitive: true });

      cy.contains("button", "Register").should("not.be.disabled").click();
    });

    cy.url().should("include", "/panel/garage");
    cy.get("#userNavDropdown").click();
    cy.contains("button.user-nav_link", "Logout").click();

    cy.contains("button", "Sign In").should("be.visible");

    cy.login(email, password);

    cy.contains("h1", "Garage").should("be.visible");
    cy.contains("button", "Add car").should("be.visible");
  });

  // TODO: Unskip after Name/Last name trim issues are fixed.
  it.skip("BUG TODO: ignores leading and trailing spaces in Name and Last name fields", () => {
    cy.get("app-signup-modal").within(() => {
      cy.get("#signupName").clear().type("  John  ").blur();
      cy.contains("p", "Name is invalid").should("not.exist");
      cy.contains("p", "Name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupName").should("have.class", "ng-valid");

      cy.get("#signupLastName").clear().type("  Doe  ").blur();
      cy.contains("p", "Last name is invalid").should("not.exist");
      cy.contains("p", "Last name has to be from 2 to 20 characters long").should("not.exist");
      cy.get("#signupLastName").should("have.class", "ng-valid");
    });
  });
});
