import React from 'react'
type Props = {
    onClick: () => void,
    text: string,
}
export const Button = ({ text, onClick }: Props) => {
    return (
        <button onClick={onClick} className='border-2 border-solid border-indigo-600 rounded-full overflow-hidden duration-200 hover:opacity-70 hover:scale-95 cursor-pointer'>
            <p className='font-fugaz px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 text-indigo-600'>{text}</p>
        </button>
    )
}
