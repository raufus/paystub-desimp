"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Trash2, Edit, Plus, GripVertical } from "lucide-react"

interface Service {
  id: number
  title: string
  slug: string
  description: string
  icon: string
  features: string
  price: number
  status: "active" | "inactive"
  order: number
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "",
    features: "",
    price: 0,
    status: "active" as const,
    order: 0
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/services")
      const data = await response.json()
      setServices(data.services || [])
    } catch (error) {
      console.error("Failed to load services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowDialog(false)
        setFormData({
          title: "",
          slug: "",
          description: "",
          icon: "",
          features: "",
          price: 0,
          status: "active",
          order: 0
        })
        setEditingId(null)
        loadServices()
      }
    } catch (error) {
      console.error("Failed to save service:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return

    try {
      const response = await fetch(`/api/admin/services/${id}`, { method: "DELETE" })
      if (response.ok) {
        loadServices()
      }
    } catch (error) {
      console.error("Failed to delete service:", error)
    }
  }

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      features: service.features,
      price: service.price,
      status: service.status,
      order: service.order
    })
    setEditingId(service.id)
    setShowDialog(true)
  }

  const handleNew = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      icon: "",
      features: "",
      price: 0,
      status: "active",
      order: services.length
    })
    setEditingId(null)
    setShowDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Button onClick={handleNew} className="gap-2">
          <Plus size={16} />
          New Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8">Loading...</p>
          ) : services.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No services yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 w-8"></th>
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Icon</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Order</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <GripVertical size={16} className="text-muted-foreground" />
                      </td>
                      <td className="py-3 px-4 font-medium">{service.title}</td>
                      <td className="py-3 px-4">{service.icon}</td>
                      <td className="py-3 px-4">${service.price}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{service.order}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          className="gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                          className="gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Service" : "New Service"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="service-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Icon (Lucide icon name)</label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="FileText, DollarSign, etc"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Feature 1, Feature 2, Feature 3"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
