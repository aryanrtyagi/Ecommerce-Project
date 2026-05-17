function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />

            {/* Title placeholder */}
            <div className="h-5 bg-gray-200 rounded-md mb-2 w-3/4" />

            {/* Description placeholders */}
            <div className="h-4 bg-gray-200 rounded-md mb-2 w-full" />
            <div className="h-4 bg-gray-200 rounded-md mb-3 w-5/6" />

            {/* Price + Button placeholder */}
            <div className="flex items-center justify-between mt-3">
                <div className="h-7 bg-gray-200 rounded-md w-16" />
                <div className="h-9 bg-gray-200 rounded-lg w-28" />
            </div>
        </div>
    );
}

export default ProductCardSkeleton;