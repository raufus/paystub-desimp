"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, AlertCircle, Check } from "lucide-react"

interface PaymentMethod {
  id: number
  name: string
  slug: string
  enabled: boolean
  config: Record<string, string>
}

export default function PaymentSettingsSection() {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    loadPaymentMethods()
  }, [])

  const loadPaymentMethods = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("/api/admin/payment-methods")
      
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.methods && Array.isArray(data.methods)) {
        setMethods(data.methods)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      setError(msg)
      console.error("Load payment methods error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (id: number) => {
    setMethods(methods.map(m => 
      m.id === id ? { ...m, enabled: !m.enabled } : m
    ))
    setSaved(false)
  }

  const handleConfigChange = (id: number, key: string, value: string) => {
    setMethods(methods.map(m => 
      m.id === id ? { ...m, config: { ...m.config, [key]: value } } : m
    ))
    setSaved(false)
  }

  const handleSave = async () => {
    try {
      setSaved(false)
      const response = await fetch("/api/admin/payment-methods", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ methods })
      })
      
      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError("Failed to save payment methods")
      }
    } catch (err) {
      setError("Error saving payment methods")
      console.error(err)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} />
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <Check size={18} />
              Payment methods saved successfully
            </div>
          )}

          {loading ? (
            <p className="text-gray-600 text-center py-4">Loading payment methods...</p>
          ) : methods.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No payment methods found</p>
          ) : (
            <div className="space-y-4">
              {methods.map(method => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={method.enabled}
                        onChange={() => handleToggle(method.id)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {method.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </label>
                  </div>
                  
                  {method.enabled && (
                    <div className="space-y-3 pt-3 border-t border-gray-200">
                      {method.slug === "stripe" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Publishable Key
                            </label>
                            <Input
                              type="password"
                              placeholder="pk_live_..."
                              value={method.config.publishable_key || ""}
                              onChange={(e) => handleConfigChange(method.id, "publishable_key", e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Secret Key
                            </label>
                            <Input
                              type="password"
                              placeholder="sk_live_..."
                              value={method.config.secret_key || ""}
                              onChange={(e) => handleConfigChange(method.id, "secret_key", e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Get your keys from <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe Dashboard</a>
                          </p>
                        </>
                      )}

                      {method.slug === "paypal" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Client ID
                            </label>
                            <Input
                              type="password"
                              placeholder="Your PayPal Client ID"
                              value={method.config.client_id || ""}
                              onChange={(e) => handleConfigChange(method.id, "client_id", e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Secret
                            </label>
                            <Input
                              type="password"
                              placeholder="Your PayPal Secret"
                              value={method.config.secret || ""}
                              onChange={(e) => handleConfigChange(method.id, "secret", e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Get your credentials from <a href="https://developer.paypal.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PayPal Developer</a>
                          </p>
                        </>
                      )}

                      {method.slug === "card" && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            Credit card payments are enabled by default. No additional configuration needed.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {methods.length > 0 && (
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button onClick={handleSave} className="gap-2">
                <Save size={16} />
                Save Payment Methods
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
