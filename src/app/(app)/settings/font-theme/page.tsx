import { Suspense } from 'react'
import { FontSettingsForm } from '../_components/font-settings-form'

export default function FontThemePage() {
  return (
    <main className="max-w-[528px] flex-1 space-y-6 p-8">
      <div>
        <h2 className="font-semibold">Font Theme</h2>
        <p className="text-sm text-neutral-500">Choose your font theme:</p>
      </div>

      <Suspense>
        <FontSettingsForm />
      </Suspense>
    </main>
  )
}
