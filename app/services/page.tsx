import { getActiveServices } from "@/lib/services"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import * as Icons from "lucide-react"

export const metadata = {
  title: "Services | Paystub Generator",
  description: "Explore our comprehensive document generation services"
}

export default async function ServicesPage() {
  const services = await getActiveServices()

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = Icons
    return iconMap[iconName] || Icons.FileText
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            Professional document generation solutions for your business needs
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => {
              const IconComponent = getIcon(service.icon)
              const features = service.features.split(",").map(f => f.trim())

              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      {service.price > 0 && (
                        <div className="text-2xl font-bold text-primary">${service.price}</div>
                      )}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    <div className="space-y-2 mb-6 flex-1">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full gap-2">
                      <Link href="/create-paystub">
                        Get Started
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
