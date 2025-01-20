import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, UserType } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  userType: UserType;
}

export function LoginForm({ userType }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordId = useId();
  const emailId = useId();
  const router = useRouter();

  const login = useAuth((state) => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      login(data.email, data.password, userType);
      router.push("/portal");
      // if (error) {
      //   console.error("Login failed:", error);
      //   return;
      // }

      // if (user) {
      //   router.push("/portal");
      // }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3"
      noValidate
    >
      <div className="space-y-0.5 mb-2">
        <Label htmlFor={emailId}>Email</Label>
        <div className="h-[52px]">
          <Input
            id={emailId}
            type="email"
            placeholder="Enter email"
            {...form.register("email")}
            className={
              form.formState.errors.email
                ? "border-destructive/80 text-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                : ""
            }
            aria-invalid={!!form.formState.errors.email}
          />
          <div className="h-3 mt-0.5">
            {form.formState.errors.email && (
              <p
                className="text-xs text-destructive"
                role="alert"
                aria-live="polite"
              >
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-0.5">
        <Label htmlFor={passwordId}>Password</Label>
        <div className="h-[52px]">
          <div className="relative">
            <Input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...form.register("password")}
              className={
                form.formState.errors.password
                  ? "border-destructive/80 text-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive pe-9"
                  : "pe-9"
              }
              aria-invalid={!!form.formState.errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              aria-controls={passwordId}
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="h-3 mt-0.5">
            {form.formState.errors.password && (
              <p
                className="text-xs text-destructive"
                role="alert"
                aria-live="polite"
              >
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? "Logging in..."
          : `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
      </Button>
    </form>
  );
}
