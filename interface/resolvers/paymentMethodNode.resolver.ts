import type Stripe from "stripe"
import type { PaymentMethodNode } from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const PaymentMethodNodeResolvers: PrismaResolvers<
  PaymentMethodNode,
  Stripe.PaymentMethod
> = {
  id(parent) {
    return parent.id
  },
  type(parent) {
    return parent.type
  },
  cardBrand(parent) {
    return parent.card?.brand ?? "-"
  },
  cardLast4(parent) {
    return parent.card?.last4 ?? "-"
  },
  cardExpMonth(parent) {
    return parent.card?.exp_month.toString().padStart(2, "0") ?? "-"
  },
  cardExpYear(parent) {
    return parent.card?.exp_year ?? "-"
  },
  cardFunding(parent) {
    return parent.card?.funding ?? "-"
  },
  isLiveMode(parent) {
    return parent.livemode
  },
}
