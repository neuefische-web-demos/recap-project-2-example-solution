function getByDataJs(dataJsTag, element = document) {
  // default value for element
  return element.querySelector(`[data-js="${dataJsTag}"]`);
}

const form = getByDataJs("form"); // document.querySelector(`[data-js="form"]`);
const cardList = getByDataJs("card-list");
const questionInput = getByDataJs("question-input");
const answerInput = getByDataJs("answer-input");
const characterCountQuestion = getByDataJs(
  "character-count-question",
  document
);
const characterCountAnswer = getByDataJs("character-count-answer");

addCounterUpdate(questionInput, characterCountQuestion);
addCounterUpdate(answerInput, characterCountAnswer);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const cardListItem = document.createElement("li");
  cardListItem.className = "card-list__item";

  const newCard = createCard(data);
  // const newCard = createCardVersion2(data);

  cardListItem.append(newCard);
  cardList.append(cardListItem);

  form.reset();
});

function addCounterUpdate(inputElement, displayElement) {
  inputElement.addEventListener("input", (event) => {
    const textLength = event.target.value.length;
    const maxLength = inputElement.maxLength;
    displayElement.textContent = `${textLength} / ${maxLength}`;

    if (textLength >= maxLength) {
      displayElement.classList.add("form__character-count--error");
    } else {
      displayElement.classList.remove("form__character-count--error");
    }
  });
}

function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;

  return element;
}

function createCard(cardData) {
  const card = document.createElement("article");
  card.className = "card";

  const question = createElement("h2", "card__question", cardData.question);
  card.append(question);

  const answerButton = createElement(
    "button",
    "card__button-answer",
    "Show Answer"
  );
  card.append(answerButton);

  const answer = createElement("p", "card__answer", cardData.answer);
  card.append(answer);

  const tagList = createElement("ul", "card__tag-list");
  card.append(tagList);

  const tag = createElement("li", "card__tag-list-item", `#${cardData.tags}`);
  tagList.append(tag);

  const bookmark = createElement("div", "card__button-bookmark");
  card.append(bookmark);

  const headline = createElement("h1", "title", "Hello World");
  console.log(headline);

  const bookmarkButton = createElement("button", "bookmark");
  bookmarkButton.setAttribute("aria-label", "bookmark");
  bookmarkButton.innerHTML = `
  <svg
    class="bookmark__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewbox="0 0 24 24"
  >
    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </svg>
  `;
  bookmark.append(bookmarkButton);

  answerButton.addEventListener("click", () => {
    answer.classList.toggle("card__answer--active");
    const isAnswerVisible = answer.classList.contains("card__answer--active");

    answerButton.textContent = isAnswerVisible ? "Hide Answer" : "Show Answer";
  });

  bookmarkButton.addEventListener("click", () => {
    bookmarkButton.classList.toggle("bookmark--active");
  });

  return card;
}

function createCardVersion2(cardData) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h2 class="card__question" data-js='question'></h2>
    <button class="card__button-answer" type="button" data-js="answer-button">
      Show answer
    </button>
    <p class="card__answer" data-js="answer"></p>
    <ul class="card__tag-list" data-js='tag-list'></ul>
    <div class="card__button-bookmark">
      <button
        class="bookmark"
        aria-label="bookmark"
        type="button"
        data-js="bookmark"
      >
        <svg
          class="bookmark__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewbox="0 0 24 24"
        >
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      </button>
    </div>
  </article>`;

  const question = getByDataJS("question", card);
  question.textContent = cardData.question;

  const answer = getByDataJS("answer", card);
  answer.textContent = cardData.answer;

  const tagList = getByDataJS("tag-list", card);
  const tag = document.createElement("li");
  tag.className = "card__tag-list-item";
  tag.textContent = `#${cardData.tags}`;
  tagList.append(tag);

  const answerButton = getByDataJS("answer-button", card);
  answerButton.addEventListener("click", () => {
    answer.classList.toggle("card__answer--active");
    const isAnswerVisible = answer.classList.contains("card__answer--active");

    answerButton.textContent = isAnswerVisible ? "Hide Answer" : "Show Answer";
  });

  const bookmarkButton = getByDataJS("bookmark", card);
  bookmarkButton.addEventListener("click", () => {
    bookmarkButton.classList.toggle("bookmark--active");
  });

  return card;
}
