import React from 'react';
import { Link } from 'react-router-dom';

const CategoryNav = () => {
  return (
    <div className="py-4">
      <div className="container mx-auto px-32">
        <div className="text-black font-semibold">
          <Link to="/" className="hover:underline">Trang Chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/category2" className="hover:underline">Danh mục 2</Link>
          <span className="mx-2">/</span>
          <Link to="/category3" className="hover:underline">Danh mục 3</Link>
          <span className="mx-2">/</span>
          <Link to="/category4" className="hover:underline">Danh mục 4</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
