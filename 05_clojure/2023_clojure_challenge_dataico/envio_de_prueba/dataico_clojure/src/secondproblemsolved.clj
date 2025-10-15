(comment

	Problem 2: Core Generating Functions
		Given the invoice defined in invoice.json found in this repo, generate an invoice that passes the 
		spec ::invoice defined in invoice-spec.clj. Write a function that as an argument receives a file 
		name (a JSON file name in this case) and returns a clojure map such that

		(s/valid? ::invoice invoice) => true 
			where invoice represents an invoice constructed from the JSON.
)

(ns invoice-spec
  (:require
    [clojure.spec.alpha :as s]
    [clojure.data.json :as json]
    )
  (:import (java.text SimpleDateFormat)))

(use 'clojure.walk)


(def formatDate (SimpleDateFormat. "dd/MM/yyyy"))
(defn parseDate [date-str]
  (try
    (.parse formatDate date-str)
    (catch Exception e
      (println "Error:" e))))

(defn reader [key value]
  (case key 
  :issue_date (parseDate value) :payment_date (parseDate value) :tax_category (if (= value "IVA") :iva value) :tax_rate (double value) value))

(defn replace [invoice-map]
  (postwalk-replace
    {:taxes :invoice-item/taxes :customer :invoice/customer :issue_date :invoice/issue-date :sku :invoice-item/sku :items :invoice/items :company_name :customer/name :price :invoice-item/price :quantity :invoice-item/quantity :tax_category :tax/category :tax_rate :tax/rate :email :customer/email} 
    invoice-map))

(defn parseJson [file-name]
  (let [json-invoice (json/read-str (slurp file-name) :key-fn keyword :value-fn reader)]
    (get (replace json-invoice) :invoice)
    ))

(s/valid? ::invoice (parseJson "invoice.json"))

(println (s/valid? ::invoice (parseJson "invoice.json")))

