"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, MAJOR_CATEGORIES } from "@/types";
import { cn } from "@/lib/utils";

interface UniversityFiltersProps {
  className?: string;
}

export function UniversityFilters({ className }: UniversityFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    query: searchParams.get("query") || "",
    country: searchParams.get("country") || "all",
    category: searchParams.get("category") || "all",
    minScore: searchParams.get("minScore") || "",
    maxTuition: searchParams.get("maxTuition") || "all",
    hasHostel: searchParams.get("hasHostel") === "true",
  });

  const updateFilters = useCallback((newFilters: typeof filters) => {
    const params = new URLSearchParams();

    if (newFilters.query) params.set("query", newFilters.query);
    if (newFilters.country && newFilters.country !== "all") params.set("country", newFilters.country);
    if (newFilters.category && newFilters.category !== "all") params.set("category", newFilters.category);
    if (newFilters.minScore) params.set("minScore", newFilters.minScore);
    if (newFilters.maxTuition && newFilters.maxTuition !== "all") params.set("maxTuition", newFilters.maxTuition);
    if (newFilters.hasHostel) params.set("hasHostel", "true");

    router.push(`/universities?${params.toString()}`);
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      query: "",
      country: "all",
      category: "all",
      minScore: "",
      maxTuition: "all",
      hasHostel: false,
    };
    setFilters(clearedFilters);
    router.push("/universities");
  };

  const activeFiltersCount = [
    filters.country !== "all" && filters.country,
    filters.category !== "all" && filters.category,
    filters.minScore,
    filters.maxTuition !== "all" && filters.maxTuition,
    filters.hasHostel,
  ].filter(Boolean).length;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Поиск университета..."
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          icon={<Search className="h-4 w-4" />}
          className="flex-1"
        />
        <Button type="submit" variant="turkestan">
          Найти
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-turkestan-500 text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </form>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="rounded-lg border bg-card p-4 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Фильтры</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-1 h-4 w-4" />
                Сбросить
              </Button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Country */}
            <div className="space-y-2">
              <Label>Страна</Label>
              <Select
                value={filters.country}
                onValueChange={(value) => {
                  const newFilters = { ...filters, country: value };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все страны</SelectItem>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag} {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Направление</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => {
                  const newFilters = { ...filters, category: value };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите направление" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все направления</SelectItem>
                  {MAJOR_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Score */}
            <div className="space-y-2">
              <Label>Мин. рейтинг QS</Label>
              <Input
                type="number"
                placeholder="Введите рейтинг"
                value={filters.minScore}
                onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                min={1}
                max={1000}
              />
            </div>

            {/* Max Tuition */}
            <div className="space-y-2">
              <Label>Макс. стоимость ($/год)</Label>
              <Select
                value={filters.maxTuition}
                onValueChange={(value) => {
                  const newFilters = { ...filters, maxTuition: value };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите бюджет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая стоимость</SelectItem>
                  <SelectItem value="10000">до $10,000</SelectItem>
                  <SelectItem value="25000">до $25,000</SelectItem>
                  <SelectItem value="50000">до $50,000</SelectItem>
                  <SelectItem value="75000">до $75,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasHostel"
                checked={filters.hasHostel}
                onCheckedChange={(checked) => {
                  const newFilters = { ...filters, hasHostel: checked as boolean };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              />
              <Label htmlFor="hasHostel" className="cursor-pointer">
                Есть общежитие
              </Label>
            </div>
          </div>

          {/* Apply Button */}
          <Button
            variant="turkestan"
            className="w-full sm:w-auto"
            onClick={() => updateFilters(filters)}
          >
            Применить фильтры
          </Button>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.country !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {COUNTRIES.find((c) => c.value === filters.country)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...filters, country: "all" };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              />
            </Badge>
          )}
          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {MAJOR_CATEGORIES.find((c) => c.value === filters.category)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...filters, category: "all" };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              />
            </Badge>
          )}
          {filters.hasHostel && (
            <Badge variant="secondary" className="gap-1">
              Общежитие
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...filters, hasHostel: false };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
