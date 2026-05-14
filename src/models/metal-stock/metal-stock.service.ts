import type { CreateMetalStockEntryInput } from "./metal-stock.validation.js";
import { metalStockRepository } from "./metal-stock.repository.js";

function nextSerialNo(totalEntries: number) {
  return `SN-${String(totalEntries + 1).padStart(3, "0")}`;
}

export const metalStockService = {
  listEntries() {
    return metalStockRepository.findAll();
  },

  async createEntry(input: CreateMetalStockEntryInput) {
    const totalEntries = await metalStockRepository.countAll();

    return metalStockRepository.create({
      serialNo: nextSerialNo(totalEntries),
      customerName: input.customerName,
      invoiceNumber: input.invoiceNumber,
      grossWeight: input.grossWeight,
      purity: input.purity,
      storageLocation: input.storageLocation,
      entryDate: input.entryDate ?? new Date(),
      assayCertification: input.assayCertification,
    });
  },
};
