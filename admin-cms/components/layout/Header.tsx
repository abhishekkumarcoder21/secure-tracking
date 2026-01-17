'use client';

import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    const { role } = useAuth();

    return (
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Page Title */}
                <div>
                    <h1 className="text-xl font-semibold text-white">{title}</h1>
                    {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Administrator</p>
                            <p className="text-xs text-slate-400">{role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
