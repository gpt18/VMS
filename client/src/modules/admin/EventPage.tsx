export function EventPage() {
    return (
        <>
        <div className="fixed inset-0 flex text-white">
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-black">
                <div className="absolute right-0 top-0 p-3.5 -mr-12 text-black">X</div>
                <div className="relative w-full h-full flex-1 border-white/20">
                    <h2 className="text-white">Chat History</h2>
                </div>
                <nav className="flex h-full w-full flex-col px-3 pb-3.5 ">
                    <div className="flex-col flex-1 overflow-y-auto">
                        <div className="py-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, fuga veritatis soluta harum vitae, qui amet fugiat doloremque optio ut quisquam minus inventore sequi repudiandae et, eveniet veniam ex. Esse.</div>
                    </div>
                    <div className="flex flex-col pt-2 bg-slate-500">
                    <div className="py-2">hello</div>
                        <div className="py-2">hello</div>
                    </div>
                </nav>
            </div>
            <div className="w-14 flex-shrink-0"></div>
        </div>
        </>
    );
}