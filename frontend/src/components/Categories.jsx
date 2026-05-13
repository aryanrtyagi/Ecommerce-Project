import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Categories() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE}/api/categories/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCategories(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="py-16 px-6 bg-gray-100">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Shop by Category
                    </h2>

                    <p className="text-gray-600 mt-3">
                        Explore products from different categories
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() =>
                                navigate(`/category/${category.id}`)
                            }
                            className="relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group hover:-translate-y-2 transition-all duration-300"
                        >

                            {/* Category Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition"></div>

                            {/* Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-3xl font-bold tracking-wide">
                                    {category.name}
                                </h3>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default Categories;