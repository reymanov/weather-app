import { Box, Container, Heading, Text, useToast } from "@chakra-ui/react";
import { Search } from "./components/Search";
import { useState } from "react";
import { CurrentWeather, Forecast } from "./components/Weather";
import { getCurrentWeather, getForecast } from "./api/weather";
import "./styles/App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const toast = useToast();

  const handleSearchChange = async (searchData: any) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      setIsLoading(true);
      const [weatherResponse, forecastResponse] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Heading>Weather App</Heading>
        <Text>
          Search for city to see current weather and forecast for next days
        </Text>
      </Box>
      <Search onChange={handleSearchChange} />
      {currentWeather && (
        <CurrentWeather data={currentWeather} isLoading={isLoading} />
      )}
      {forecast && <Forecast data={forecast} isLoading={isLoading} />}
    </Container>
  );
};

export default App;
