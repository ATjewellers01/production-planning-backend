import type {
  CreateProductionPlanningEntryInput,
  UpdateProductionPlanningStatusInput,
} from "./production-planning.validation.js";
import { productionPlanningRepository } from "./production-planning.repository.js";

function nextSerialNo(existingSerials: Array<{ serialNo: string }>) {
  const maxNo = existingSerials.reduce((max, entry) => {
    const match = entry.serialNo.match(/^PN-(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  return `PN-${String(maxNo + 1).padStart(3, "0")}`;
}

let serialQueue = Promise.resolve();

function withSerialQueue<T>(task: () => Promise<T>) {
  const run = serialQueue.then(task, task);
  serialQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export const productionPlanningService = {
  listEntries() {
    return productionPlanningRepository.findAll();
  },

  async createEntry(input: CreateProductionPlanningEntryInput) {
    return withSerialQueue(async () => {
      const existingPnSerials = await productionPlanningRepository.findPnSerials();
      const plannedWeight = input.plannedWeight;

      return productionPlanningRepository.create({
        serialNo: nextSerialNo(existingPnSerials),
        orderNo: input.orderNo,
        meltingType: input.meltingType,
        karigarName: input.karigarName,
        category: input.category,
        designCode: input.designCode,
        totalWeight: input.totalWeight,
        customer: input.customer,
        dept: input.dept,
        plannedWeight,
        wastagePercent: input.wastagePercent,
        planned: input.planned ?? new Date(),
        issueWeight: input.issueWeight,
        remainingWeight: input.remainingWeight ?? plannedWeight,
        status: input.status ?? "pending",
      });
    });
  },

  updateStatus(input: UpdateProductionPlanningStatusInput) {
    return productionPlanningRepository.updateStatusBySerialDept(
      input.serialNo,
      input.dept,
      input.status.toLowerCase(),
    );
  },

  getStats() {
    return productionPlanningRepository.getStats();
  },

  getStockBasedSummary() {
    return productionPlanningRepository.getStockBasedSummary();
  },
};
