import dayjs, { Dayjs } from 'dayjs'

export type Protein = {
  name: string;
  category: 'carne rossa' | 'carne bianca' | 'fish'
}

export type Carbohydrate = {
  name: string;
  category: 'crema' | 'pastina'
}

type NotEmptyArrayOf<T> = [T, ...T[]]

// const proteinsA: NotEmptyArrayOf<Protein> = [
//   { name: 'Pollo', category: 'carne bianca' },
//   { name: 'Coniglio', category: 'carne bianca' },
//   { name: 'Tacchino', category: 'carne bianca' },
//   { name: 'Agnello', category: 'carne bianca' },
//   { name: 'Manzo', category: 'carne rossa' },
//   { name: 'Vitello', category: 'carne rossa' },
//   { name: 'Nasello', category: 'fish' },
//   { name: 'Spigola', category: 'fish' },
//   { name: 'Salmone', category: 'fish' },
//   { name: 'Orata', category: 'fish' },
//   { name: 'Platessa', category: 'fish' },
//   { name: 'Trota', category: 'fish' },
// ]

export const proteins: NotEmptyArrayOf<Protein> = [
  { name: 'Pollo', category: 'carne bianca' },
  { name: 'Coniglio', category: 'carne bianca' },
  { name: 'Manzo', category: 'carne rossa' },
  { name: 'Nasello', category: 'fish' },
  
  { name: 'Tacchino', category: 'carne bianca' },
  { name: 'Agnello', category: 'carne bianca' },
  { name: 'Vitello', category: 'carne rossa' },
  { name: 'Spigola', category: 'fish' },
  
  { name: 'Pollo', category: 'carne bianca' },
  { name: 'Coniglio', category: 'carne bianca' },
  { name: 'Manzo', category: 'carne rossa' },
  { name: 'Salmone', category: 'fish' },
  
  { name: 'Tacchino', category: 'carne bianca' },
  { name: 'Agnello', category: 'carne bianca' },
  { name: 'Vitello', category: 'carne rossa' },
  { name: 'Orata', category: 'fish' },

  { name: 'Pollo', category: 'carne bianca' },
  { name: 'Coniglio', category: 'carne bianca' },
  { name: 'Manzo', category: 'carne rossa' },
  { name: 'Platessa', category: 'fish' },

  { name: 'Tacchino', category: 'carne bianca' },
  { name: 'Agnello', category: 'carne bianca' },
  { name: 'Vitello', category: 'carne rossa' },
  { name: 'Trota', category: 'fish' },
]

export const carbohydrates: Carbohydrate[] = [
  { name: 'Crema di Riso', category: 'crema' },
  { name: 'Semolino', category: 'crema' },
  { name: 'Crema di Mais e Tapioca', category: 'crema' },
  { name: 'Crema Multicereali', category: 'crema' },
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

  return {
    protein: proteins[halfJar % proteins.length],
    carbohydrate: carbohydrates[fullJar % carbohydrates.length]
  }
}

export function getDinnerMeal(options: Options = {}): DinnerMeal {
  const { fullJar } = getMeal(options)

  return {
    carbohydrate: carbohydrates[(fullJar +1) % carbohydrates.length]
  }
}
