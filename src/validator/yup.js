import * as yup from './yupSource'
import { zhCN } from './locale/zhCN'

// 实现 validateInOrder 方法
yup.addMethod(yup.object, 'validateInOrder', function (data, options) {
  return Object.keys(data)
    .reduce((prev, key) => {
      return prev.then(() => {
        let schema
        try {
          schema = yup.reach(this, key)
        } catch (e) {}
        return schema ? this.validateAt(key, data, options) : undefined
      })
    }, Promise.resolve())
    .then(() => this.cast(data))
})

// 实现 validateInOrderSync 方法
yup.addMethod(yup.object, 'validateInOrderSync', function (data, options) {
  for (const key of Object.keys(data)) {
    let schema
    try {
      schema = yup.reach(this, key)
    } catch (e) {}
    if (schema) {
      this.validateSyncAt(key, data, options)
    }
  }
  return this.cast(data)
})

// 实现 validatePlus 方法
yup.addMethod(yup.mixed, 'validatePlus', function (data, options) {
  return (
    this.type === 'object'
      ? this.validateInOrder(data, options)
      : this.validate(data, options)
  )
    .then(data => ({ data }))
    .catch(error => ({ error, data }))
})

// 实现 validatePlusSync 方法
yup.addMethod(yup.mixed, 'validatePlusSync', function (data, options) {
  try {
    const _data =
      this.type === 'object'
        ? this.validateInOrderSync(data, options)
        : this.validateSync(data, options)
    return { data: _data }
  } catch (error) {
    return { error, data }
  }
})

// 设置中文为默认语言
yup.setLocale(zhCN)

export { yup }
