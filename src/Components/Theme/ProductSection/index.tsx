import { Product } from '@/lib/Types/Theme/Theme'
import React from 'react'
import ProductSectionOne from './ProductSectionOne';
import ProductSectionTwo from './ProductSectionTwo';

type Props = {
  theme: number,
  filteredProducts: Product[];
  activeCategory: string;
  onClick: (val: Product) => void;
  color?: string;
  handleFav: (id: number) => void;
}

const ProductSection = ({ theme, filteredProducts, activeCategory, onClick, color, handleFav }: Props) => {
  return (
    theme === 1 ?
      <ProductSectionOne filteredProducts={filteredProducts} activeCategory={activeCategory} onClick={onClick} handleFav={handleFav} /> :
      theme === 2 ?
        <ProductSectionTwo filteredProducts={filteredProducts} activeCategory={activeCategory} onClick={onClick} color={color} handleFav={handleFav} /> : ''
  )
}

export default ProductSection