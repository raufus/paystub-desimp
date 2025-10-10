"use client"

import { useState } from "react"
import { PaystubForm } from "@/components/paystub-form-new"
import { PaystubPreview } from "@/components/paystub-preview"
import { LogoUpload } from "@/components/logo-upload"
import { StepHeader } from "@/components/step-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DownloadHtmlFileButton } from "@/components/download-html-file-button"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export interface PaystubData {
  // Template Selection
  templateId: string
  // Theme Selection
  themeId?: string
  themeColor?: string

  // Additional Template Fields
  coNumber: string
  fileNumber: string
  deptNumber: string
  clockNumber: string
  vchrNumber: string

  // Payment Details
  paymentType: string
  employmentType: string
  email: string
  numberOfPaystubs: number
  taxState: string

  // Company Information
  companyName: string
  companyAddress: string
  companyAddress2?: string
  companyCity: string
  companyState: string
  companyZip: string
  companyPhone: string
  companyEIN: string
  companyLogo?: string

  // Employee Information
  employeeName: string
  employeeAddress: string
  employeeAddress2?: string
  employeeCity: string
  employeeState: string
  employeeZip: string
  employeeSSN: string
  employeeId: string
  employeePhone: string
  exemptions: number
  maritalStatus: "single" | "married" | "head_of_household"
  directDeposit: boolean

  // Pay Period Information
  payPeriodNumber: number
  payPeriodStart: string
  payPeriodEnd: string
  payDate: string
  payFrequency:
    | "daily"
    | "weekly"
    | "bi-weekly"
    | "semi-monthly"
    | "monthly"
    | "quarterly"
    | "semi-annually"
    | "annually"
  adviceNumber: string

  // Earnings Details
  payType: "hourly" | "salary"
  // Hourly fields (used when payType === "hourly")
  hourlyRate: number
  hoursWorked: number
  regularRate: number
  regularHours: number
  overtimeRate: number
  overtimeHours: number
  // Salary field (used when payType === "salary")
  salary: number
  bonusAmount: number
  commissionAmount: number
  holidayHours: number
  sickHours: number
  vacationHours: number

  // Deductions
  federalTax: number
  stateTax: number
  socialSecurity: number
  medicare: number
  stateDisability: number
  healthInsurance: number
  dentalInsurance: number
  visionInsurance: number
  lifeInsurance: number
  retirement401k: number
  rothIRA: number
  hsa: number
  parkingFee: number
  unionDues: number
  otherDeductions: number

  // Year to Date Totals
  ytdGrossPay: number
  ytdFederalTax: number
  ytdStateTax: number
  ytdSocialSecurity: number
  ytdMedicare: number
  ytdOvertimePay: number
  ytdTotalDeductions: number
  ytdNetPay: number

  // Calculated fields
  grossPay: number
  totalDeductions: number
  netPay: number
}

interface PaystubGeneratorProps {
  user: any
  initialTemplateId?: string
}

const initialData: PaystubData = {
  templateId: "template1",
  themeId: "blue",
  themeColor: "#60a5fa",
  coNumber: "",
  fileNumber: "",
  deptNumber: "",
  clockNumber: "",
  vchrNumber: "",
  paymentType: "",
  employmentType: "",
  email: "",
  numberOfPaystubs: 26,
  taxState: "",
  companyName: "",
  companyAddress: "",
  companyCity: "",
  companyState: "",
  companyZip: "",
  companyPhone: "",
  companyEIN: "",
  employeeName: "",
  employeeAddress: "",
  employeeCity: "",
  employeeState: "",
  employeeZip: "",
  employeeSSN: "",
  employeeId: "",
  employeePhone: "",
  exemptions: 0,
  maritalStatus: "single",
  directDeposit: false,
  payPeriodNumber: 1,
  payPeriodStart: "",
  payPeriodEnd: "",
  payDate: "",
  payFrequency: "bi-weekly",
  adviceNumber: "",
  payType: "hourly",
  hourlyRate: 25,
  hoursWorked: 40,
  regularRate: 0,
  regularHours: 0,
  overtimeRate: 37.5,
  overtimeHours: 0,
  salary: 50000,
  bonusAmount: 0,
  commissionAmount: 0,
  holidayHours: 0,
  sickHours: 0,
  vacationHours: 0,
  federalTax: 0,
  stateTax: 0,
  socialSecurity: 0,
  medicare: 0,
  stateDisability: 0,
  healthInsurance: 0,
  dentalInsurance: 0,
  visionInsurance: 0,
  lifeInsurance: 0,
  retirement401k: 0,
  rothIRA: 0,
  hsa: 0,
  parkingFee: 0,
  unionDues: 0,
  otherDeductions: 0,
  ytdGrossPay: 0,
  ytdFederalTax: 0,
  ytdStateTax: 0,
  ytdSocialSecurity: 0,
  ytdMedicare: 0,
  ytdOvertimePay: 0,
  ytdTotalDeductions: 0,
  ytdNetPay: 0,
  grossPay: 0,
  totalDeductions: 0,
  netPay: 0,
}

export function PaystubGenerator({ user: _user, initialTemplateId }: PaystubGeneratorProps) {
  const [paystubData, setPaystubData] = useState<PaystubData>(() => ({
    ...initialData,
    templateId: initialTemplateId || initialData.templateId,
  }))

  const updatePaystubData = (updates: Partial<PaystubData>) => {
    setPaystubData((prev) => {
      const updated = { ...prev, ...updates }

      // Auto-calculate period end and pay date when frequency or start changes
      const shouldRecalculate =
        typeof updates.payPeriodStart !== "undefined" || typeof updates.payFrequency !== "undefined"
      const startDateStr = updated.payPeriodStart
      if (shouldRecalculate && startDateStr) {
        const base = new Date(startDateStr)
        const end = new Date(base.getTime())
        const pay = new Date(base.getTime())
        switch (updated.payFrequency) {
          case "daily":
            // same day
            end.setDate(base.getDate())
            pay.setTime(end.getTime())
            break
          case "weekly":
            end.setDate(end.getDate() + 6)
            pay.setTime(end.getTime())
            break
          case "bi-weekly":
            end.setDate(end.getDate() + 13)
            pay.setTime(end.getTime())
            break
          case "semi-monthly":
            // 1st-15th or 16th-end of month
            const day = base.getDate()
            if (day <= 15) {
              end.setDate(15)
            } else {
              // last day of month
              end.setMonth(end.getMonth() + 1, 0)
            }
            pay.setTime(end.getTime())
            break
          case "monthly":
            end.setMonth(end.getMonth() + 1)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
          case "quarterly":
            end.setMonth(end.getMonth() + 3)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
          case "semi-annually":
            end.setMonth(end.getMonth() + 6)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
          case "annually":
            end.setFullYear(end.getFullYear() + 1)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
        }
        const toISO = (d: Date) => d.toISOString().slice(0, 10)
        updated.payPeriodEnd = toISO(end)
        updated.payDate = toISO(pay)
      }

      // Calculate gross pay only if it wasn't explicitly provided by the form logic
      if (typeof updates.grossPay === 'undefined') {
        if (updated.payType === "hourly") {
          const regularPay = (updated.hourlyRate || 0) * (updated.hoursWorked || 0)
          const overtimePay = (updated.overtimeRate || 0) * (updated.overtimeHours || 0)
          const holidayPay = (updated.holidayHours || 0) * (updated.hourlyRate || 0)
          const sickPay = (updated.sickHours || 0) * (updated.hourlyRate || 0)
          const vacationPay = (updated.vacationHours || 0) * (updated.hourlyRate || 0)
          updated.grossPay =
            regularPay + overtimePay + holidayPay + sickPay + vacationPay + (updated.bonusAmount || 0) + (updated.commissionAmount || 0)
        } else {
          // Salary-based per-period gross pay: divide annual salary by MAX periods for the selected frequency
          const getMaxPaystubs = (frequency: string | undefined): number => {
            switch ((frequency || 'bi-weekly').toLowerCase()) {
              case 'daily': return 52
              case 'weekly': return 52
              case 'bi-weekly': return 26
              case 'semi-monthly': return 24
              case 'monthly': return 12
              case 'quarterly': return 4
              case 'semi-annually': return 2
              case 'annually': return 1
              default: return 26
            }
          }
          const periods = getMaxPaystubs(updated.payFrequency)
          const perPeriodSalary = (updated.salary || 0) / (periods || 1)
          updated.grossPay = perPeriodSalary + (updated.bonusAmount || 0) + (updated.commissionAmount || 0)
        }
      }

      // Calculate total deductions
      updated.totalDeductions =
        (updated.federalTax || 0) +
        (updated.stateTax || 0) +
        (updated.socialSecurity || 0) +
        (updated.medicare || 0) +
        (updated.stateDisability || 0) +
        (updated.healthInsurance || 0) +
        (updated.dentalInsurance || 0) +
        (updated.visionInsurance || 0) +
        (updated.lifeInsurance || 0) +
        (updated.retirement401k || 0) +
        (updated.rothIRA || 0) +
        (updated.hsa || 0) +
        (updated.parkingFee || 0) +
        (updated.unionDues || 0) +
        (updated.otherDeductions || 0)

      // Calculate net pay
      updated.netPay = updated.grossPay - updated.totalDeductions

      return updated
    })
  }

  

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {/* Template & Color Selection */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-6 border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-700">Template:</span>
              <Select value={paystubData.templateId} onValueChange={(v) => updatePaystubData({ templateId: v })}>
                <SelectTrigger className="w-48 h-11 bg-white border-2 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template1">Classic</SelectItem>
                  <SelectItem value="template2">Modern</SelectItem>
                  <SelectItem value="template3">Detailed</SelectItem>
                  <SelectItem value="template4">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-700">Color:</span>
              <div className="flex gap-2">
                {[
                  { id: 'blue', color: '#60a5fa' },
                  { id: 'green', color: '#10b981' },
                  { id: 'gray', color: '#9ca3af' },
                  { id: 'purple', color: '#8b5cf6' },
                  { id: 'orange', color: '#f59e0b' },
                  { id: 'red', color: '#ef4444' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updatePaystubData({ themeId: t.id, themeColor: t.color })}
                    className={`w-8 h-8 rounded-full border-2 ${paystubData.themeId === t.id ? 'border-gray-800 scale-110' : 'border-gray-300'}`}
                    style={{ backgroundColor: t.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <PaystubPreview data={paystubData} />
        </div>
        {/* Custom Templates CTA */}
        <div className="flex justify-center">
          <a
            href={`https://wa.me/12067045757?text=${encodeURIComponent("Hi! I'm interested in personalized and customized paystub templates. Can you help me?")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              <MessageCircle className="h-4 w-4 mr-2" />
              Get Custom Templates
            </Button>
          </a>
        </div>

        <StepHeader step={1} title="Company Logo" />
        
        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8">
          <LogoUpload 
            logo={paystubData.companyLogo} 
            onLogoChange={(logo) => updatePaystubData({ companyLogo: logo })} 
          />
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
          <PaystubForm data={paystubData} onUpdate={updatePaystubData} />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
            6
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Review & Download</h2>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <PaystubPreview data={paystubData} />
        </div>

        {/* Color options moved to top */}

        {/* Template selection and preview moved to top */}
      </div>

      <div className="flex justify-center pt-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <DownloadHtmlFileButton 
            data={paystubData} 
            label="Complete Order" 
            className="relative bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-xl" 
          />
        </div>
      </div>
    </div>
  )
}
