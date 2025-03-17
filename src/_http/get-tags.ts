export async function getTags() {
  const response = await fetch('/api/tags', {
    cache: 'no-cache',
    next: {
      tags: ['tags'],
    },
  })
  const tags = await response.json()
  return { tags }
}
