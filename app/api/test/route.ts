import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: any = {
    timestamp: new Date().toISOString(),
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing",
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "configured" : "missing",
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
    },
    test: null as any,
    productCount: null as any,
  };

  try {
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      result.supabaseTest = "failed";
      result.supabaseError = error.message;
    } else {
      result.supabaseTest = "success";
      result.productCount = count;
    }
  } catch (error: any) {
    result.supabaseTest = "failed";
    result.supabaseError = error.message;
  }

  return NextResponse.json(result);
}
