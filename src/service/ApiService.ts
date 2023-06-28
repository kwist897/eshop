import type Catalog from '@/model/Catalog'
import type CatalogFilter from '@/model/CatalogFilter'
import type Category from '@/model/Category'
import type Product from '@/model/Product'

const apiService = {
  async getCatalogByFilter(filter: CatalogFilter): Promise<Product[]> {
    const categories = await this.getCategories();

    let products = await fetch(import.meta.env.BASE_URL + 'catalog.json')
      .then((res) => res.json())
      .then(async (json: Catalog) => {
        return filter.category === 'All'
          ? Promise.resolve(json.products)
          : Promise.resolve(
              json.products.filter((e) =>
                this.isInCategory(categories, e.category, filter.category!)
              )
            )
      })

    if (filter.name && filter.name.length > 0) {
      products = products.filter((p) => p.name.toLowerCase().includes(filter.name!))
    }

    if (filter.priceMax) {
      products = products.filter((p) => p.price <= filter.priceMax!)
    }

    if (filter.priceMin) {
      products = products.filter((p) => p.price >= filter.priceMin!)
    }

    return Promise.resolve(products)
  },
  async getProductsByName(name: string): Promise<Product[]> {
    return await fetch(import.meta.env.BASE_URL + 'catalog.json')
      .then((res) => res.json())
      .then((json: Catalog) => Promise.resolve(json.products.filter((e) => e.name.includes(name))))
  },
  async getCategories(): Promise<Category[]> {
    return await fetch(import.meta.env.BASE_URL + 'categories.json')
    .then((res) => res.json())
    .then((res) => res as Category[])
  },
  isInCategory(categories: Category[], category: string, searchCategory: string): boolean {
    if (searchCategory === 'All' || searchCategory === category) return true

    const foundCategory = this.findCategory(categories, searchCategory)
    if (foundCategory === null) return false

    return this.isInCategoryRecursive(foundCategory, category)
  },

  findCategory(categories: Category[], searchCode: string): Category | null {
    let category: Category | null = null

    categories.forEach((c) => {
      if (category === null) {
        const tmp = this.findCategoryRecursive(c, searchCode)
        if (tmp !== null) {
          category = tmp
        }
      }
    })

    return category
  },
  findCategoryRecursive(category: Category, searchCode: string): Category | null {
    let currCategory: Category | null = null

    if (category.code === searchCode) {
      return category
    }

    if (category.children) {
      category.children.forEach((c) => {
        const tmp = this.findCategoryRecursive(c, searchCode)
        if (tmp !== null) {
          currCategory = tmp
        }
      })
    }
    return currCategory
  },
  isInCategoryRecursive(category: Category, categoryCode: string): boolean {
    let isCategory = false
    if (category.code === categoryCode) {
      isCategory = true
    }
    if (category.children) {
      category.children.forEach((c) => {
        isCategory = isCategory || this.isInCategoryRecursive(c, categoryCode)
      })
    }
    return isCategory
  }
}

export default apiService
