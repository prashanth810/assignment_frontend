import React, { useState } from "react";
import { loginUser } from "../../redux/slices/Authslice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await dispatch(loginUser(form));

            if (loginUser.fulfilled.match(result)) {
                const user = result.payload;

                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                }

                navigate("/home");
            } else {
                console.log(result.payload);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="min-h-screen bg-[#F8F6F7]">
            <div className="grid min-h-screen grid-cols-2">

                {/* Left Section */}
                <div className="h-screen">
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        alt="login"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-center bg-[#F8F6F7]">
                    <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg">
                        <h2 className="mb-2 text-center text-3xl font-bold">
                            LUXORA
                        </h2>

                        <p className="mb-8 text-center text-gray-500">
                            Welcome Back
                        </p>

                        <form onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-y-2">
                                    <label className="text-gray-500 text-sm"> Email </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        name="email"
                                        onChange={handlechange}
                                        placeholder="Email"
                                        disabled={loading}
                                        className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-300 disabled:bg-gray-100"
                                    />
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <label className="text-gray-500 text-sm"> Password </label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        name="password"
                                        onChange={handlechange}
                                        placeholder="Password"
                                        disabled={loading}
                                        className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-300 disabled:bg-gray-100"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded bg-black py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-500">
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LoginScreen;