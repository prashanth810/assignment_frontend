import React from "react";
import Navbar from "../../resuabes/Navbar";
import heroImage from "../../assets/images/hero-grocery.png";

const categories = [
    { name: "New Arrivals", tag: "01" },
    { name: "Best Sellers", tag: "02" },
    { name: "Essentials", tag: "03" },
    { name: "Sale", tag: "04" },
];

const HomeScreen = () => {
    return (
        <section className="min-h-screen bg-black text-white">
            <Navbar cartCount={0} />

            {/* Hero Section */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2">

                    {/* Left Side */}
                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
                            BEST ECOMMERCE
                        </p>

                        <h1 className="mt-5 text-5xl font-bold leading-tight lg:text-7xl">
                            Good taste,
                            <br />
                            at a fair price.
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-gray-300">
                            Curated essentials without the markup. Fresh vegetables,
                            fruits, dairy, groceries, stationery, meat and everything
                            you need delivered to your doorstep.
                        </p>

                        <button className="mt-10 rounded-lg bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-gray-200">
                            Browse All Products
                        </button>
                    </div>

                    {/* Right Side */}
                    <div className="flex justify-center">
                        <img
                            src={heroImage}
                            alt="Fresh Grocery"
                            className="w-full max-w-2xl rounded-3xl object-cover shadow-2xl"
                        />
                    </div>

                </div>
            </div>

            {/* Categories */}
            <div className="mx-auto max-w-7xl border-t border-gray-800 px-6 py-14">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.tag}
                            className="rounded-xl border border-gray-700 bg-zinc-900 p-6 transition duration-300 hover:border-white hover:bg-zinc-800"
                        >
                            <span className="text-sm text-gray-500">
                                {cat.tag}
                            </span>

                            <h3 className="mt-3 text-xl font-semibold text-white">
                                {cat.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeScreen;