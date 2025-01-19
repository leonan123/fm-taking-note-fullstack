import { ColorSettingsForm } from '../_components/color-settings-form'

export default function ColorThemePage() {
  return (
    <main className="max-w-[528px] flex-1 space-y-6 p-8">
      <div>
        <h2 className="font-semibold">Color Theme</h2>
        <p className="text-sm text-neutral-500">Choose your color theme:</p>
      </div>

      <ColorSettingsForm />
    </main>
  )
}
