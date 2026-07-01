import { createContext, useContext, useState, type ReactNode } from "react";
import type { Program, Role } from "@/types/domain";
import { SAMPLE_PROGRAM } from "@/api/client";

interface ProgramState {
  program: Program | null;
  role: Role;
  setRole: (r: Role) => void;
  loadSample: () => void;
  launch: (p: Program) => void;
  reset: () => void;
}

const Ctx = createContext<ProgramState | null>(null);

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [program, setProgram] = useState<Program | null>(null);
  const [role, setRole] = useState<Role>("PMO Lead");

  const value: ProgramState = {
    program,
    role,
    setRole,
    loadSample: () => setProgram(SAMPLE_PROGRAM),
    launch: (p) => setProgram(p),
    reset: () => {
      setProgram(null);
      setRole("PMO Lead");
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgram(): ProgramState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgram must be used within ProgramProvider");
  return ctx;
}

/** Convenience: the active program's initiatives, falling back to the sample. */
export function useInitiatives() {
  const { program } = useProgram();
  return program?.initiatives ?? SAMPLE_PROGRAM.initiatives;
}
