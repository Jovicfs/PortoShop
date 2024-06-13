import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Grid } from '@mui/material'; // Importe Grid do Material-UI
import { getProducts } from '../Api/api.mjs';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box className ='min-h-screen' sx={{ width: '100%', p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Button  onClick={handlePrevClick}><IoIosArrowBack /></Button>
        <Grid container spacing={2} justifyContent="center">
          {products.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}> {/* Definindo o tamanho do item no grid */}
              <Card sx={{ maxWidth: 345, transition: 'transform 0.5s ease-in-out' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`R$ ${product.price}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button  onClick={handleNextClick}><IoIosArrowForward /></Button>
      </Box>
    </Box>
  );
}
