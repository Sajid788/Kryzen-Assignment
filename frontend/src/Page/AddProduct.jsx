import React from "react";
import { Button, Input, Select, useToast } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProduct = ({ isOpen, onClose, onAdd }) => {
  const toast = useToast();

  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    
  });

  const handleSubmit = (values) => {
    onAdd(values);
    onClose();
    toast({
      description: "Product added successfully",
      position:'top',
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Product</h2>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form">
                <Field name="name" as={Input} placeholder="Name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form">
                <Field
                  name="description"
                  as={Input}
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form">
                <Field
                  name="price"
                  as={Input}
                  type="number"
                  placeholder="Price"
                />
                <ErrorMessage name="price" component="div" className="error" />
              </div>
              <div className="form">
                <Field name="image" as={Input} placeholder="Image URL" />
                <ErrorMessage name="image" component="div" className="error" />
              </div>
              <div className="form">
                <ErrorMessage
                  name="product_type"
                  component="div"
                  className="error"
                />
              </div>
              <Button type="submit" marginTop="15px" isLoading={isSubmitting}>
                Add
              </Button>
              <Button marginTop="15px" onClick={onClose} ml="4">
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
