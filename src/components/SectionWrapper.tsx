import React from 'react'
type Props = {
    children: React.ReactNode,
    id: string,
    header: string,
}
const SectionWrapper = ({ children, id, header }: Props) => {
    return (
        <section id={id} className="min-h-screen flex flex-col gap-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center p-2 gap-1">
                <p className="uppercase font-extrabold text-2xl md:text-3xl py-2 textGradient font-fugaz">{header}</p>
            </div>
            <div className="max-w-[800px] flex flex-col w-full mx-auto gap-10 p-4">
                {children}
            </div>
        </section>
    )
}

export default SectionWrapper