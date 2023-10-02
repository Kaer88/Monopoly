import { fields } from './constants/fields.js';
import Field from './field.js';

export default class Board {
  #fields = [];
  #players;
  #domElement;

  get fields() {
    return this.#fields;
  }
  #generateBoard() {
    const boardDIV = document.createElement('DIV');
    boardDIV.id = 'board';
    boardDIV.style.height = '50rem';
    boardDIV.style.width = '50rem';
    boardDIV.style.display = 'flex';
    boardDIV.style.flexWrap = 'wrap'
    boardDIV.style.border = '1px solid black';
    boardDIV.style.margin = 'auto 5em';
    document.body.append(boardDIV);

    this.#fields = fields
      .map((field) => new Field(field.name, field.value, field.eventFn))
      .map((fieldOfClass) => {
        const fieldDiv = document.createElement('DIV');
        fieldDiv.style.border = '1px solid black';
        fieldDiv.style.display = 'flex'
        fieldDiv.style.flexDirection = 'column';
        fieldDiv.style.justifyContent = 'space-around';
        fieldDiv.style.alignItems = 'center';
        fieldDiv.style.height = '7rem'
        fieldDiv.style.width = '5rem'

        const valueElement = document.createElement('SPAN');
        const nameElement = document.createElement('SPAN');
        valueElement.textContent = `${fieldOfClass.value} $`;
        nameElement.textContent = `${fieldOfClass.fieldName}`;

        boardDIV.append(fieldDiv);
        fieldDiv.append(nameElement, valueElement);
      });
  }

  start() {
    this.#generateBoard();
  }


}
