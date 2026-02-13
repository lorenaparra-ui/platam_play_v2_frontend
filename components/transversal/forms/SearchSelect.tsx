import React, { useState, useRef, useEffect } from 'react';
import { useWordFilter } from '@/lib/hooks/useWordFilter';

export interface SearchOption {
    id: string | number;
    label: string;
    value: any;
}

interface SearchSelectProps {
    items: SearchOption[];
    onSelect: (item: SearchOption) => void;
    placeholder?: string;
    label?: string;
    className?: string;
    initialValue?: string;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({ 
    items, 
    onSelect, 
    placeholder = "Buscar...", 
    label,
    className = "",
    initialValue = ""
}) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filtramos usando el hook useWordFilter, filtrando por la propiedad 'label'
    const filteredItems = useWordFilter(items, searchTerm, 'label');

    const handleSelect = (item: SearchOption) => {
        setSearchTerm(item.label);
        onSelect(item);
        setIsOpen(false);
    };

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className={`relative w-full ${className}`} ref={wrapperRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white outline-none transition-all shadow-sm"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredItems.length > 0 ? (
                        <ul className="py-1">
                            {filteredItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-200 transition-colors"
                                    onClick={() => handleSelect(item)}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                            No se encontraron resultados
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};