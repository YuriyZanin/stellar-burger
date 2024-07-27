beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');
  cy.intercept('POST', 'api/auth/login', {
    fixture: 'user.json'
  }).as('userLogin');
  cy.intercept('GET', 'api/auth/user', {
    fixture: 'user.json'
  }).as('userAuth');
  cy.intercept('POST', 'api/orders', {
    fixture: 'order.json'
  }).as('createOrder');
  cy.visit('/');

  cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').as('testBun');
  cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').as('testIngredient');
});

afterEach(() => {
  window.localStorage.clear();
  cy.clearAllCookies();
});

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });

  it('должны подгрузится все ингредиенты', function () {
    cy.wait('@getIngredients');
    cy.get('li').should('have.length', 15);
  });
});

describe('добавление ингредиента из списка в конструктор', function () {
  it('добавление булки', function () {
    cy.get('[data-cy=bun-top]').contains('Выберите булки');
    cy.get('[data-cy=bun-bottom]').contains('Выберите булки');

    cy.get('@testBun').children('button').click();
    cy.get('.constructor-element_pos_top').contains(
      'Краторная булка N-200i (верх)'
    );
    cy.get('.constructor-element_pos_bottom').contains(
      'Краторная булка N-200i (низ)'
    );
    cy.get('[data-cy=643d69a5c3f7b9001cfa093d]').children('button').click();
    cy.get('.constructor-element_pos_top').contains(
      'Флюоресцентная булка R2-D3 (верх)'
    );
    cy.get('.constructor-element_pos_bottom').contains(
      'Флюоресцентная булка R2-D3 (низ)'
    );
  });

  it('добавление начинки', function () {
    cy.get('[data-cy=empty-list]').contains('Выберите начинку');
    cy.get('@testIngredient').children('button').click();
    cy.get('.constructor-element__row').contains(
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('@testIngredient').children('button').click();
    cy.get('.constructor-element__row').should('have.length', 2);
  });
});

describe('создание заказа', function () {
  it('проверка открытия модального окна с данными о заказе', function () {
    cy.get('@testBun').children('button').click();
    cy.get('@testIngredient').children('button').click();
    cy.get(`[data-cy='order-button']`).click();

    cy.wait('@createOrder');
    cy.get('#modals').find('h2').contains('47489');
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');

    cy.get('[data-cy=bun-top]').contains('Выберите булки');
    cy.get('[data-cy=empty-list]').contains('Выберите начинку');
    cy.get('[data-cy=bun-bottom]').contains('Выберите булки');
  });
});

describe('проверка работы модальных окон', function () {
  it('открытие и закрытие модального окна ингредиента', function () {
    cy.get('#modals').should('be.empty');
    cy.get('@testIngredient').children('a').click();
    cy.get('#modals').should('be.not.empty');
    cy.get('#modals').find('h3').contains('Биокотлета из марсианской Магнолии');
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
  });

  it('закрытие по оверлею', function () {
    cy.get('#modals').should('be.empty');
    cy.get('@testIngredient').children('a').click();
    cy.get('#modals').should('be.not.empty');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('#modals').should('be.empty');
  });
});
