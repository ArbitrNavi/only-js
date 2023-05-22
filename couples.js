(() => {
    let arrCard = [];
    const arrCardActive = [];

    function createTitle() {
        const appTitle = document.createElement('h1');

        appTitle.classList.add('title');
        appTitle.textContent = 'Игра "Пары"';
        return appTitle;
    }

    function createForm() {
        const startForm = document.createElement('form');
        const startFormLabel = document.createElement('label');
        const startFormInput = document.createElement('input');
        const startFormtBtn = document.createElement('button');

        startForm.classList.add('start-form');
        startFormInput.classList.add('start-form__input');
        startFormInput.setAttribute('id', 'start-form__input');
        startFormInput.setAttribute('placeholder', 'Введите количество рядов карт');
        startFormtBtn.classList.add('start-form__btn');
        startFormtBtn.textContent = 'Начать игру'

        startForm.append(startFormInput);
        startForm.append(startFormtBtn);

        return {
            startForm,
            startFormInput,
            startFormtBtn,
        }
    }

    function createField() {
        const fieldWrap = document.createElement('div');
        const field = document.createElement('div');

        fieldWrap.classList.add('field-wrap');
        field.classList.add('field');

        fieldWrap.append(field);
        return {
            fieldWrap,
            field,
        };
    }

    function createCard() {
        const cardWrap = document.createElement('div');
        const cardFace = document.createElement('div');
        const cardShirt = document.createElement('div');

        cardWrap.classList.add('card');
        cardFace.classList.add('card-face');
        cardShirt.classList.add('card-shirt');

        cardWrap.appendChild(cardFace);
        cardWrap.appendChild(cardShirt);

        cardWrap.addEventListener('click', (e) => {

            if (!e.currentTarget.classList.contains('card-active')) {
                arrCard.push(e.currentTarget);
                cardWrap.classList.toggle('card-active');
                if (arrCard.length > 2 && Number(arrCard[0].textContent) !== Number(arrCard[1].textContent)) {
                    arrCard.forEach((el) => {
                        el.classList.remove('card-active');
                    });
                    arrCard.length = 0;
                } else if (arrCard.length == 2 && Number(arrCard[0].textContent) === Number(arrCard[1].textContent)) {
                    arrCard.forEach((el) => {
                        el.classList.add('card-active');
                    });
                    arrCard.length = 0;
                } else if (arrCard.length > 2) {
                    arrCard.forEach((el) => {
                        el.classList.remove('card-active');
                    });
                    arrCard.length = 0;
                }

                if (e.currentTarget.classList.contains('card-active')) {
                    arrCardActive.push(e.currentTarget);
                } else {
                    arrCardActive.pop(e.currentTarget);
                    arrCardActive.pop(e.currentTarget);
                }

                const arrAllCard = document.querySelectorAll('.card');
                const container = document.querySelector('.container');
                const btn = createResetButton();

                if (arrAllCard.length === arrCardActive.length) {
                    container.append(btn);
                    arrCardActive.length = 0;
                }
            }
        });
        return {
            cardWrap,
            cardFace,
            cardShirt,
        };
    }

    function fillingCardsWithValues() {
        let arrCardNumber = [];
        const arrCardFace = document.querySelectorAll('.card-face');

        for (let i = 1; i < arrCardFace.length / 2 + 1; i++) {
            arrCardNumber.push(i);
        }
        const arrCardNumberfull = arrCardNumber.concat(arrCardNumber);

        const shuffle = function (array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
            return array;
        }
        let shuffleArrCardNumberfull = shuffle(arrCardNumberfull);

        for (let i = 0; i < arrCardFace.length; i++) {
            arrCardFace[i].textContent = shuffleArrCardNumberfull[i];
        }
    }

    function createResetButton() {
        const resetButton = document.createElement('button');

        resetButton.classList.add('reset-btn');
        resetButton.textContent = 'Сброс!';
        resetButton.addEventListener('click', () => {
            let array = document.querySelectorAll('.card-active');

            array.forEach((el) => el.classList.remove('card-active'));
            fillingCardsWithValues();
            document.querySelector('.start-form').classList.remove('start-form-deactive');
            resetButton.remove();
        });
        return resetButton;
    }

    function createCouplesApp(container) {
        const couplesAppTitle = createTitle();
        const couplesAppStartForm = createForm();
        const couplesAppField = createField();

        container.append(couplesAppTitle);
        container.append(couplesAppStartForm.startForm);
        container.append(couplesAppField.fieldWrap);

        let startFormInputValue = 1;
        for (let i = 0; i < (7 * startFormInputValue); ++i) {
            const couplesAppCard = createCard();
            couplesAppField.field.append(couplesAppCard.cardWrap);
        }
        fillingCardsWithValues();

        couplesAppStartForm.startForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let arrFieldElement = document.querySelectorAll('.card');
            startFormInputValue = document.getElementById('start-form__input').value;

            if (Number(startFormInputValue) > 1) {
                arrFieldElement.forEach((el) => el.remove());

                for (let i = 0; i < (7 * startFormInputValue); ++i) {
                    const couplesAppCard = createCard();
                    couplesAppField.field.append(couplesAppCard.cardWrap);
                }

                couplesAppStartForm.startForm.classList.add('start-form-deactive');
                fillingCardsWithValues();
            } else {
                couplesAppStartForm.startForm.reset();
                couplesAppStartForm.startFormInput.setAttribute('placeholder', 'Введите число больше одного!');
                couplesAppStartForm.startFormInput.classList.add('start-form__input-ivalid');
            }
        });
    }

    window.createCouplesApp = createCouplesApp;
})();