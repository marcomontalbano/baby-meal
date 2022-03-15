import dayjs, { Dayjs } from 'dayjs'

export type Protein = {
  name: string;
  category: 'carne rossa' | 'carne bianca' | 'pesce'
}

export type Carbohydrate = {
  name: string;
  category: 'crema' | 'pastina'
}

type NotEmptyArrayOf<T> = [T, ...T[]]

export const proteins: NotEmptyArrayOf<Protein> = [
  { name: 'Pollo', category: 'carne bianca' },
  { name: 'Coniglio', category: 'carne bianca' },
  { name: 'Tacchino', category: 'carne bianca' },
  { name: 'Agnello', category: 'carne bianca' },
  { name: 'Manzo', category: 'carne rossa' },
  { name: 'Vitello', category: 'carne rossa' },
  { name: 'Nasello', category: 'pesce' },
  { name: 'Spigola', category: 'pesce' },
  { name: 'Salmone', category: 'pesce' },
  { name: 'Orata', category: 'pesce' },
  { name: 'Platessa', category: 'pesce' },
  { name: 'Trota', category: 'pesce' },
]

const proteinsByCategory = Object.values(
  proteins.reduce((acc, cv) => {
    return {
      ...acc,
      [cv.category]: [
        ...(acc[cv.category] || []),
        cv
      ]
    }
  }, {} as { [category: string]: Protein[] })
)

export const carbohydrates: Carbohydrate[] = [
  { name: 'Crema di Riso', category: 'crema' },
  { name: 'Pastina', category: 'pastina' },
  { name: 'Crema di Mais e Tapioca', category: 'crema' },
  { name: 'Pastina', category: 'pastina' },
  
  { name: 'Semolino', category: 'crema' },
  { name: 'Pastina', category: 'pastina' },
  { name: 'Crema Multicereali', category: 'crema' },
  { name: 'Pastina', category: 'pastina' },
]

type Options = {
  seed?: Dayjs
  date?: Dayjs
}

export type LunchMeal = { protein: Protein, carbohydrate: Carbohydrate }
export type DinnerMeal = { carbohydrate: Carbohydrate }

function getMeal(options: Options = {}) {
  const {
    seed = dayjs(0),
    date = dayjs()
  } = options

  const day = date.diff(seed, 'days')

  return {
    halfJar: Math.floor(day / 2),
    fullJar: day,
  }
}

export function getLunchMeal(options: Options = {}): LunchMeal {
  const { halfJar, fullJar } = getMeal(options)

  const proteinCategory = proteinsByCategory[halfJar % proteinsByCategory.length]

  return {
    protein: proteinCategory[Math.floor(halfJar / proteinsByCategory.length) % proteinCategory.length],
    carbohydrate: carbohydrates[fullJar % carbohydrates.length]
  }
}

export function getDinnerMeal(options: Options = {}): DinnerMeal {
  const { fullJar } = getMeal(options)

  return {
    carbohydrate: carbohydrates[(fullJar +1) % carbohydrates.length]
  }
}
