import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

const Recipes = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/all-items')
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load recipes')
      if (Array.isArray(data) && data.length > 0) {
        setItems(data)
        return
      }
      // Seed a sample recipe if empty
      const sample = {
        menuid: Date.now(),
        name: 'Sample Avocado Toast',
        thumbnail_image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
        category: 'Breakfast',
        instructions: 'Toast bread. Mash avocado with salt, pepper, and lemon. Spread and serve.',
        tags: ['quick', 'healthy'],
        ingredients: [
          { name: 'Bread slices', quantity: '2' },
          { name: 'Avocado', quantity: '1' },
          { name: 'Lemon juice', quantity: '1 tsp' },
          { name: 'Salt & Pepper', quantity: 'to taste' }
        ],
        comments: [],
        more: [{ prep_time: '5 minutes', cook_time: '2 minutes', servings: '1', difficulty: 'Easy', source: 'Seed' }]
      }
      const createRes = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample)
      })
      if (createRes.ok) {
        const refetch = await fetch('/api/all-items')
        const refetchData = await refetch.json()
        setItems(Array.isArray(refetchData) ? refetchData : [])
      } else {
        setItems([])
      }
    } catch (e) {
      setError(e.message || 'Error loading recipes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center">Loading recipes...</div>
  if (error) return <div className="min-h-[50vh] flex items-center justify-center text-red-600">{error}</div>

  return (
    <div className='px-6 lg:px-12 py-20'>
      <h1 className='text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed capitalize'>Recipes</h1>
      <ul className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {items.map(item => (
          <Card item={item} key={item._id || item.menuid} />
        ))}
      </ul>
    </div>
  )
}

export default Recipes

