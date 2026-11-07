import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/** Calls a server function and turns failures into a readable Error. */
export async function callFunction<T>(name: string, body: unknown): Promise<T> {
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) {
    let message = error.message;
    if (error instanceof FunctionsHttpError) {
      const res = error.context as Response;
      const details = await res.json().catch(() => null);
      message = details?.error ?? `Request failed (${res.status})`;
      const err = new Error(message) as Error & { status?: number };
      err.status = res.status;
      throw err;
    }
    throw new Error(message);
  }
  return data as T;
}
