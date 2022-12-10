
import { createForm, Form } from '@formily/core'

type Cache = {[k:string]: Form}

export class FormCache{
  cache: Cache

  constructor() {
    this.cache = {}
  }
  
  setForm(k: string) {
    if(!this.cache[k]) {
      this.cache[k] = createForm({
        validateFirst: true,
      })
    }
  }

  getForm(k: string) {
    this.setForm(k)

    return this.cache[k]
  }

  removeExpiredForm(names: string[]) {
    const newCache: Cache = {}
    Object.keys(this.cache).forEach((k) => {
      if(names.find(name => name === k)) {
        newCache[k] = this.cache[k]
      }
    })

    this.cache = newCache
  }

  submit(){
    return Promise.all(Object.keys(this.cache).map(async (k) => {
      const form = this.cache[k]

      return form.submit().then(d => [k, d] as [string, object])
    })).then(dataArr => dataArr.reduce((acc, data)=> {
      acc[data[0]] = data[1]
      return acc
    }, {} as Record<string, object>))
  }
}

type GroupCache = {[k:string]: FormCache}

export class FormGroupCache{
  cache: GroupCache

  constructor() {
    this.cache = {}
  }

  setFormCache(k: string) {
    if(!this.cache[k]) {
      this.cache[k] = new FormCache()
    }
  }

  getFormCache(k: string) {
    this.setFormCache(k)

    return this.cache[k]
  }

  async submit(){
    return Promise.all(Object.keys(this.cache).map(async (k) => {
      const formCache = this.cache[k]

      return formCache.submit().then(d => [k, d] as [string, object])
    })).then(dataArr => dataArr.reduce((acc, data)=> {
      acc[data[0]] = data[1]
      return acc
    }, {} as Record<string, object>))
  }

}