import { relations } from "drizzle-orm";
import { productionOrders } from "./production-orders.js";
import { products } from "./products.js";
import { departmentIssueEntries } from "./department-issue-entries.js";
import { departmentReceiptEntries } from "./department-receipt-entries.js";
import { productionPlanningEntries } from "./production-planning-entries.js";
import { karigarIssueEntries } from "./karigar-issue-entries.js";
import { karigarReceiptEntries } from "./karigar-receipt-entries.js";

export const productsRelations = relations(products, ({ many }) => ({
  productionOrders: many(productionOrders),
}));

export const productionOrdersRelations = relations(productionOrders, ({ one }) => ({
  product: one(products, {
    fields: [productionOrders.productId],
    references: [products.id],
  }),
}));

export const productionPlanningEntriesRelations = relations(productionPlanningEntries, ({ many }) => ({
  departmentIssues: many(departmentIssueEntries),
}));

export const departmentIssueEntriesRelations = relations(departmentIssueEntries, ({ many, one }) => ({
  productionPlanning: one(productionPlanningEntries, {
    fields: [departmentIssueEntries.serialNo],
    references: [productionPlanningEntries.serialNo],
  }),
  receipts: many(departmentReceiptEntries),
}));

export const departmentReceiptEntriesRelations = relations(departmentReceiptEntries, ({ one }) => ({
  issue: one(departmentIssueEntries, {
    fields: [departmentReceiptEntries.issueNo],
    references: [departmentIssueEntries.issueNo],
  }),
}));

export const karigarIssueEntriesRelations = relations(karigarIssueEntries, ({ many }) => ({
  receipts: many(karigarReceiptEntries),
}));

export const karigarReceiptEntriesRelations = relations(karigarReceiptEntries, ({ one }) => ({
  issue: one(karigarIssueEntries, {
    fields: [karigarReceiptEntries.issueNo],
    references: [karigarIssueEntries.issueNo],
  }),
}));
