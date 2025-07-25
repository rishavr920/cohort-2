import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return (
        <div className="flex justify-between px-10 py-4 border-b border-slate-400">
            <div className="flex flex-col justify-center">
                Medium
            </div>
            <div>
                <Avatar name="Rishav" size="big"/> {/*will use recoil to store user detail so that can use name here too*/}
            </div>
        </div>
    )
}