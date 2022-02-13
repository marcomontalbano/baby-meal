import dayjs from 'dayjs'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { carbohydrates, getDinnerMeal, getLunchMeal, proteins } from './meal'

test('should get a lunch meal for a precise date', () => {
  const meal = getLunchMeal({
    date: dayjs('2022-02-01')
  })

  assert.equal(meal, {
    protein: proteins[7],
    carbohydrate: carbohydrates[3]
  })
})

test('should get a dinner meal for a precise date', () => {
  const meal = getDinnerMeal({
    date: dayjs('2022-02-01')
  })

  assert.equal(meal, {
    carbohydrate: carbohydrates[0]
  })
})

test.run()
