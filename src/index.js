import React from 'react'
import objectAssign from 'object-assign'

const objectToMerge = (tr) => {
  if (typeof tr === 'function') {
    return tr
  }

  if (typeof tr === 'object' && tr.constructor === Object) {
    return (oldProps) => objectAssign({}, oldProps, tr)
  }

  throw new Error('Transformation must be a function or a plain object.')
}

export default (transformations = []) => {
  const transformsList = []
    .concat(transformations)
    .map(objectToMerge)

  const transform = Array.prototype.reduceRight.bind(
    transformsList,
    (props, tr) => tr(props)
  )

  return (Component) => (props) => <Component {...transform(props)}/>
}
