"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shadow Operator", href: "/shadow-operator" },
    { name: "Brand Analysis", href: "/brand-analysis" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <nav className="glass-strong rounded-2xl px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-lg leading-tight">Shadow Operator</span>
                <span className="text-xs text-slate-500 font-medium">Brand Analysis</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                className="btn-primary text-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary text-sm text-center mt-2"
                >
                  Login
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-sm text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
