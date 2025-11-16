import { AlertTriangle } from 'lucide-react';
import React, { ChangeEvent } from 'react'

type Props = {
    label: string;
    type: 'text' | 'number' | 'file' | 'textarea';
    name: string;
    value?: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    min?: number;
    required?: boolean;
}

const FormInput = ({ label, type, name, value, onChange, error, min = 0, required = false }: Props) => {
    const isFile = type === 'file';
    const isTextArea = type === 'textarea';

    const fileInputClasses = 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300 transition duration-150';

    const baseInputClasses = `w-full p-3 border rounded-lg focus:ring-zinc-500 focus:border-zinc-500 bg-white text-gray-800 transition duration-150`;
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-gray-300';

    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {isTextArea ? (
                <textarea
                    id={name}
                    name={name}
                    value={value as string}
                    onChange={onChange}
                    rows={3}
                    className={`${baseInputClasses} ${errorClasses}`}
                    // required={required}
                />
            ) : (
                <input
                    id={name}
                    type={isFile ? 'file' : type}
                    name={name}
                    {...(!isFile && { value: value })}
                    onChange={onChange}
                    min={type === 'number' ? min : undefined}
                    className={`${baseInputClasses} ${isFile ? fileInputClasses : ''} ${errorClasses}`}
                    // required={required}
                    step={type === 'number' && name === 'price' ? '100' : '1'}
                    placeholder={type === 'number' && value === '' && !error ? '0' : undefined}
                />
            )}
            {error && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                    <AlertTriangle size={14} className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormInput