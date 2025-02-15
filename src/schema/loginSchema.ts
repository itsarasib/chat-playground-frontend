import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginModel = z.infer<typeof LoginSchema>;

export { LoginSchema };
export type { LoginModel };
