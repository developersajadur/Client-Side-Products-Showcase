// src/components/ProductCard.js
import React from 'react';
import moment from 'moment';

const ProductCard = ({ product }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full h-48 object-cover" src={product?.image} alt={product?.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product?.name}</div>
                <p className="text-gray-700 text-base mb-2">{product?.description}</p>
                <p className="text-gray-600 text-sm mb-2">
                    <strong>Category:</strong> {product?.category}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                    <strong>Brand:</strong> {product?.brand}
                </p>
                <p className="text-gray-600 text-sm">
                    <strong>Added on:</strong> {moment(product?.creationDate).format('MMMM Do, YYYY')}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2">
                    ${product?.price}
                </span>
                <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2">
                    {product?.ratings} ★
                </span>
            </div>
            <div className="px-6 pb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
