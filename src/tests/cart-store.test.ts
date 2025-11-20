import { beforeEach, describe, expect, it } from 'vitest'
import { act } from '@testing-library/react'

import { useCartStore } from '@/app/lib/stores/cart-store'

const baseItem = {
  productId: 'prod_1',
  variantId: 'variant_1',
  title: 'Sunflower Buddy',
  handle: 'sunflower-buddy',
  price: 25,
  currency: 'USD',
  image: {
    url: '/sunflower.png',
    altText: 'Sunflower Buddy',
  },
  selectedColor: '#FFB300',
  selectedColorName: 'Sunflower Yellow',
}

function resetStore() {
  act(() => {
    useCartStore.setState({ items: [], isOpen: false })
  })
  localStorage.clear()
}

describe('cart-store', () => {
  beforeEach(() => {
    resetStore()
  })

  it('adds a new item to the cart', () => {
    const { addItem, items } = useCartStore.getState()

    act(() => {
      addItem(baseItem)
    })

    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({
      productId: 'prod_1',
      quantity: 1,
    })
  })

  it('increments quantity when the same item is added again', () => {
    const { addItem, items } = useCartStore.getState()

    act(() => {
      addItem(baseItem)
      addItem(baseItem)
    })

    expect(items[0].quantity).toBe(2)
  })

  it('removes an item from the cart', () => {
    const { addItem, removeItem, items } = useCartStore.getState()

    let itemId = ''
    act(() => {
      addItem(baseItem)
      itemId = useCartStore.getState().items[0].id
      removeItem(itemId)
    })

    expect(items).toHaveLength(0)
  })

  it('updates quantity and removes item when below 1', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    let itemId = ''

    act(() => {
      addItem(baseItem)
      itemId = useCartStore.getState().items[0].id
      updateQuantity(itemId, 0)
    })

    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('caps quantity to the maximum limit', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    let itemId = ''

    act(() => {
      addItem(baseItem)
      itemId = useCartStore.getState().items[0].id
      updateQuantity(itemId, 150)
    })

    expect(useCartStore.getState().items[0].quantity).toBe(99)
  })

  it('computes item count and subtotal correctly', () => {
    const { addItem, getItemCount, getSubtotal } = useCartStore.getState()

    act(() => {
      addItem({ ...baseItem, quantity: 2 })
      addItem({ ...baseItem, productId: 'prod_2', variantId: 'variant_2', price: 10, handle: 'mini' })
    })

    expect(getItemCount()).toBe(3)
    expect(getSubtotal()).toBe(25 * 2 + 10)
  })

  it('toggles cart visibility', () => {
    const { openCart, closeCart, toggleCart } = useCartStore.getState()

    act(() => {
      openCart()
    })
    expect(useCartStore.getState().isOpen).toBe(true)

    act(() => {
      closeCart()
    })
    expect(useCartStore.getState().isOpen).toBe(false)

    act(() => {
      toggleCart()
    })
    expect(useCartStore.getState().isOpen).toBe(true)
  })
})

