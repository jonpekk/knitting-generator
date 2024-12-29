import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import PatternGrid from '@/components/PatternGrid/PatternGrid'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <PatternGrid />
    </div>
  )
}
