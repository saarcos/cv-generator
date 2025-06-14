import Header from "@/components/Header"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="text-slate-800">
            <Header/>
            {children}
        </div>
    )
}

export default Layout