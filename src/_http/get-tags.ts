export async function getTags() {
  const response = await fetch('/api/tags', {
    method: 'GET',
    cache: 'no-store',
    next: {
      tags: ['availableTags'],
    },
  })

  const tags = await response.json()

  return { tags }
}
