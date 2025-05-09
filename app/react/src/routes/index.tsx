import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import PatternCanvas from '@/components/PatternCanvas/PatternCanvas'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <PatternCanvas />
    </div>
  )
}
