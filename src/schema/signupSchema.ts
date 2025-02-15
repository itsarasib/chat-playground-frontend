import { z } from "zod";
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignupModel = z.infer<typeof signupSchema>;

export { signupSchema };
export type { SignupModel };
