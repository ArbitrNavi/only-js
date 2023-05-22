class Card {
    static open = false;
    static success = false;

    constructor(cardField, cardNumber) {
        this.cardField = cardField;
        this.cardNumber = cardNumber;
    }

    createElement() {
        if (this.cardWrapElement) return this.cardWrapElement;

        const cardWrap = document.createElement('div');
        const cardFace = document.createElement('div');
        const cardShirt = document.createElement('div');

        cardWrap.classList.add('card');
        cardFace.classList.add('card-face');
        cardShirt.classList.add('card-shirt');

        cardWrap.appendChild(cardFace);
        cardWrap.appendChild(cardShirt);

        this.cardWrapElement = cardWrap;
        this.cardFaceElement = cardFace;
        this.cardShirtElement = cardShirt;
        
        this.cardField.append(this.cardWrapElement);
    }

    set cardNumber(value) {
        this._cardNumber = value;
        if(this.cardFaceElement) {
            this.cardFaceElement.textContent = value;
        }
    }

    get cardNumber() {
        return this._cardNumber;
    }

    set open(value) {
        this._open = value;
        if(this.cardWrapElement) {
            
        }
    }

    get open() {
        return this._open;
    }
}

const card = new Card()