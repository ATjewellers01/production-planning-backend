import type { CreateAlloyConversionEntryInput } from "./alloy-conversion.validation.js";
import { alloyConversionRepository } from "./alloy-conversion.repository.js";

function nextSerialNo(totalEntries: number) {
  return `AC-${String(totalEntries + 1).padStart(3, "0")}`;
}

export const alloyConversionService = {
  listEntries() {
    return alloyConversionRepository.findAll();
  },

  async createEntry(input: CreateAlloyConversionEntryInput) {
    const totalEntries = await alloyConversionRepository.countAll();

    return alloyConversionRepository.create({
      serialNo: nextSerialNo(totalEntries),
      productionPlan: input.productionPlan,
      targetKarat: input.targetKarat,
      batchNumber: input.batchNumber,
      input24K: input.input24K,
      purity: input.purity,
      expectedOutput: input.expectedOutput,
      actualOutput: input.actualOutput,
      estimatedLoss: input.estimatedLoss,
    });
  },
};
