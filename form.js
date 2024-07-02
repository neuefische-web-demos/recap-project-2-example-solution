function getByDataJS(dataJsTag, element) {
  if (element === undefined) {
    return document.querySelector(`[data-js='${dataJsTag}']`);
  }

  return element.querySelector(`[data-js='${dataJsTag}']`);
}

const form = getByDataJS("form");
const cardList = getByDataJS("card-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const cardListItem = document.createElement("li");
  cardListItem.className = "card-list__item";

  // const newCard = createCard(data);
  const newCard = createCardVersion2(data);

  cardListItem.append(newCard);
  cardList.append(cardListItem);

  form.reset();
});

function createCard(cardData) {
  const card = document.createElement("article");
  card.className = "card";

  const question = document.createElement("h2");
  question.className = "card__question";
  question.textContent = cardData.question;
  card.append(question);

  const answerButton = document.createElement("button");
  answerButton.className = "card__button-answer";
  answerButton.textContent = "Show Answer";
  card.append(answerButton);

  const answer = document.createElement("p");
  answer.className = "card__answer";
  answer.textContent = cardData.answer;
  card.append(answer);

  const tagList = document.createElement("ul");
  tagList.className = "card__tag-list";
  card.append(tagList);

  const tag = document.createElement("li");
  tag.className = "card__tag-list-item";
  tag.textContent = `#${cardData.tags}`;
  tagList.append(tag);

  const bookmark = document.createElement("div");
  bookmark.className = "card__button-bookmark";
  card.append(bookmark);

  const bookmarkButton = document.createElement("button");
  bookmarkButton.className = "bookmark";
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
