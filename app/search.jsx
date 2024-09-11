import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchLocation, getData } from "./Redux/Search/SearchSlice";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { searchResults, iconUrl } = useSelector((state) => state.searchState);
  const router = useRouter();
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const submitSearch = () => {
    dispatch(updateSearchLocation(searchQuery));
    dispatch(getData());
  };

  // to make sure searchResults were updating properly
  /*
  useEffect(() => {
    if (searchResults) {
      console.log("Search Results:", searchResults);
      // console.log("Icon URL:", iconUrl);
    }
  }, [searchResults, iconUrl]);
  */

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

      {/* render results when they exist */}
      {searchResults && Object.keys(searchResults).length > 0 && (
        <View>
          <Text>Results:</Text>
          <Text>{`Location: ${searchResults.name}`}</Text>
          <Text>{`Temperature: ${searchResults.main.temp}°F`}</Text>
        </View>
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
  newView: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
