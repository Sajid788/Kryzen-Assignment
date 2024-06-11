import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList.jsx";
import { useToast } from "@chakra-ui/react";
import AddProduct from "./AddProduct.jsx";
import EditProduct from "./EditProduct.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");
  const [isSortedByTime, setIsSortedByTime] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://kryzen-backend.vercel.app/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await axios.post("https://kryzen-backend.vercel.app/product/add", newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    console.log(updatedProduct._id);
    try {
      await axios.put(
        `https://kryzen-backend.vercel.app/product/edit/${updatedProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (_id) => {
    try {
      await axios.delete(`https://kryzen-backend.vercel.app/product/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      toast({
        description: "Product deleted successfully",
        position:"top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleScheduleAddition = () => {
    const delay = parseInt(scheduleTime) * 60000;
    setTimeout(() => {
      handleAddProduct({
        name: "Scheduled Product",
        description: "This product was added automatically",
        price: 0,
        image:
          "https://images6.alphacoders.com/133/1338694.png",
        product_type: "Electronic",
      });
    }, delay);
    setScheduleTime("");
    toast({
      description: "Scheduled Product added successfully",
      position:"top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleFilter = (criteria) => {
    let filteredProducts = [...products];

    if (criteria.type) {
      filteredProducts = filteredProducts.filter(
        (product) => product.product_type === criteria.type
      );
    }

    if (criteria.priceOrder) {
      filteredProducts.sort((a, b) => {
        return criteria.priceOrder === "lowToHigh"
          ? a.price - b.price
          : b.price - a.price;
      });
    }

    setFilteredProducts(filteredProducts);
  };

  const handleSortByTime = () => {
    if (isSortedByTime) {
      setFilteredProducts(products);
    } else {
      const sortedProducts = [...filteredProducts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilteredProducts(sortedProducts);
    }
    setIsSortedByTime(!isSortedByTime);
  };

  return (
    <>
      <div className="product-page-container">
        <div className="product-page-header">
          <div>
            <button
              className="product-page-button"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Product
            </button>
            <input
              type="number"
              className="product-page-input"
              placeholder="Schedule time in minutes"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
            <button
              className="product-page-button"
              onClick={handleScheduleAddition}
            >
              Schedule Addition
            </button>
          </div>
        </div>
        <ProductList
          products={filteredProducts}
          onEdit={(product) => {
            setEditProduct(product);
            setIsEditModalOpen(true);
          }}
          onDelete={handleDeleteProduct}
          onFilter={handleFilter}
          onSortByTime={handleSortByTime}
        />
         <AddProduct
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProduct}
        />
        <EditProduct
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={editProduct}
          onEdit={handleEditProduct}
        /> 
      </div>
    </>
  );
};

export default ProductPage;
