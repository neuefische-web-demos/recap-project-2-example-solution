function getByDataJS(dataJsTag, element) {
  if (element === undefined) {
    return document.querySelector(`[data-js='${dataJsTag}']`);
  }

  return element.querySelector(`[data-js='${dataJsTag}']`);
}

const card = getByDataJS("card");
const answerButton = getByDataJS("answer-button", card); // answerButton is only searched on the "card" element instead inside the whole "document"
const answerDisplay = getByDataJS("answer", card);
const bookmark = getByDataJS("bookmark", card);

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
