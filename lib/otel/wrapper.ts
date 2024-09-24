// customWrapper.ts
import streamingWrapper from "open-next/wrappers/aws-lambda.js"
import { WrapperHandler } from "open-next/types/open-next.js"

const handler: WrapperHandler = async (handler, converter) => {
    const defaultHandler = await streamingWrapper.wrapper(handler, converter)
    return async (event, context) => {
        const symbol = Symbol.for("@vercel/request-context")
        const promiseToAwaits: Promise<unknown>[] = []

        //@ts-expect-error will error
        globalThis[symbol] = {
            get: () => {
                return {
                    waitUntil: (promiseOrFunc: Promise<unknown> | (() => Promise<unknown>)) => {
                        const promise = "then" in promiseOrFunc ? promiseOrFunc : promiseOrFunc()
                        promiseToAwaits.push(promise)
                    },
                    headers: event.headers,
                    url: event.rawPath,
                }
            },
        }
        const response = await defaultHandler(event, context)
        await Promise.all(promiseToAwaits)
        return response
    }
}

export default {
    wrapper: handler,
    name: "aws-lambda",
    supportStreaming: false,
}
