import { makeAutoObservable, runInAction } from "mobx"
import { observer } from "mobx-react"
import {IBook} from '../api'
import {Book, getBook} from '../service/book'

// Model the application state.
export class BookStore {
    book: Book | undefined

    constructor() {
      makeAutoObservable(this);
  
      // persistStore(this, ["user"], "UserStore");
    }

    set(k: keyof IBook, v: any) {
      if(this.book) {
        // @ts-ignore
        this.book[k] = v
      }
    }

    async fetchBook() {
      const book = await getBook()

      this.setBook(book)
    }

    setBook = (book: Book) => {
      this.book = book
  }
}

// export const myBook = new BookStore()