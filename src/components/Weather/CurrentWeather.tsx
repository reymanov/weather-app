import {
  Box,
  Flex,
  Text,
  Image,
  Card,
  CardHeader,
  Heading,
  VStack,
  HStack,
  CardBody,
} from "@chakra-ui/react";
import { IWeatherData } from "../../types/interfaces/Weather";

interface Props {
  data: IWeatherData;
  isLoading: boolean;
}

export const CurrentWeather = ({ data, isLoading }: Props) => {
  const { city, main, weather, wind } = data;
  const { temp, pressure, humidity, feels_like } = main;

  const weatherDescription =
    weather[0].description.charAt(0).toUpperCase() +
    weather[0].description.slice(1);

  return (
    <Box mt={10}>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        Currently
      </Text>
      <Card style={{ opacity: isLoading ? 0.5 : 1 }}>
        <CardHeader>
          <HStack justifyContent={"space-between"}>
            <VStack alignItems={"flex-start"}>
              <Heading size={"md"}>{city}</Heading>
              <Text>{weatherDescription}</Text>
            </VStack>
            <HStack>
              <Text className="temperature" fontSize="5xl" fontWeight="bold">
                {Math.round(temp)}°C
              </Text>
              <Image
                alt="weather"
                className="weather-icon"
                src={`icons/${weather[0].icon}.png`}
                boxSize="75px"
              />
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontWeight={"bold"}>Details</Text>
          <HStack>
            <Text>Feels like:</Text>
            <Text>{Math.round(feels_like)}°C</Text>
          </HStack>
          <HStack>
            <Text>Wind:</Text>
            <Text>{wind.speed} m/s</Text>
          </HStack>
          <HStack>
            <Text>Humidity:</Text>
            <Text>{humidity}%</Text>
          </HStack>
          <HStack>
            <Text>Pressure:</Text>
            <Text>{pressure} hPa</Text>
          </HStack>
        </CardBody>
      </Card>
    </Box>
  );
};
