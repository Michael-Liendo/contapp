import { z } from "zod";

export const AccountPlanSchema = z.object({
  id: z.string().describe("The unique identifier of the account plan"),
  company_id: z.string().describe("The company that owns the account plan"),
  nomenclature: z.string(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const AccountPlanForCreateSchema = z.object({
  company_id: z.string(),
  nomenclature: z.string(),
  name: z.string(),
});

export const AccountPlanForUpdateSchema = AccountPlanForCreateSchema.partial();
