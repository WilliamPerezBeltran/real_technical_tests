(ns invoice-item)

(defn- discount-factor [{:invoice-item/keys [discount-rate]
                         :or                {discount-rate 0}}]
  (- 1 (/ discount-rate 100.0)))

(defn subtotal
  [{:invoice-item/keys [precise-quantity precise-price discount-rate]
    :as                item
    :or                {discount-rate 0}}]
  (* precise-price precise-quantity (discount-factor item)))





(defn subtotal
  [{:invoice-item/keys [precise-quantity precise-price discount-rate]
    :as                item
    :or                {discount-rate 0}}]
  (* precise-price precise-quantity (discount-factor item)))




(ns invoice-item-test
  (:require [clojure.test :refer :all]
            [invoice-item :refer :all]))

(deftest test-subtotal-without-discount
  (is (= (subtotal {:precise-quantity 2.0 :precise-price 10.0}) 20.0)))

(deftest test-subtotal-with-discount
  (is (= (subtotal {:precise-quantity 3.0 :precise-price 15.0 :discount-rate 10}) 40.5)))

(deftest test-subtotal-with-zero-quantity
  (is (= (subtotal {:precise-quantity 0.0 :precise-price 25.0}) 0.0)))

(deftest test-subtotal-with-zero-price
  (is (= (subtotal {:precise-quantity 4.0 :precise-price 0.0}) 0.0)))

(deftest test-subtotal-with-negative-quantity
  (is (= (subtotal {:precise-quantity -2.0 :precise-price 30.0}) 0.0)))

(deftest test-subtotal-with-negative-price
  (is (= (subtotal {:precise-quantity 5.0 :precise-price -5.0}) 0.0)))

(deftest test-subtotal-with-negative-discount
  (is (= (subtotal {:precise-quantity 2.0 :precise-price 10.0 :discount-rate -20}) 20.0)))

(deftest test-subtotal-with-hundred-percent-discount
  (is (= (subtotal {:precise-quantity 3.0 :precise-price 5.0 :discount-rate 100}) 0.0)))

(deftest test-subtotal-with-large-values
  (is (= (subtotal {:precise-quantity 1000000.0 :precise-price 0.01 :discount-rate 25}) 25000.0)))

;; Run the tests
(run-tests)
