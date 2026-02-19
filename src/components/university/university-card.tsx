"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Trophy, Home, Shield, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { University } from "@/types";
import { formatNumber } from "@/lib/utils";

interface UniversityCardProps {
  university: University;
  variant?: "default" | "compact";
}

export function UniversityCard({ university, variant = "default" }: UniversityCardProps) {
  const typeLabels: Record<string, string> = {
    PUBLIC: "Государственный",
    PRIVATE: "Частный",
    NATIONAL: "Национальный",
    INTERNATIONAL: "Международный",
  };

  const typeColors: Record<string, "default" | "secondary" | "turkestan" | "gold"> = {
    PUBLIC: "secondary",
    PRIVATE: "default",
    NATIONAL: "turkestan",
    INTERNATIONAL: "gold",
  };

  if (variant === "compact") {
    return (
      <Link href={`/university/${university.slug}`}>
        <Card className="card-hover overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                {university.logoUrl ? (
                  <Image
                    src={university.logoUrl}
                    alt={university.nameRu}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-bold text-muted-foreground">
                    {university.nameRu.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{university.nameRu}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{university.cityRu}</span>
                </div>
              </div>
              {university.ranking && (
                <div className="flex items-center gap-1 text-turkestan-500">
                  <Trophy className="h-4 w-4" />
                  <span className="font-semibold">#{university.ranking}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/university/${university.slug}`}>
      <Card className="card-hover group overflow-hidden h-full">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          {university.coverImageUrl ? (
            <Image
              src={university.coverImageUrl}
              alt={university.nameRu}
              fill
              className="object-cover img-zoom"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-turkestan-500 to-turkestan-700">
              <span className="text-6xl font-bold text-white/30">
                {university.nameRu.charAt(0)}
              </span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Ranking Badge */}
          {university.ranking && university.ranking <= 10 && (
            <div className="absolute top-3 right-3">
              <Badge variant="gold" className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                TOP {university.ranking}
              </Badge>
            </div>
          )}

          {/* Logo */}
          <div className="absolute bottom-3 left-3 flex items-end gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg">
              {university.logoUrl ? (
                <Image
                  src={university.logoUrl}
                  alt={university.nameRu}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-turkestan-500">
                  {university.nameRu.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title */}
            <div>
              <Badge variant={typeColors[university.universityType]} className="mb-2">
                {typeLabels[university.universityType]}
              </Badge>
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-turkestan-600 transition-colors">
                {university.nameRu}
              </h3>
            </div>

            {/* Location & Students */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{university.cityRu}</span>
              </div>
              {university.studentsCount && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{formatNumber(university.studentsCount)}</span>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {university.hasHostel && (
                <Badge variant="outline" className="text-xs">
                  <Home className="mr-1 h-3 w-3" />
                  Общежитие
                </Badge>
              )}
              {university.hasMilitaryDept && (
                <Badge variant="outline" className="text-xs">
                  <Shield className="mr-1 h-3 w-3" />
                  Военная кафедра
                </Badge>
              )}
              {university.accreditation && (
                <Badge variant="outline" className="text-xs">
                  <Star className="mr-1 h-3 w-3" />
                  {university.accreditation.split(",")[0]}
                </Badge>
              )}
            </div>

            {/* Description */}
            {university.descriptionRu && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {university.descriptionRu}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
