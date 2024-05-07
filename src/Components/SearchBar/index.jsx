import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export const Search = ({
  placeholder,
  onSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const theme = useTheme();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <InputGroup borderRadius="10px" w="100%">
      <InputLeftElement pointerEvents="none">
        <MdSearch
          style={{ color: theme.colors.black["200"], height: 20, width: 20 }}
        />
      </InputLeftElement>
      <Input
        variant="outline"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};
