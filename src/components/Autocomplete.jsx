import React, { useState, useEffect,useCallback } from "react";
import "./styles.css";
import SuggestionList from "./Suggestion-list";
import {debounce} from "lodash"

const Autocomplete = ({
  staticData,
  fetchSuggestions,
  placeholder = "",
  customLoading = "Loading ...",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  dataKey = "",
  customStyles = {},
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300 ),
    [],
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }

    return () => {};
  }, [inputValue]);

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        name=""
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">{customLoading}</div>}

      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestion-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}

          <SuggestionList
            suggestions={suggestions}
            hightlight={inputValue}
            dataKey={dataKey}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
