import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Products() {
  const [data, setData] = useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
        <Navbar/>
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
        {data && data.map((product) => (
          <div key={product.id} className="p-4 md:w-1/3 lg:w-1/4">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="w-full m-auto object-cover object-center"
                src={product.image}
                alt={product.title}
                />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  CATEGORY
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {product.title}
                </h1>
                <p className="leading-relaxed mb-3">
                  {product.description.slice(0,60)}......
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
                </>
  );
}

export default Products;
