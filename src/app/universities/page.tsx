"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { UniversityCard } from "@/components/university/university-card";
import { UniversityFilters } from "@/components/university/university-filters";
import { universities } from "@/lib/data";

function UniversitiesContent() {
  const searchParams = useSearchParams();

  // Get filter values from URL
  const query = searchParams.get("query")?.toLowerCase() || "";
  const city = searchParams.get("city") || "";
  // const category = searchParams.get("category") || "";
  const hasHostel = searchParams.get("hasHostel") === "true";
  const hasMilitaryDept = searchParams.get("hasMilitaryDept") === "true";

  // Filter universities
  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      // Search query
      if (query) {
        const searchFields = [
          uni.name,
          uni.nameRu,
          uni.description,
          uni.descriptionRu,
          uni.cityRu,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!searchFields.includes(query)) return false;
      }

      // City filter
      if (city && uni.city !== city) return false;

      // Features filters
      if (hasHostel && !uni.hasHostel) return false;
      if (hasMilitaryDept && !uni.hasMilitaryDept) return false;

      return true;
    });
  }, [query, city, hasHostel, hasMilitaryDept]);

  // Sort by ranking
  const sortedUniversities = [...filteredUniversities].sort(
    (a, b) => (a.ranking || 999) - (b.ranking || 999)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-turkestan-100">
            <GraduationCap className="h-6 w-6 text-turkestan-600" />
          </div>
          <h1 className="text-3xl font-bold">Университеты Казахстана</h1>
        </div>
        <p className="text-muted-foreground">
          Найдите идеальный университет среди {universities.length}+ вузов страны
        </p>
      </div>

      {/* Filters */}
      <UniversityFilters className="mb-8" />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {sortedUniversities.length === 0 ? (
            "Университеты не найдены"
          ) : sortedUniversities.length === 1 ? (
            "Найден 1 университет"
          ) : sortedUniversities.length < 5 ? (
            `Найдено ${sortedUniversities.length} университета`
          ) : (
            `Найдено ${sortedUniversities.length} университетов`
          )}
        </p>
      </div>

      {/* Universities Grid */}
      {sortedUniversities.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedUniversities.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">Ничего не найдено</h3>
          <p className="mt-2 text-muted-foreground">
            Попробуйте изменить параметры поиска или сбросить фильтры
          </p>
        </div>
      )}
    </div>
  );
}

export default function UniversitiesPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-muted rounded" />
            <div className="h-12 w-full bg-muted rounded" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <UniversitiesContent />
    </Suspense>
  );
}
