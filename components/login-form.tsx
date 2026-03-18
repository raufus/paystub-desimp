"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      console.log("Login successful, redirecting to:", state.redirectTo)
      // Use a small delay to ensure cookie is set before redirect
      setTimeout(() => {
        router.refresh()
        router.push(state.redirectTo)
      }, 100)
    }
  }, [state, router])

  return (
    <div className="w-full max-w-md space-y-8">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-lg text-muted-foreground">Sign in to your account</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded">
            {state.error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input id="password" name="password" type="password" required className="bg-background border-border" />
          </div>
        </div>

        <SubmitButton />

        <div className="text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-foreground hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
