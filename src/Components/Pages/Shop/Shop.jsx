import { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';
import { Pagination } from 'flowbite-react';

const api = import.meta.env.VITE_API_URL;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${api}/products?page=${currentPage}`) // No need for limit if the server handles it
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.products) && Number.isInteger(data.totalPages)) {
                    setProducts(data.products);
                    setTotalPages(data.totalPages);
                } else {
                    setError("Invalid data format received from the server.");
                }
                setLoading(false);
            })
            .catch(error => {
                setError("Error fetching products");
                setLoading(false);
                console.error("Error fetching products:", error);
            });
    }, [currentPage]);

    return (
        <div className="p-4">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
            <div className="flex overflow-x-auto sm:justify-center mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    showIcons
                />
            </div>
        </div>
    );
};

export default Shop;
