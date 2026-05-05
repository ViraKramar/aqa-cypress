const availableBrands = ["Audi", "BMW", "Ford", "Porsche", "Fiat"];

class GaragePage {
  visitGaragePage() {
    cy.url().should("include", "/panel/garage");
    cy.contains("h1", "Garage").should("be.visible");
  }

  openAddCarModal() {
    cy.contains("button", "Add car").should("be.visible").click();
  }

  addCar(brand, model, mileage) {
    this.openAddCarModal();

    cy.get("app-add-car-modal").within(() => {
      cy.contains("h4", "Add a car").should("be.visible");

      cy.get("#addCarBrand")
        .should("be.visible")
        .within(() => {
          availableBrands.forEach((availableBrand) => {
            cy.contains("option", availableBrand).should("exist");
          });
        });

      cy.get("#addCarBrand").select(brand);

      cy.get("#addCarModel")
        .should("be.visible")
        .within(() => {
          cy.contains("option", model).should("exist");
        });

      cy.get("#addCarModel").select(model);
      cy.get("#addCarMileage").should("be.visible").clear().type(mileage);

      cy.contains("button", "Add").should("not.be.disabled").click();
    });
  }

  assertCarIsAdded(carName) {
    cy.contains("p.car_name", carName).should("be.visible");
  }

  openAddFuelExpenseModal(carName) {
    cy.contains("p.car_name", carName)
      .first()
      .closest("app-car")
      .within(() => {
        cy.contains("button", "Add fuel expense").should("be.visible").click();
      });
  }

  removeCar(carName) {
    cy.get('a.sidebar_btn[href="/panel/garage"]').click();
    cy.url().should("include", "/panel/garage");

    cy.contains("p.car_name", carName)
      .first()
      .closest("app-car")
      .within(() => {
        cy.get("button.car_edit").click();
      });

    cy.get("app-edit-car-modal").within(() => {
      cy.contains("button", "Remove car").click();
    });

    cy.get("app-remove-car-modal").within(() => {
      cy.contains("button", "Remove").click();
    });

    cy.contains(".alert-success", "Car removed").should("be.visible");
  }
}

export const garagePage = new GaragePage();
