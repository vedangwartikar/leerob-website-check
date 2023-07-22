'use client'

import { PopIn } from 'app/components/Animations'
import { useRef, useState } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { saveGuestbookEntry } from '../actions'

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()

  const [isError, setIsError] = useState(false)

  return (
    <div>
      {!isError && (
        <PopIn delay={0.2}>
          <div className="text-xs text-slate-300 mb-2">Write something my mom would be proud of...</div>
          <form
            style={{ opacity: !pending ? 1 : 0.7 }}
            className="relative max-w-[500px] text-sm"
            ref={formRef}
            action={async (formData) => {
              try {
                await saveGuestbookEntry(formData)
                formRef.current?.reset()
              } catch (e: Error | unknown) {
                if (e instanceof Error) {
                  if (e.message.includes('value too long')) {
                    setIsError(true)
                    return
                  }
                }
              }
            }}
          >
            <input
              aria-label="Your message"
              placeholder="Your message..."
              disabled={pending}
              name="entry"
              type="text"
              required
              className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            />
            <button
              className="flex items-center justify-center absolute right-1 top-1 px-2 py-1 font-medium h-7 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded w-16"
              disabled={pending}
              type="submit"
            >
              Sign
            </button>
          </form>
        </PopIn>
      )}
      {isError && (
        <PopIn>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-600 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 dark:bg-slate-500 dark:text-white hover:text-gray-500 dark:hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setIsError(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white" id="modal-title">
                    Your message was too long.
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">Please try again with a shorter message.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopIn>
      )}
    </div>
  )
}
