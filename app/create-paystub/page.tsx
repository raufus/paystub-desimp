import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PaystubGenerator } from "@/components/paystub-generator"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

export default async function CreatePaystubPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Await Next.js dynamic searchParams API before using its properties
  const { template } = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full"></div>
      </div>
      <PageHeader />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl p-12">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-primary to-secondary p-4 rounded-full">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gray-900">Create Your </span>
                <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text animate-pulse">
                  Paystub
                </span>
              </h1>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">Professional paystubs in 3 simple steps</p>
            </div>
          </div>
        </div>

        {/* Template selection now handled by dropdown inside PaystubGenerator */}

        <PaystubGenerator user={user} initialTemplateId={typeof template === 'string' ? template : 'template2'} />

        {/* Expert Help CTA */}
        <section className="mt-16">
          <div className="bg-gray-50 rounded-3xl p-8 border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Need Expert Assistance?</h3>
                <p className="text-gray-600">Let our professionals create your paystub with 100% accuracy and compliance</p>
              </div>
              <a href="https://wa.me/12067045757" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-medium">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Expert Help
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
