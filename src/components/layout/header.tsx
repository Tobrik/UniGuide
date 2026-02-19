"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, GraduationCap, Search, Calculator, Compass, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";

const navigation = [
  { name: "Университеты", href: "/universities", icon: GraduationCap },
  { name: "Профориентация", href: "/career", icon: Compass },
  { name: "Калькулятор ЕНТ", href: "/calculator", icon: Calculator },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    await logout();
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-turkestan-500 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="hidden font-semibold text-lg sm:inline-block">
              UniGuide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Auth */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/universities">
                <Search className="mr-2 h-4 w-4" />
                Найти ВУЗ
              </Link>
            </Button>

            {loading ? (
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-turkestan-500 text-white text-sm font-medium hover:bg-turkestan-600 transition-colors"
                >
                  {getInitials(user.displayName)}
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-background shadow-lg">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium truncate">{user.displayName || "Пользователь"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Выйти
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="turkestan" size="sm" onClick={() => setAuthModalOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                Войти
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {!loading && user && (
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-turkestan-500 text-white text-xs font-medium"
              >
                {getInitials(user.displayName)}
              </button>
            )}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Открыть меню</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-4 border-t">
              <Button variant="outline" asChild className="w-full justify-center">
                <Link href="/universities">
                  <Search className="mr-2 h-4 w-4" />
                  Найти ВУЗ
                </Link>
              </Button>
              {!loading && !user && (
                <Button
                  variant="turkestan"
                  className="w-full justify-center"
                  onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Войти
                </Button>
              )}
              {!loading && user && (
                <Button
                  variant="ghost"
                  className="w-full justify-center text-red-600"
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
