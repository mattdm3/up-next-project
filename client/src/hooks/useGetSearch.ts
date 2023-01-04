import { useCallback, useContext } from "react";
import { LoginContext } from "../components/LoginContext";
import { getSearchResult } from "../request";

export function useGetSearch() {
  const {
    inputValue,
    setInputValue,
    setLastSearch,
    setSearchResults,
    triggerSearchBar,
    setTriggerSearchBar,
  } = useContext(LoginContext);

  const handleClearSearch = () => {
    setSearchResults(null);
    setInputValue("");
    toggleSearchTrigger();
  };
  // This is a toggler to open/close search bar.

  const toggleSearchTrigger = useCallback(() => {
    setInputValue("");
    if (triggerSearchBar) {
      setTriggerSearchBar(false);
    } else {
      setTriggerSearchBar(true);
    }
  }, [setInputValue, setTriggerSearchBar, triggerSearchBar]);

  const handleSearch = useCallback(
    async (searchTerm) => {
      setInputValue("");
      toggleSearchTrigger();
      const result = await getSearchResult(searchTerm);
      setSearchResults(result);
    },
    [setInputValue, setSearchResults, toggleSearchTrigger]
  );

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && inputValue.length > 1) {
        setLastSearch(inputValue);
        handleSearch(inputValue);
      }
    },
    [handleSearch, inputValue, setLastSearch]
  );

  return {
    handleKeyPress,
    handleInputValue,
    handleSearch,
    toggleSearchTrigger,
    handleClearSearch,
  };
}
