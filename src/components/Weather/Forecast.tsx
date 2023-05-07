import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
  Text,
  Grid,
  Card,
} from "@chakra-ui/react";
import { IForecastData } from "../../types/interfaces/Weather";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface Props {
  data: IForecastData;
  isLoading: boolean;
}

export const Forecast: React.FC<Props> = ({ data, isLoading }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <Box my={10}>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        Forecast
      </Text>
      <Card
        borderRadius={8}
        overflow={"hidden"}
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >
        <Accordion allowMultiple>
          {data.list
            .slice(0, 7)
            .map(({ dt, main, clouds, weather, wind }, idx) => (
              <AccordionItem key={dt}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text as="span" fontWeight={"bold"}>
                      {forecastDays[idx]}
                    </Text>
                  </Box>
                  <Text as="span" mr="4">
                    {Math.round(main.temp_max)}°C / {Math.round(main.temp_min)}
                    °C
                  </Text>
                  <Image
                    src={`icons/${weather[0].icon}.png`}
                    boxSize="30px"
                    alt="weather"
                    mr="2"
                  />
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                    <Box>
                      <Text>Pressure:</Text>
                      <Text>{main.pressure}</Text>
                    </Box>
                    <Box>
                      <Text>Humidity:</Text>
                      <Text>{main.humidity}</Text>
                    </Box>
                    <Box>
                      <Text>Clouds:</Text>
                      <Text>{clouds.all}%</Text>
                    </Box>
                    <Box>
                      <Text>Wind speed:</Text>
                      <Text>{wind.speed} m/s</Text>
                    </Box>
                    <Box>
                      <Text>Sea level:</Text>
                      <Text>{main.sea_level}m</Text>
                    </Box>
                    <Box>
                      <Text>Feels like:</Text>
                      <Text>{main.feels_like}°C</Text>
                    </Box>
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </Card>
    </Box>
  );
};
