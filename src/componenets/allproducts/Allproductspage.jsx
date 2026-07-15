import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../resuabes/Navbar";
import { getAllProducts } from "../../redux/slices/ProductSlice";


const Allproductspage = () => {
    const dispatch = useDispatch();

    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <section>
            <Navbar />

            <div className="min-h-screen bg-black text-white py-10">
                <div className="mx-auto max-w-7xl px-6">

                    <div className="mb-10">
                        <h1 className="text-4xl font-bold">
                            All Products
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Fresh vegetables, fruits, meat, fish, eggs and dairy products.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <p className="text-lg text-gray-400">
                                Loading Products...
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                            {products?.length > 0 ? (
                                products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="rounded-lg border border-gray-800 bg-[#111] p-3 transition hover:border-gray-600 duration-300 cursor-pointer">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.productName}
                                            className="h-32 w-full rounded-md object-cover"
                                        />

                                        <h3 className="mt-3 truncate text-sm font-semibold text-white">
                                            {product.productName}
                                        </h3>

                                        <p className="text-xs text-gray-400">
                                            {product.category}
                                        </p>

                                        <select className="mt-2 w-full rounded border border-gray-700 bg-black p-2 text-xs text-white">
                                            {product.variants?.map((variant) => (
                                                <option
                                                    key={variant._id}
                                                    value={variant.weight}
                                                >
                                                    {variant.weight}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="mt-3 flex items-center justify-between">

                                            <span className="text-sm font-bold text-white">
                                                ₹
                                                {product.variants?.length
                                                    ? product.variants[0].price
                                                    : 0}
                                            </span>

                                            <button className="rounded bg-white px-3 py-1 text-xs font-semibold text-black transition hover:bg-gray-300">
                                                Add
                                            </button>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-400">
                                    No Products Found
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Allproductspage;