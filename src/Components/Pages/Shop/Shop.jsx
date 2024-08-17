import { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';
import { Pagination } from 'flowbite-react';
import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
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
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams({
                    page: currentPage,
                    search: searchQuery,
                    brand: selectedBrand,
                    category: selectedCategory,
                    minPrice: priceRange.min,
                    maxPrice: priceRange.max,
                    sort: sortOption,
                }).toString();

                const { data } = await axios.get(`${api}/products?${query}`);
                if (Array.isArray(data.products) && Number.isInteger(data.totalPages)) {
                    setProducts(data.products);
                    setTotalPages(data.totalPages);
                } else {
                    setError("Invalid data format received from the server.");
                }
            } catch (error) {
                setError("Error fetching products");
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, searchQuery, selectedBrand, selectedCategory, priceRange, sortOption]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${api}/categories`);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const { data } = await axios.get(`${api}/brands`);
                setBrands(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchBrand();
    }, []);

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
                    {/* Populate with actual brand options */}
                   {
                    brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); handleFilterChange(); }}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
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
