(function() {
    'use strict';

    angular.module('app').factory('StatementPeriod', () => StatementPeriod);

    class StatementPeriod {
        constructor(statement) {
            this.cumulativeSpend = statement.totalSpend;
            this.balance = statement.balance;
            this.spend = 0;
            this.statement = statement;
        }

        addFee(fee, addToBalance) {
            if (fee > 0) {
                if (addToBalance === true) {
                    this.statement.balance += fee;
                } else {
                    this.addSpend(fee);
                }
            }
        }

        addInterest(monthlyRate) {
            this.statement.balance += (this.statement.balance * monthlyRate);
        }

        addSpend(spend) {
            this.spend += spend;
            this.cumulativeSpend += spend;
            this.statement.totalSpend += spend;
        }

        makePayment(payment) {
            if (!angular.isNumber(payment)) {
                return;
            }

            if (payment > this.statement.balance) {
                payment = this.statement.balance;
            }
            this.statement.balance -= payment;
            this.addSpend(payment);
        }
    }
})();