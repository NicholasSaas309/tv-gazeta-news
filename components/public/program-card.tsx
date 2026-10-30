import Link from "next/link";
import type { Program } from "@/lib/content/types";
import { Thumb } from "./thumb";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programas/${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"
    >
      <Thumb seed={program.title} aspect="video" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold text-content transition-colors group-hover:text-brand">
          {program.title}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand">
          {program.scheduleLabel}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-content-muted">
          {program.description}
        </p>
      </div>
    </Link>
  );
}
