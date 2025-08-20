
import type { ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

interface IProps {
    // children: ReactElement
    children: ReactNode
}

export default function CommonLayout({ children }: IProps) {
    return (
        <div className="min-h-screen bg-red-500 flex flex-col">
            <Navbar />
            <div className="grow-1">{children} </div>
            <Footer />
        </div>
    )
}
