import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";
import { amountInWords, cedisToPesewas, formatCedis, taxOn } from "./money";
import { buildLines, computeTotals, isFullyPriced, orderNumber, orderRequestSchema, unitPriceOf } from "./orders";

describe("order pricing", () => {
  it("reads catalogue prices like GH¢ 350", () => {
    const lap = PRODUCTS.find((product) => product.id === "laparotomy-packs");
    expect(lap && unitPriceOf(lap)).toBe(35000);
  });

  it("prices lines from the catalogue and merges duplicates", () => {
    const lines = buildLines([
      { productId: "laparotomy-packs", quantity: 2 },
      { productId: "laparotomy-packs", quantity: 1, notes: "Large gowns" },
      { productId: "cesarean-section-packs", quantity: 1 }
    ]);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatchObject({ quantity: 3, unitPrice: 35000, notes: "Large gowns" });
    expect(computeTotals(lines, 0)).toEqual({ subtotal: 145000, tax: 0, total: 145000 });
  });

  it("marks quoted equipment as not yet priced", () => {
    expect(isFullyPriced(buildLines([{ productId: "digital-xray-system", quantity: 1 }]))).toBe(false);
  });

  it("rejects unknown products", () => {
    expect(() => buildLines([{ productId: "nope", quantity: 1 }])).toThrow();
  });

  it("applies tax rounded to the pesewa", () => {
    expect(taxOn(35000, 21.9)).toBe(7665);
    expect(taxOn(333, 15)).toBe(50);
    expect(taxOn(1000, 0)).toBe(0);
  });

  it("formats and parses cedi amounts", () => {
    expect(formatCedis(145000)).toBe("GH₵1,450.00");
    expect(cedisToPesewas("1,250.5")).toBe(125050);
    expect(cedisToPesewas("abc")).toBeNull();
    expect(orderNumber(12)).toBe("MMT-00012");
  });

  it("rejects bot submissions via the honeypot", () => {
    const base = {
      clientInfo: {
        fullName: "Ama Mensah", facilityName: "Ridge Dental", phone: "+233 20 000 0000",
        email: "ama@example.com", location: "Accra Metropolitan, Greater Accra"
      },
      items: [{ productId: "laparotomy-packs", quantity: 1 }]
    };
    expect(orderRequestSchema.safeParse(base).success).toBe(true);
    expect(orderRequestSchema.safeParse({ ...base, website: "spam" }).success).toBe(false);
  });

  it("writes invoice amounts in words", () => {
    expect(amountInWords(505000)).toBe("Five Thousand and Fifty Ghana Cedis Only");
    expect(amountInWords(745000)).toBe("Seven Thousand Four Hundred and Fifty Ghana Cedis Only");
    expect(amountInWords(18605000)).toBe("One Hundred and Eighty-Six Thousand and Fifty Ghana Cedis Only");
    expect(amountInWords(35025)).toBe("Three Hundred and Fifty Ghana Cedis and Twenty-Five Pesewas Only");
    expect(amountInWords(100)).toBe("One Ghana Cedi Only");
  });
});
