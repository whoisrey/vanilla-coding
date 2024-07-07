class PaymentMethod {
  requestPayment() {}

  processRefund() {}
}

class PayPalPayment extends PaymentMethod {
  requestPayment(paymentDetails, amount) {
    return paymentDetails <= amount ? true : false;
  }

  processRefund(paymentId) {
    return typeof paymentId === "string" ? true : false;
  }
}

class TossPayment extends PaymentMethod {
  requestPayment(paymentDetails, amount) {
    return paymentDetails <= amount ? true : false;
  }

  processRefund(paymentId) {
    return typeof paymentId === "string" ? true : false;
  }
}

class OrderHandler {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  processPayment(paymentDetails, amount) {
    return this.paymentMethod.requestPayment(paymentDetails, amount);
  }

  refund(paymentId) {
    return this.paymentMethod.processRefund(paymentId);
  }
}

const payPal = new PayPalPayment();
const toss = new TossPayment();

const vaco = new OrderHandler(payPal);
const cova = new OrderHandler(toss);

vaco.processPayment(500, 300);
vaco.refund("vaco");

cova.processPayment(200, 300);
cova.refund(45);
