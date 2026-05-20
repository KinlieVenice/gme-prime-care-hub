import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/primary-care')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/primary-care"!</div>
}
