import { Box, Heading, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import faker from "faker";

const generateRandomHousingData = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    const location = faker.address.city();
    const price = faker.datatype.number({ min: 100000, max: 500000 });
    const size = faker.datatype.number({ min: 800, max: 2500 });

    data.push({ location, price, size });
  }

  return data;
};

const Dashboard = () => {
  const [selectedParameter, setSelectedParameter] = useState("price");
  const [housingData, setHousingData] = useState([]);

  const handleChange = (event) => {
    setSelectedParameter(event.target.value);
  };

  const getDataByParameter = (parameter) => {
    const chartData = {
      labels: housingData.map((item) => item.location),
      datasets: [
        {
          label: `${
            parameter.charAt(0).toUpperCase() + parameter.slice(1)
          } by Location`,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75,192,192,0.4)",
          hoverBorderColor: "rgba(75,192,192,1)",
          data: housingData.map((item) => item[parameter]),
        },
      ],
    };
    return chartData;
  };

  useEffect(() => {
    // Generate random housing data when the component mounts
    setHousingData(generateRandomHousingData());
  }, []);

  return (
    <Box p={8}>
      <Heading mb={4}>Dynamic Housing Analytics Dashboard</Heading>
      <Select value={selectedParameter} onChange={handleChange} mb={4}>
        <option value="price">Price</option>
        <option value="size">Size</option>
        {/* Add more options based on your data */}
      </Select>
      <Bar data={getDataByParameter(selectedParameter)} />
    </Box>
  );
};

export default Dashboard;
