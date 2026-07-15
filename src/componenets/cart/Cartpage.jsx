import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../resuabes/Navbar";

const initialItems = [
    {
        id: "trousers",
        name: "Artwork Trousers",
        price: 1150,
        size: "36",
        color: "White",
        qty: 1,
        image: "/images/artwork-trousers.jpg",
    },
    {
        id: "shirt",
        name: "Artwork Shirt",
        price: 1250,
        size: "36",
        color: "Black",
        qty: 3,
        image: "/images/artwork-shirt.jpg",
    },
    {
        id: "top",
        name: "Artwork Top",
        price: 495,
        size: "36",
        color: "Black",
        qty: 2,
        image: "/images/artwork-top.jpg",
    },
];

const formatPrice = (value) =>
    `${value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`;

const Cartpage = () => {
    const [items, setItems] = useState(initialItems);
    const navigate = useNavigate();

    const updateQty = (id, delta) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, qty: Math.max(0, item.qty + delta) }
                        : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = 0;
    const postage = items.length ? 24 : 0;
    const total = subtotal + shipping + postage;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-16">

                {/* Title */}
                <h1 className="mb-10 font-['Arial_Narrow_Bold'] text-2xl text-white sm:text-4xl lg:text-6xl">
                    Shopping Cart
                </h1>

                {items.length === 0 ? (
                    <div className="border-t border-[#989898] py-20 text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                            Your cart is empty
                        </p>
                        <button
                            onClick={() => navigate("/home")}
                            className="mt-6 border border-[#989898] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-black"
                        >
                            Continue shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">

                        {/* Item list */}
                        <div className="border-t border-[#989898]">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start justify-between gap-6 border-b border-[#989898] py-8"
                                >
                                    <div className="flex-1">
                                        <h2 className="mb-10 font-['Arial_Narrow_Bold'] text-2xl text-white sm:text-4xl lg:text-xl">
                                            {item.name}
                                        </h2>

                                        <p className="mt-2 text-base text-white">
                                            {formatPrice(item.price)}
                                        </p>

                                        <div className="mt-3 space-y-1 text-xs uppercase tracking-[0.1em] text-gray-400">
                                            <p>
                                                <span className="font-semibold text-white">Size</span>{" "}
                                                | {item.size}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-white">Color</span>{" "}
                                                | {item.color}
                                            </p>
                                        </div>

                                        {/* Quantity stepper */}
                                        <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                                            <button
                                                onClick={() => updateQty(item.id, -1)}
                                                aria-label={`Decrease quantity of ${item.name}`}
                                                className="flex h-7 w-7 items-center justify-center border border-gray-500 text-white transition cursor-pointer hover:border-orange-400 hover:text-orange-500">
                                                −
                                            </button>
                                            <span className="text-white h-7 w-14 flex items-center justify-center border border-gray-500">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item.id, 1)}
                                                aria-label={`Increase quantity of ${item.name}`}
                                                className="flex h-7 w-7 items-center justify-center border border-gray-500 text-white transition cursor-pointer hover:border-orange-400 hover:text-orange-500"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="h-32 w-28 flex-shrink-0 overflow-hidden bg-white sm:h-40 sm:w-36">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order summary */}
                        <div className="h-fit border border-[#989898]">
                            <h3
                                className="font-['Arial_Narrow_Bold'] text-2xl text-white sm:text-4xl lg:text-2xl border-b border-[#989898] px-6 py-4 text-center"
                            >
                                Order Summary
                            </h3>

                            <div className="divide-y divide-white">
                                <div className="flex items-center justify-between px-6 py-4 text-xs font-semibold uppercase text-white">
                                    <span>Subtotal</span>
                                    <span className="font-normal normal-case">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-6 py-4 text-xs font-semibold uppercase text-white">
                                    <span>Shipping</span>
                                    <span className="font-normal normal-case">
                                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-6 py-4 text-xs font-semibold uppercase text-white">
                                    <span>Postage</span>
                                    <span className="font-normal normal-case">
                                        {formatPrice(postage)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-6 py-4 text-sm font-black uppercase text-white">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="block w-full border-t border-[#989898] py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black duration-500 cursor-pointer">
                                Check Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cartpage;