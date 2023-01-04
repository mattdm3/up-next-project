import { useCallback, useContext } from "react";
import { LoginContext } from "../components/LoginContext";
import useSWRMutation from "swr/mutation";

const fetcher = async (url) => fetch(url).then((data) => data.json());

export function useGetSearch() {
  const {
    inputValue,
    setInputValue,
    setLastSearch,
    lastSearch,
    setSearchResults,
    triggerSearchBar,
    setTriggerSearchBar,
  } = useContext(LoginContext);

  const { trigger } = useSWRMutation(
    `/movies/search?searchTerm=${lastSearch}`,
    fetcher
  );

  const handleClearSearch = () => {
    setSearchResults(null);
    setInputValue("");
    toggleSearchTrigger();
  };

  const toggleSearchTrigger = useCallback(() => {
    if (triggerSearchBar) {
      setTriggerSearchBar(false);
    } else {
      setTriggerSearchBar(true);
    }
  }, [setTriggerSearchBar, triggerSearchBar]);

  const handleSearch = useCallback(
    async (searchTerm) => {
      setInputValue("");
      toggleSearchTrigger();
      const result = await trigger();
      setSearchResults(result);
    },
    [setInputValue, setSearchResults, toggleSearchTrigger, trigger]
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
