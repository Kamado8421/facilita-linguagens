export default function SuperScreen({ children }: { children: React.ReactNode }) {
    return (
        <div className="z-50 fixed w-screen h-screen top-0 left-0 bg-blue-500 flex flex-col justify-center items-center">
            {children}
        </div>
    )
}