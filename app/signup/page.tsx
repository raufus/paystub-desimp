import { getCurrentUser } from "@/lib/get-user"
import { redirect } from "next/navigation"
import SignUpForm from "@/components/signup-form"

export default async function SignUpPage() {
  // Check if user is already logged in
  const user = await getCurrentUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <SignUpForm />
    </div>
  )
}
