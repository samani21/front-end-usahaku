import { Product } from '@/lib/Types/Theme/Theme'
import React from 'react'
import ProductSectionOne from './ProductSectionOne';

type Props = {
  theme: number,
  filteredProducts: Product[];
  activeCategory: string;
  onClick: (val: Product) => void
}

const ProductSection = ({ theme, filteredProducts, activeCategory, onClick }: Props) => {
  return (
    theme === 1 ?
      <ProductSectionOne filteredProducts={filteredProducts} activeCategory={activeCategory} onClick={onClick} /> : ''
  )
}

export default ProductSection