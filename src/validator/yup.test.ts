import { enUS } from './locale/enUS'
import { expectType } from '../dev'
import { run } from '../utils'
import { yup } from './yup'
import { zhCN } from './locale/zhCN'

describe('yup', () => {
  test('默认语言为中文', async () => {
    await expect(
      yup
        .string()
        // @ts-expect-error
        .validate(1, {
          strict: true,
        }),
    ).rejects.toThrowError(/此项必须是一个字符串/)
  })

  test('可切换语言', () => {
    yup.setLocale(enUS)
    yup.setLocale(zhCN)
  })

  test('chineseMobilePhoneNumber 正常', async () => {
    await expect(
      yup.string().chineseMobilePhoneNumber().validate('10086'),
    ).rejects.toThrowError(/此项必须是一个合法的手机号码/)
    await expect(
      yup.string().chineseMobilePhoneNumber().validate('13907199856'),
    ).resolves.toBe('13907199856')
  })

  test('chineseIDCardNumber 正常', async () => {
    await expect(
      yup.string().chineseIDCardNumber().validate('123456'),
    ).rejects.toThrowError(/此项必须是一个合法的身份证号码/)
    await expect(
      yup.string().chineseIDCardNumber().validate('11010119881101331X'),
    ).resolves.toBe('11010119881101331X')
  })

  test('validateInOrder 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    const [nameErr] = await run(() =>
      rule.validateInOrder({
        name: '',
        pass: 99,
      }),
    )
    expect(nameErr).toMatchSnapshot('姓名必填')
    const [passErr] = await run(() =>
      rule.validateInOrder({
        pass: 99,
        name: '',
      }),
    )
    expect(passErr).toMatchSnapshot('密码有误')
    expect(
      await rule.validateInOrder({
        name: '8',
        pass: 101,
      }),
    ).toEqual({
      name: '8',
      pass: 101,
    })
  })

  test('validateInOrderSync 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    const [nameErr] = await run(() =>
      rule.validateInOrderSync({
        name: '',
        pass: 99,
      }),
    )
    expect(nameErr).toMatchSnapshot('姓名必填')
    const [passErr] = await run(() =>
      rule.validateInOrderSync({
        pass: 99,
        name: '',
      }),
    )
    expect(passErr).toMatchSnapshot('密码有误')
    expect(
      rule.validateInOrderSync({
        name: '8',
        pass: 101,
      }),
    ).toEqual({
      name: '8',
      pass: 101,
    })
  })

  test('validatePlus 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    expect(
      await rule.validatePlus({
        name: '',
        pass: 99,
      }),
    ).toMatchSnapshot()
    expect(
      await rule.validatePlus({
        pass: 99,
        name: '',
      }),
    ).toMatchSnapshot()
    expect(
      await rule.validatePlus({
        name: '8',
        pass: 101,
      }),
    ).toMatchSnapshot()
    expect(
      await rule.validatePlus({
        name: '8',
        pass: 101,
        // @ts-ignore
        xxx: 'sss',
      }),
    ).toMatchSnapshot()
  })

  test('validatePlusSync 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    expect(
      rule.validatePlusSync({
        name: '',
        pass: 99,
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        pass: 99,
        name: '',
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        name: '8',
        pass: 101,
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        name: '8',
        pass: 101,
        // @ts-ignore
        xxx: 'sss',
      }),
    ).toMatchSnapshot()
  })

  test('布尔、enum类型正常', () => {
    type X = yup.GetObjectSchema<{
      disabled: boolean
      gender: 'male' | 'female'
    }>
    expectType<
      X,
      {
        disabled: yup.BooleanSchema<boolean>
        gender: yup.StringSchema<string>
      }
    >()
  })

  test('test 第一个参数可传函数或正则', () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required().test(/f/, '姓名应该包含f'),
      pass: yup
        .string()
        .label('密码')
        .required()
        .test(value => value.length > 10, '密码长度应大于10'),
    })
    expect(
      rule.validatePlusSync({
        name: 'de',
        pass: 'dss',
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        name: 'defl',
        pass: 'dss',
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        name: 'defl',
        pass: 'dssdllsal;;',
      }),
    ).toMatchSnapshot()
  })

  test('number 支持 id()', () => {
    const rule = yup.number().id()
    expect(rule.validatePlusSync(1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-1)).toMatchSnapshot()
    expect(rule.validatePlusSync(0)).toMatchSnapshot()
    expect(rule.validatePlusSync(0.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(1.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(100)).toMatchSnapshot()
  })

  test('number 支持 positiveInteger()', () => {
    const rule = yup.number().positiveInteger()
    expect(rule.validatePlusSync(1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-1)).toMatchSnapshot()
    expect(rule.validatePlusSync(0)).toMatchSnapshot()
    expect(rule.validatePlusSync(0.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(1.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(100)).toMatchSnapshot()
  })

  test('number 支持 negativeInteger()', () => {
    const rule = yup.number().negativeInteger()
    expect(rule.validatePlusSync(1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-0)).toMatchSnapshot()
    expect(rule.validatePlusSync(0.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(1.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(100)).toMatchSnapshot()
    expect(rule.validatePlusSync(-100.3)).toMatchSnapshot()
  })

  test('number 支持 nonPositive()', () => {
    const rule = yup.number().nonPositive()
    expect(rule.validatePlusSync(1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-0)).toMatchSnapshot()
    expect(rule.validatePlusSync(0.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(1.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(100)).toMatchSnapshot()
    expect(rule.validatePlusSync(-100.3)).toMatchSnapshot()
  })

  test('number 支持 nonNegative()', () => {
    const rule = yup.number().nonNegative()
    expect(rule.validatePlusSync(1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-0)).toMatchSnapshot()
    expect(rule.validatePlusSync(0.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(1.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(100)).toMatchSnapshot()
    expect(rule.validatePlusSync(-100.3)).toMatchSnapshot()
  })

  test('number 支持 nonPositiveInteger()', () => {
    const rule = yup.number().nonPositiveInteger()
    expect(rule.validatePlusSync(1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-0)).toMatchSnapshot()
    expect(rule.validatePlusSync(0.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(1.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(100)).toMatchSnapshot()
    expect(rule.validatePlusSync(-100.3)).toMatchSnapshot()
  })

  test('number 支持 nonNegativeInteger()', () => {
    const rule = yup.number().nonNegativeInteger()
    expect(rule.validatePlusSync(1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-1)).toMatchSnapshot()
    expect(rule.validatePlusSync(-0)).toMatchSnapshot()
    expect(rule.validatePlusSync(0.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(1.5)).toMatchSnapshot()
    expect(rule.validatePlusSync(100)).toMatchSnapshot()
    expect(rule.validatePlusSync(-100.3)).toMatchSnapshot()
  })

  test('ref 支持 map', () => {
    const rule = yup.number().min(yup.ref('.', value => value + 1))
    expect(rule.validatePlusSync(2)).toMatchSnapshot()

    const rule2 = yup.number().min(
      yup.ref('.', {
        map: value => value + 1,
      }),
    )
    expect(rule2.validatePlusSync(2)).toMatchSnapshot()
  })

  test('allowEmptyString 正常', () => {
    const rule1 = yup.number()
    // @ts-expect-error
    expect(rule1.validatePlusSync('')).toMatchSnapshot()

    const rule2 = yup.number().allowEmptyString()
    // @ts-expect-error
    expect(rule2.validatePlusSync('')).toMatchSnapshot()
  })
})
