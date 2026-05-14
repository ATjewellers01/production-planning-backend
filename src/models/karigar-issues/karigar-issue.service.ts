import type { CreateKarigarIssueInput } from "./karigar-issue.validation.js";
import { karigarIssueRepository } from "./karigar-issue.repository.js";

function nextIssueNo(totalEntries: number) {
  return `KI-${String(totalEntries + 1).padStart(4, "0")}`;
}

export const karigarIssueService = {
  listEntries() {
    return karigarIssueRepository.findAll();
  },

  async createEntry(input: CreateKarigarIssueInput) {
    const totalEntries = await karigarIssueRepository.countAll();

    return karigarIssueRepository.create({
      issueNo: nextIssueNo(totalEntries),
      orderNo: input.orderNo,
      totalWeight: input.totalWeight,
      meltingType: input.meltingType,
      karigarName: input.karigarName,
      expectedDelivery: input.expectedDelivery,
      authorizedBy: input.authorizedBy,
      directMetal: input.directMetal,
      die: input.die,
      chain: input.chain,
      taar: input.taar,
      kdm: input.kdm,
      planned: input.planned,
    });
  },
};
