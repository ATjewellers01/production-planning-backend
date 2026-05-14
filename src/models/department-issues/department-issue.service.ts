import type { CreateDepartmentIssueEntryInput } from "./department-issue.validation.js";
import { departmentIssueRepository } from "./department-issue.repository.js";

function nextIssueNo(totalEntries: number) {
  return `IS-${String(totalEntries + 1).padStart(3, "0")}`;
}

let issueQueue = Promise.resolve();

function withIssueQueue<T>(task: () => Promise<T>) {
  const run = issueQueue.then(task, task);
  issueQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export const departmentIssueService = {
  listEntries() {
    return departmentIssueRepository.findAll();
  },

  createEntry(input: CreateDepartmentIssueEntryInput) {
    return withIssueQueue(async () => {
      const totalEntries = await departmentIssueRepository.countAll();

      return departmentIssueRepository.createIssueAndUpdatePlanning({
        issueNo: nextIssueNo(totalEntries),
        serialNo: input.serialNo,
        orderNo: input.orderNo,
        issueWeight: input.issueWeight,
        karigarName: input.karigarName,
        authorizedBy: input.authorizedBy,
        plannedStatus: input.plannedStatus,
        dept: input.dept,
        meltingType: input.meltingType,
      });
    });
  },
};
