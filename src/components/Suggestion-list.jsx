import React from "react";

const SuggestionList = ({
  suggestions = [],
  hightlight,
  dataKey,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    // console.log(parts);
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b style={{ color: "yellow" }} key={index}>
              {part}
            </b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currrentSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-item"
          >
            {getHighlightedText(currrentSuggestion, hightlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
