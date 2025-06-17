"use client"
import { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef } from "react"
type AutoResizeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
export default function AutoResizeTextArea({ value, onChange, ...props }: AutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value])
    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            className="resize-none overflow-hidden"
            {...props}
        />
    );
}
