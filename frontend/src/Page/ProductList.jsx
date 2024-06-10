import {
  Button,
  Flex,
  Select,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ProductList = ({
  products,
  onEdit,
  onDelete,
  onFilter,
  onSortByTime,
}) => {
  const [filterType, setFilterType] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  const handleFilterTypeChange = (event) => {
    const selectedType = event.target.value;
    setFilterType(selectedType);
    onFilter({ type: selectedType });
  };

  const handlePriceOrderChange = (event) => {
    const selectedOrder = event.target.value;
    setPriceOrder(selectedOrder);
    onFilter({ priceOrder: selectedOrder });
  };

  return (
    <div>
      <Flex justifyContent="space-evenly">
        <Button onClick={onSortByTime}>Sort by Creation Time</Button>
        <Select
          placeholder="Filter by Product Type"
          onChange={handleFilterTypeChange}
          width="200px"
        >
          <option value="Electronic">Electronic</option>
          <option value="Shoe">Shoe</option>
          <option value="Clothing">Clothing</option>
        </Select>
        <Select
          placeholder="Sort by Price"
          onChange={handlePriceOrderChange}
          width="200px"
        >
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </Select>
      </Flex>
      <SimpleGrid columns={3} spacing={5} padding={10}>
        {products.map((product, index) => (
          <div key={index}>
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={
                    product.image
                      ? product.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrA7AnzVfkvExs3rWGo4jL69PZTPbDsSnKLg&s"
                  }
                  alt={product.name}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{product.name}</Heading>
                  <Text>{product.discription}</Text>
                  <Text color="blue.600" fontSize="l">
                    ${product.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="10" ml={14}>
                  <Button
                    onClick={() => onEdit(product)}
                    variant="solid"
                    colorScheme="green"
                  >
                    Edit
                  </Button>
                  <Button
                    button
                    onClick={() => onDelete(product._id)}
                    variant="solid"
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ProductList;
