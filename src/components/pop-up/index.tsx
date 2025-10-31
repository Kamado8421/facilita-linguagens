export default function PopUp({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed top-0 z-50 left-0 h-screen w-screen justify-center items-center flex bg-[#0000007d]">
            <div className="p-6 bg-white rounded-2xl w-[96%] max-w-[650px]">
                {children}
            </div>
        </div>
    )
}