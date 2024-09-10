import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchLocation, getData } from "./Redux/Search/SearchSlice";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { searchResults, errorMessage, iconUrl } = useSelector((state) => state.searchState);
  const router = useRouter();
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  // const router = useRouter();

  const submitSearch = () => {
    dispatch(updateSearchLocation(searchQuery));
    dispatch(getData());
  };

  const goToSearchResults = () => {
    // Convert the searchResults object to a JSON string to pass as searchParams
    router.push({
      pathname: "/searchResults",
      params: {
        searchResults: JSON.stringify(searchResults),
        iconUrl,
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search Page</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Button title="search" onPress={submitSearch}>
        {" "}
      </Button>

      {/* Display error message if any */}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {/* Conditionally render the SearchResults component */}
      {searchResults && (
        <Button title="View Results" onPress={goToSearchResults} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    paddingLeft: 10,
    marginTop: 20,
  },
});
