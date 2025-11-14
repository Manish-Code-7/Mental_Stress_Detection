"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  const [healthy, setHealthy] = useState<boolean | null>(null);
  useEffect(() => {
    let mounted = true;
    const ping = async () => {
      try {
        const res = await fetch("/api/stats");
        if (!mounted) return;
        setHealthy(res.ok);
      } catch {
        if (mounted) setHealthy(false);
      }
    };
    ping();
    const id = setInterval(ping, 30000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/detect", label: "Analyze" },
    { href: "/eda", label: "Insights" },
    { href: "/model-metrics", label: "Metrics" },
    { href: "/awareness", label: "Resources" },
  ];

  return (
    <nav className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WellMind Analytics
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}

            {/* Status Indicator */}
            <div className="ml-4 flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50">
              <span className={`h-2 w-2 rounded-full ${healthy ? 'bg-green-500 animate-pulse' : healthy === false ? 'bg-red-500' : 'bg-gray-400'}`} />
              <span className="text-xs font-medium text-gray-600">
                {healthy ? 'Online' : healthy === false ? 'Offline' : 'Checking...'}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileLinkClass(link.href)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Status */}
            <div className="px-3 py-2 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${healthy ? 'bg-green-500' : healthy === false ? 'bg-red-500' : 'bg-gray-400'}`} />
              <span className="text-sm text-gray-600">
                Status: {healthy ? 'Online' : healthy === false ? 'Offline' : 'Checking...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


