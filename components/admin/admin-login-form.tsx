"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { adminLogin } from "@/app/admin/login/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        "Login"
      )}
    </Button>
  )
}

export default function AdminLoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(adminLogin, { success: false, error: null, redirectTo: null } as any)

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      console.log("Admin login successful, redirecting to:", state.redirectTo)
      setTimeout(() => {
        router.push(state.redirectTo)
        router.refresh()
      }, 100)
    }
  }, [state, router])

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          required
          className="bg-gray-50 border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="bg-gray-50 border-gray-300"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
