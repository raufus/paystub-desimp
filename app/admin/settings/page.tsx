"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, AlertCircle } from "lucide-react"

interface PaymentMethod {
  id: number
  name: string
  slug: string
  enabled: boolean
  config: Record<string, string>
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Paystub Generator",
    siteUrl: "http://localhost:3000",
    adminEmail: "admin@paystubgenerator.com",
    supportEmail: "support@paystubgenerator.com",
    maxUploadSize: "10",
    sessionTimeout: "24",
    enableNotifications: true,
    enableEmailAlerts: true,
  })

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [paymentLoading, setPaymentLoading] = useState(true)
  const [paymentError, setPaymentError] = useState("")
  const [saved, setSaved] = useState(false)
  const [paymentSaved, setPaymentSaved] = useState(false)

  useEffect(() => {
    loadPaymentMethods()
  }, [])

  const loadPaymentMethods = async () => {
    try {
      console.log("Loading payment methods...")
      const response = await fetch("/api/admin/payment-methods")
      console.log("Response status:", response.status)
      
      const data = await response.json()
      console.log("Response data:", data)
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${data.error}`)
      }
      
      if (data.methods && Array.isArray(data.methods)) {
        console.log("Setting payment methods:", data.methods)
        setPaymentMethods(data.methods)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load"
      console.error("Payment methods error:", msg)
      setPaymentError(msg)
    } finally {
      setPaymentLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
    setSaved(false)
  }

  const handleSave = async () => {
    console.log("Saving settings:", settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePaymentToggle = (id: number) => {
    setPaymentMethods(paymentMethods.map(m => 
      m.id === id ? { ...m, enabled: !m.enabled } : m
    ))
    setPaymentSaved(false)
  }

  const handlePaymentConfigChange = (id: number, key: string, value: string) => {
    setPaymentMethods(paymentMethods.map(m => 
      m.id === id ? { ...m, config: { ...m.config, [key]: value } } : m
    ))
    setPaymentSaved(false)
  }

  const handlePaymentSave = async () => {
    try {
      const response = await fetch("/api/admin/payment-methods", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ methods: paymentMethods })
      })
      
      if (response.ok) {
        setPaymentSaved(true)
        setTimeout(() => setPaymentSaved(false), 3000)
      } else {
        setPaymentError("Failed to save")
      }
    } catch (err) {
      setPaymentError("Error saving")
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage application settings and configuration</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          ✓ Settings saved successfully
        </div>
      )}

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <Input
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
            <Input
              name="siteUrl"
              value={settings.siteUrl}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
            <Input
              name="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <Input
              name="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Upload Size (MB)</label>
            <Input
              name="maxUploadSize"
              type="number"
              value={settings.maxUploadSize}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (hours)</label>
            <Input
              name="sessionTimeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
            <input
              type="checkbox"
              name="enableNotifications"
              checked={settings.enableNotifications}
              onChange={handleChange}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Enable Email Alerts</label>
            <input
              type="checkbox"
              name="enableEmailAlerts"
              checked={settings.enableEmailAlerts}
              onChange={handleChange}
              className="w-4 h-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Error: {paymentError}</p>
            </div>
          )}

          {paymentSaved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              ✓ Payment methods saved
            </div>
          )}

          {paymentLoading ? (
            <p className="text-gray-600 text-center py-4">Loading payment methods...</p>
          ) : paymentMethods.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No payment methods found</p>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={method.enabled}
                        onChange={() => handlePaymentToggle(method.id)}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
                            <Input
                              type="password"
                              placeholder="pk_live_..."
                              value={method.config.publishable_key || ""}
                              onChange={(e) => handlePaymentConfigChange(method.id, "publishable_key", e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                            <Input
                              type="password"
                              placeholder="sk_live_..."
                              value={method.config.secret_key || ""}
                              onChange={(e) => handlePaymentConfigChange(method.id, "secret_key", e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </>
                      )}

                      {method.slug === "paypal" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                            <Input
                              type="password"
                              placeholder="Your PayPal Client ID"
                              value={method.config.client_id || ""}
                              onChange={(e) => handlePaymentConfigChange(method.id, "client_id", e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secret</label>
                            <Input
                              type="password"
                              placeholder="Your PayPal Secret"
                              value={method.config.secret || ""}
                              onChange={(e) => handlePaymentConfigChange(method.id, "secret", e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </>
                      )}

                      {method.slug === "card" && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">Credit card payments are enabled by default.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {paymentMethods.length > 0 && (
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button onClick={handlePaymentSave} className="gap-2">
                <Save size={16} />
                Save Payment Methods
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <AlertCircle className="text-red-600 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-red-900">Clear All Logs</p>
              <p className="text-sm text-red-700">This action cannot be undone</p>
            </div>
            <Button variant="destructive" size="sm" className="ml-auto">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save size={16} />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
