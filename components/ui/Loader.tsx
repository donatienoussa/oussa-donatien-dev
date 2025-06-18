
export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white text-black dark:bg-black dark:text-white z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
            <span className="ml-4 text-lg font-medium">@ODB@ dev mobile...</span>
        </div>
    );
}
