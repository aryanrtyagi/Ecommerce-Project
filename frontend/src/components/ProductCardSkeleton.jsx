function ProductCardSkeleton() {
    return (
        <div className="bg-white border border-neutral-200 p-4 animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-neutral-200 mb-4" />

            {/* Title placeholder */}
            <div className="h-5 bg-neutral-200 mb-2 w-3/4" />

            {/* Description placeholders */}
            <div className="h-4 bg-neutral-200 mb-2 w-full" />
            <div className="h-4 bg-neutral-200 mb-3 w-5/6" />

            {/* Price + Button placeholder */}
            <div className="flex items-center justify-between mt-3">
                <div className="h-6 bg-neutral-200 w-16" />
                <div className="h-9 bg-neutral-200 w-28" />
            </div>
        </div>
    );
}

export default ProductCardSkeleton;