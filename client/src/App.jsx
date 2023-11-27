// libraries
import axios from "axios";
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
// config
import configFile from "./config.json";
// components
import Form from "./components/form.jsx";
import Results from "./components/results.jsx";
import Header from "./components/header.jsx";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const apiEndPoint = configFile.apiEndPoint;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    email: "",
    number: "",
    searchResults: [],
  });

  const handleNumberChange = (e) => {
    const formatNumber = (value) => {
      const numericValue = value.replace(/[^0-9]/g, "");
      const formattedValue = numericValue.replace(/(\d{2})(?=\d)/g, "$1-");

      return formattedValue;
    };

    const formattedValue = formatNumber(e.target.value);
    setData({ ...data, number: formattedValue });
  };

  const handleEmailChange = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setData({ ...data, searchResults: [] });

      const response = await axios.post(apiEndPoint, {
        email: data.email,
        number: data.number,
      });

      if (response) {
        setError(null);
      }

      setData({ ...data, searchResults: response.data });
    } catch (error) {
      const helperText = "Произошла ошибка, попробуйте еще раз!";
      setError(error.response?.data?.error || helperText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Component>
      <Header />
      <Form
        data={data}
        setData={setData}
        onNumberChange={handleNumberChange}
        onEmailChange={handleEmailChange}
        onSubmit={handleSubmit}
      />
      <Results data={data} loading={loading} error={error} />
    </Component>
  );
}

export default App;
