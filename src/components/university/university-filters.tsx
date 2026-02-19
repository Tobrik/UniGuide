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
import { CITIES } from "@/types";
import { cn } from "@/lib/utils";

const UNIVERSITY_TYPES = [
  { value: "PUBLIC", label: "Государственный" },
  { value: "PRIVATE", label: "Частный" },
  { value: "NATIONAL", label: "Национальный" },
  { value: "INTERNATIONAL", label: "Международный" },
];

interface UniversityFiltersProps {
  className?: string;
}

export function UniversityFilters({ className }: UniversityFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    query: searchParams.get("query") || "",
    city: searchParams.get("city") || "all",
    universityType: searchParams.get("universityType") || "all",
    hasHostel: searchParams.get("hasHostel") === "true",
    hasMilitaryDept: searchParams.get("hasMilitaryDept") === "true",
  });

  const updateFilters = useCallback((newFilters: typeof filters) => {
    const params = new URLSearchParams();

    if (newFilters.query) params.set("query", newFilters.query);
    if (newFilters.city && newFilters.city !== "all") params.set("city", newFilters.city);
    if (newFilters.universityType && newFilters.universityType !== "all") params.set("universityType", newFilters.universityType);
    if (newFilters.hasHostel) params.set("hasHostel", "true");
    if (newFilters.hasMilitaryDept) params.set("hasMilitaryDept", "true");

    router.push(`/universities?${params.toString()}`);
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      query: "",
      city: "all",
      universityType: "all",
      hasHostel: false,
      hasMilitaryDept: false,
    };
    setFilters(clearedFilters);
    router.push("/universities");
  };

  const activeFiltersCount = [
    filters.city !== "all" && filters.city,
    filters.universityType !== "all" && filters.universityType,
    filters.hasHostel,
    filters.hasMilitaryDept,
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

          <div className="grid gap-4 sm:grid-cols-2">
            {/* City */}
            <div className="space-y-2">
              <Label>Город</Label>
              <Select
                value={filters.city}
                onValueChange={(value) => {
                  const newFilters = { ...filters, city: value };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {CITIES.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* University Type */}
            <div className="space-y-2">
              <Label>Тип университета</Label>
              <Select
                value={filters.universityType}
                onValueChange={(value) => {
                  const newFilters = { ...filters, universityType: value };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  {UNIVERSITY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasMilitaryDept"
                checked={filters.hasMilitaryDept}
                onCheckedChange={(checked) => {
                  const newFilters = { ...filters, hasMilitaryDept: checked as boolean };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              />
              <Label htmlFor="hasMilitaryDept" className="cursor-pointer">
                Военная кафедра
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
          {filters.city !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {CITIES.find((c) => c.value === filters.city)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...filters, city: "all" };
                  setFilters(newFilters);
                  updateFilters(newFilters);
                }}
              />
            </Badge>
          )}
          {filters.universityType !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {UNIVERSITY_TYPES.find((t) => t.value === filters.universityType)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...filters, universityType: "all" };
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
          {filters.hasMilitaryDept && (
            <Badge variant="secondary" className="gap-1">
              Военная кафедра
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...filters, hasMilitaryDept: false };
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
