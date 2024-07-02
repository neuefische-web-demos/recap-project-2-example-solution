function getByDataJS(dataJsTag, element) {
  if (element === undefined) {
    return document.querySelector(`[data-js='${dataJsTag}']`);
  }

  return element.querySelector(`[data-js='${dataJsTag}']`);
}

function addCardInteractivity(cardElement) {
  const answerButton = getByDataJS("answer-button", cardElement); // answerButton is only searched on the "cardElement" element instead inside the whole "document"
  const answerDisplay = getByDataJS("answer", cardElement);
  const bookmark = getByDataJS("bookmark", cardElement);

  answerButton.addEventListener("click", () => {
    answerDisplay.classList.toggle("card__answer--active");

    const isAnswerVisible = answerDisplay.classList.contains(
      "card__answer--active"
    );

    answerButton.textContent = isAnswerVisible ? "Hide Answer" : "Show Answer";
  });

  bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("bookmark--active");
  });
}

const cards = document.querySelectorAll("[data-js='card']");

cards.forEach((card) => addCardInteractivity(card));
