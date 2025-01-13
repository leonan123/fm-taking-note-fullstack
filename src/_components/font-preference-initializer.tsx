export function FontPreferenceInitializer() {
  return (
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const storedAppSetings = localStorage.getItem('taking-note@font');
              document.documentElement.dataset.font = storedAppSetings || 'sans'
            })();
            `,
        }}
      />
    </head>
  )
}
