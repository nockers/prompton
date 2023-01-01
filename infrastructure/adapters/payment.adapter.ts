import { captureException } from "@sentry/node"
import { Stripe } from "stripe"
import type { Email, Id } from "core"
import { Env } from "infrastructure/env"

export class PaymentAdapter {
  async createCharge(userId: Id, amount: number) {
    try {
      const stripe = new Stripe(Env.stripeSecretKey, {
        apiVersion: "2022-11-15",
      })

      const resp = await stripe.customers.search({
        query: `metadata['userId']:'${userId.value}'`,
      })

      const [customer = null] = resp.data

      if (customer === null) {
        return new Error()
      }

      const intent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "jpy",
        capture_method: "manual",
        customer: customer.id,
      })

      return intent
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async captureCharge(transactionId: string) {
    try {
      const stripe = new Stripe(Env.stripeSecretKey, {
        apiVersion: "2022-11-15",
      })

      const intent = await stripe.paymentIntents.capture(transactionId)

      return intent
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async cancelCharge(transactionId: string) {
    try {
      const stripe = new Stripe(Env.stripeSecretKey, {
        apiVersion: "2022-11-15",
      })

      const intent = await stripe.paymentIntents.cancel(transactionId)

      return intent
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async findCustomer(userId: Id) {
    try {
      const stripe = new Stripe(Env.stripeSecretKey, {
        apiVersion: "2022-11-15",
      })

      const resp = await stripe.customers.search({
        query: `metadata['userId']:'${userId.value}'`,
      })

      const [customer = null] = resp.data

      return customer
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async updateCustomer(props: { userId: Id; email: Email | null }) {
    try {
      const stripe = new Stripe(Env.stripeSecretKey, {
        apiVersion: "2022-11-15",
      })

      const resp = await stripe.customers.search({
        query: `metadata['userId']:'${props.userId.value}'`,
      })

      const [customer = null] = resp.data

      if (customer !== null) {
        return null
      }

      await stripe.customers.create({
        email: props.email?.value,
        description: props.userId.value,
        metadata: {
          userId: props.userId.value,
        },
      })

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async createPaymentMethod(userId: Id) {
    try {
      const stripe = new Stripe(Env.stripeSecretKey, {
        apiVersion: "2022-11-15",
      })

      const resp = await stripe.customers.search({
        query: `metadata['userId']:'${userId.value}'`,
        expand: ["data.default_source"],
      })

      const [customer = null] = resp.data

      if (customer === null) {
        return new Error()
      }

      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer?.id,
      })

      const [paymentMethod = null] = paymentMethods.data

      if (paymentMethod !== null) {
        return new Error()
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "setup",
        customer: customer.id,
        success_url: `${Env.appURL}/viewer/payments?status=success`,
        cancel_url: `${Env.appURL}/viewer/payments?status=cancel`,
      })

      return session
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async deletePaymentMethod(userId: Id) {
    try {
      const stripe = new Stripe(Env.stripeSecretKey, {
        apiVersion: "2022-11-15",
      })

      const resp = await stripe.customers.search({
        query: `metadata['userId']:'${userId.value}'`,
        expand: ["data.default_source"],
      })

      const [customer = null] = resp.data

      if (customer === null) {
        return new Error()
      }

      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer?.id,
      })

      const [paymentMethod = null] = paymentMethods.data

      if (paymentMethod === null) {
        return new Error()
      }

      await stripe.paymentMethods.detach(paymentMethod.id)

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
