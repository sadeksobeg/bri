export type ProductOptionGroup = {
  name: string;
  values: string[];
};

export type OrderDetails = {
  productName: string;
  price: number;
  quantity: number;
  selectedOptions: Record<string, string>;
  notes?: string;
};

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || process.env.WHATSAPP_NUMBER || "963995939432";
}

export function buildOrderMessage(details: OrderDetails): string {
  const optionsLines = Object.entries(details.selectedOptions)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const notes = details.notes?.trim();

  return [
    "طلب جديد من BRIVIA",
    "",
    `المنتج: ${details.productName}`,
    optionsLines ? optionsLines : undefined,
    `الكمية: ${details.quantity}`,
    notes ? `ملاحظات: ${notes}` : undefined,
    "",
    "---",
    "تم إرسال الطلب من موقع BRIVIA الإلكتروني",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(details: OrderDetails): string {
  const phone = getWhatsAppNumber();
  const text = encodeURIComponent(buildOrderMessage(details));
  return `https://wa.me/${phone}?text=${text}`;
}

export function parseProductOptions(optionsJson: string): ProductOptionGroup[] {
  try {
    const parsed = JSON.parse(optionsJson);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (g): g is ProductOptionGroup =>
        g &&
        typeof g.name === "string" &&
        Array.isArray(g.values) &&
        g.values.every((v: unknown) => typeof v === "string")
    );
  } catch {
    return [];
  }
}
