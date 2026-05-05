const availableBrands = ["Audi", "BMW", "Ford", "Porsche", "Fiat"];

class GaragePage {
  getGaragePageTitle() {
    return cy.contains("h1", "Garage");
  }

  getAddCarButton() {
    return cy.contains("button", "Add car");
  }

  getAddCarModal() {
    return cy.get("app-add-car-modal");
  }

  getAddCarModalTitle() {
    return cy.contains("h4", "Add a car");
  }

  getAddCarBrandSelect() {
    return cy.get("#addCarBrand");
  }

  getBrandOption(brand) {
    return cy.contains("option", brand);
  }

  getAddCarModelSelect() {
    return cy.get("#addCarModel");
  }

  getModelOption(model) {
    return cy.contains("option", model);
  }

  getAddCarMileageInput() {
    return cy.get("#addCarMileage");
  }

  getAddButton() {
    return cy.contains("button", "Add");
  }

  getCarNameText(carName) {
    return cy.contains("p.car_name", carName);
  }

  getAddFuelExpenseButton() {
    return cy.contains("button", "Add fuel expense");
  }

  getGarageSidebarButton() {
    return cy.get('a.sidebar_btn[href="/panel/garage"]');
  }

  getCarEditButton() {
    return cy.get("button.car_edit");
  }

  getEditCarModal() {
    return cy.get("app-edit-car-modal");
  }

  getRemoveCarButton() {
    return cy.contains("button", "Remove car");
  }

  getRemoveCarModal() {
    return cy.get("app-remove-car-modal");
  }

  getRemoveButton() {
    return cy.contains("button", "Remove");
  }

  getCarRemovedSuccessAlert() {
    return cy.contains(".alert-success", "Car removed");
  }

  visitGaragePage() {
    cy.url().should("include", "/panel/garage");
    this.getGaragePageTitle().should("be.visible");
  }

  openAddCarModal() {
    this.getAddCarButton().should("be.visible").click();
  }

  addCar(brand, model, mileage) {
    this.openAddCarModal();

    this.getAddCarModal().within(() => {
      this.getAddCarModalTitle().should("be.visible");

      this.getAddCarBrandSelect()
        .should("be.visible")
        .within(() => {
          availableBrands.forEach((availableBrand) => {
            this.getBrandOption(availableBrand).should("exist");
          });
        });

      this.getAddCarBrandSelect().select(brand);

      this.getAddCarModelSelect()
        .should("be.visible")
        .within(() => {
          this.getModelOption(model).should("exist");
        });

      this.getAddCarModelSelect().select(model);
      this.getAddCarMileageInput().should("be.visible").clear().type(mileage);

      this.getAddButton().should("not.be.disabled").click();
    });
  }

  assertCarIsAdded(carName) {
    this.getCarNameText(carName).should("be.visible");
  }

  openAddFuelExpenseModal(carName) {
    this.getCarNameText(carName)
      .first()
      .closest("app-car")
      .within(() => {
        this.getAddFuelExpenseButton().should("be.visible").click();
      });
  }

  removeCar(carName) {
    this.getGarageSidebarButton().click();
    cy.url().should("include", "/panel/garage");

    this.getCarNameText(carName)
      .first()
      .closest("app-car")
      .within(() => {
        this.getCarEditButton().click();
      });

    this.getEditCarModal().within(() => {
      this.getRemoveCarButton().click();
    });

    this.getRemoveCarModal().within(() => {
      this.getRemoveButton().click();
    });

    this.getCarRemovedSuccessAlert().should("be.visible");
  }
}

export const garagePage = new GaragePage();
