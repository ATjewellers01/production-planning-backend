import { Router } from "express";
import { alloyConversionRoutes } from "../models/alloy-conversions/alloy-conversion.routes.js";
import { authRoutes } from "../models/auth/auth.routes.js";
import { departmentIssueRoutes } from "../models/department-issues/department-issue.routes.js";
import { metalStockRoutes } from "../models/metal-stock/metal-stock.routes.js";
import { productRoutes } from "../models/products/product.routes.js";
import { productionOrderRoutes } from "../models/production-orders/production-order.routes.js";
import { productionPlanningRoutes } from "../models/production-planning/production-planning.routes.js";
import { userRoutes } from "../models/users/user.routes.js";
import { departmentReceiptRoutes } from "../models/department-receipts/department-receipt.routes.js"
import { karigarIssueRoutes } from "../models/karigar-issues/karigar-issue.routes.js";
import { masterDropdownRoutes } from "../models/master-dropdown/master-dropdown.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/products", productRoutes);
apiRouter.use("/production-orders", productionOrderRoutes);
apiRouter.use("/production-planning", productionPlanningRoutes);
apiRouter.use("/department-issues", departmentIssueRoutes);
apiRouter.use("/metal-stock", metalStockRoutes);
apiRouter.use("/alloy-conversions", alloyConversionRoutes);
apiRouter.use("/department-receipts", departmentReceiptRoutes);
apiRouter.use("/karigar-issues", karigarIssueRoutes);
apiRouter.use("/master-dropdown", masterDropdownRoutes);
