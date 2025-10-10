"use client"

import React from "react"

interface StepHeaderProps {
  step: number | string
  title: string
}

export function StepHeader({ step, title }: StepHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
        {step}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  )
}


