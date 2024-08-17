import { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';
import { Pagination } from 'flowbite-react';

const api = import.meta.env.VITE_API_URL;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [sortOption, setSortOption] = useState('date_desc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = () => {
        setCurrentPage(1);  // Reset to first page on filter change
    };

    useEffect(() => {
        setLoading(true);
        const query = new URLSearchParams({
            page: currentPage,
            search: searchQuery,
            brand: selectedBrand,
            category: selectedCategory,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            sort: sortOption,
        }).toString();

        fetch(`${api}/products?${query}`)
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
    }, [currentPage, searchQuery, selectedBrand, selectedCategory, priceRange, sortOption]);

    return (
        <div className="p-4">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Filters and Sorting */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <select
                    value={selectedBrand}
                    onChange={(e) => { setSelectedBrand(e.target.value); handleFilterChange(); }}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">All Brands</option>
                    <option value="BrandA">Brand A</option>
                    <option value="BrandB">Brand B</option>
                    {/* Add more brand options here */}
                </select>

                <select
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); handleFilterChange(); }}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">All Categories</option>
                    <option value="CategoryA">Category A</option>
                    <option value="CategoryB">Category B</option>
                    {/* Add more category options here */}
                </select>

                <select
                    value={sortOption}
                    onChange={(e) => { setSortOption(e.target.value); handleFilterChange(); }}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="date_asc">Date: Oldest First</option>
                    <option value="date_desc">Date: Newest First</option>
                </select>

                <div className="flex space-x-2">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={priceRange.min}
                        onChange={(e) => { setPriceRange({ ...priceRange, min: e.target.value }); handleFilterChange(); }}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={priceRange.max}
                        onChange={(e) => { setPriceRange({ ...priceRange, max: e.target.value }); handleFilterChange(); }}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>

            {/* Product Grid */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            {/* Pagination */}
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
