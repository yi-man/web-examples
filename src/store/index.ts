import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import {IBook} from '../api'
import {Book, getBook} from '../service/book'

// Model the application state.
class BookStore {
    book: Book | undefined

    async fetchBook() {
      const book = await getBook()

      this.book = book
    }
}

// export const myBook = new BookStore()